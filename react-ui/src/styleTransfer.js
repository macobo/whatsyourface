import * as tf from '@tensorflow/tfjs'
tf.ENV.set('WEBGL_PACK', false)

let styleModel, transferModel

const styleModelPath = 'tf_models/style/model.json'
const transferModelPath = 'tf_models/transfer/model.json'

export default async function transformImageWithStyle(imageData, style) {

	transferModel = transferModel || await tf.loadGraphModel(transferModelPath);
	
	const stylized = await tf.tidy(() => {
		const styleInput = styleFromArray(style)
		const imgInput = tf.browser.fromPixels(imageData).toFloat().div(tf.scalar(255.0)).expandDims()
    return transferModel.predict([imgInput, styleInput]).squeeze()
  })
  return new ImageData(await tf.browser.toPixels(stylized),imageData.width,imageData.height) // returns Uint8ClampedArray
}

export async function getImageStyle(imageData) {

	styleModel = styleModel || await tf.loadGraphModel(styleModelPath)

	return await tf.tidy(() => {
		const imgInput = tf.browser.fromPixels(imageData).toFloat().div(tf.scalar(255.0)).expandDims()
    return styleToArray(styleModel.predict(imgInput).expandDims())
  })
}

// Two helper functions to allow styles to be js arrays instead of tf tensors
function styleFromArray(style_array) { return tf.tensor(style_array,[1,1,1,100]) }
function styleToArray(style) { return style.dataSync() }
