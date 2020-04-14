import transformImageWithStyle, { getImageStyle } from './styleTransfer'
import { fetchImageDataObject, imageDataToUrl } from './styles/images'

let base_style

export default async function applyFilter(imageDataUrl, filter, weight) {
  if (!imageDataUrl || filter.type === 'none') {
    return imageDataUrl
  }

  const imageData = await fetchImageDataObject(imageDataUrl)
  let transformedImage = await transform(imageData, filter, weight)

  // Linear interpolation between pixels of filter and unfiltered image
  if (weight < 1.0) {
    transformedImage = new ImageData(
      linearCombination(imageData.data, transformedImage.data, weight),
      imageData.width,
      imageData.height
    )
  }

  return imageDataToUrl(transformedImage)
}

const transform = async(imageData, filter, weight) => {
  if (filter.type === 'pixelJS') {
    return window.pixelsJS.filterImgData(imageData, filter.value)
  } else if (filter.type === 'styleTransfer') {
    const style = await calculateStyle(imageData, filter, weight)
    return await transformImageWithStyle(imageData, style)
  } else {
    return imageData
  }
}

const calculateStyle = async(imageData, filter, weight) => {
  base_style = base_style || await getImageStyle(imageData)
  return linearCombination(base_style, filter.value, weight)
}

function linearCombination(a0, a1, weight) {
  if (weight >= 1.0) {
    return a1
  }
  return a1.map((x,i) => weight*x + (1.0-weight)*a0[i])
}
