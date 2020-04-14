import transformImageWithStyle, { getImageStyle } from './styleTransfer'
import { fetchImageDataObject, imageDataToUrl } from './styles/images'

let base_style

export default async function applyFilter(imageDataUrl, filter, weight) {
  if (!filter || !imageDataUrl) {
    return imageDataUrl
  }

  const imageData = await fetchImageDataObject(imageDataUrl)

  // Choose whether to use pixelsJS or styleTransfer
  var is_style = (typeof filter != 'string')
  var orig_data = imageData.data.slice(0)
  let transformedImg
  if (is_style) {
    var style = filter

    if (weight<1.0) { // Linear interpolation between base and given style
      base_style = base_style || await getImageStyle(imageData)
      style = linearCombination(base_style,style,weight)
    }

    transformedImg = await transformImageWithStyle(imageData, style)
  }
  else
    transformedImg = window.pixelsJS.filterImgData(imageData, filter)

    console.log({transformedImg})
  if (weight<1.0) { // Linear interpolation between pixels of filter and original
    const tdata = transformedImg.data
    transformedImg = new ImageData(
      linearCombination(orig_data,tdata,weight),
      imageData.width,
      imageData.height
    )
  }

  return imageDataToUrl(transformedImg)
}

function linearCombination(a0, a1, weight) {
  return a1.map((x,i) => weight*x + (1.0-weight)*a0[i])
}
