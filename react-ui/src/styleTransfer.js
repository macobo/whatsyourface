import * as tf from '@tensorflow/tfjs'
import { fetchImageDataObject } from './styles/images'
import linearCombination from './styles/linearCombination'
tf.ENV.set('WEBGL_PACK', false)

let styleModel, transferModel

const styleModelPath = 'tf_models/style/model.json'
const transferModelPath = 'tf_models/transfer/model.json'

export default async function transformImageWithStyle(imageData, style, weight) {
  transferModel = transferModel || await tf.loadGraphModel(transferModelPath)

  const interpolatedStyle = await calculateStyle(imageData, style, weight)

  const stylized = await tf.tidy(() => {
    const styleInput = styleFromArray(interpolatedStyle)
    const imgInput = tf.browser.fromPixels(imageData).toFloat().expandDims()
    return transferModel.predict([imgInput, styleInput]).squeeze().div(tf.scalar(255.0))
  })
  return new ImageData(await tf.browser.toPixels(stylized),imageData.width,imageData.height) // returns Uint8ClampedArray
}

export async function getImageStyle(imageData) {
  styleModel = styleModel || await tf.loadGraphModel(styleModelPath)

  return await tf.tidy(() => {
    const imgInput = tf.browser.fromPixels(imageData).toFloat().expandDims()
    var res = styleToArray(styleModel.predict(imgInput).expandDims())
    console.log(res)
    return res
  })
}

// Load image data from file (and shrink, if needed)
export async function imageDataFromFile(file, maxWidth) {
  const url = URL.createObjectURL(file)
  const imageData = await fetchImageDataObject(url)

  URL.revokeObjectURL(url)

  return imageData
}

let base_style
const calculateStyle = async(imageData, style, weight) => {
  base_style = base_style || await getImageStyle(imageData)
  return linearCombination(base_style, style, weight)
}

// Two helper functions to allow styles to be js arrays instead of tf tensors
function styleFromArray(style_array) { return tf.tensor(style_array,[1,100]) }
function styleToArray(style) { return Array.from(style.dataSync()) }
