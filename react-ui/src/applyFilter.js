import transformImageWithStyle from './styleTransfer'
import { fetchImageDataObject, imageDataToUrl } from './styles/images'
import linearCombination from './styles/linearCombination'


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
    return await transformImageWithStyle(imageData, filter.value, weight)
  } else {
    return imageData
  }
}
