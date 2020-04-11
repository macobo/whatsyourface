import transformImageWithStyle, {getImageStyle} from './styleTransfer'

let canvas, base_style

export default async function applyFilter(imageData, filter, weight) {
  return new Promise(async (resolve) => {
    console.debug('start', { imageData })
    if (!filter || !imageData) {
      return resolve(imageData)
    }

    canvas = canvas || document.createElement('canvas')

    const image = new Image()
    image.onload = async () => {
      const ctx = canvas.getContext('2d')

      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0, image.width, image.height)

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Choose whether to use pixelsJS or styleTransfer
      var is_style = (typeof filter != 'string')
      var orig_data = imgData.data.slice(0)
      let transformedImg
      if (is_style) {
        var style = filter

        if (weight<1.0) { // Linear interpolation between base and given style
          base_style = base_style || await getImageStyle(imgData)
          style = linearCombination(base_style,style,weight)
        }

        transformedImg = await transformImageWithStyle(imgData, style)
      }
      else
        transformedImg = window.pixelsJS.filterImgData(imgData, filter)

      if (weight<1.0) { // Linear interpolation between pixels of filter and original
        const tdata = transformedImg.data
        transformedImg = new ImageData(
          linearCombination(orig_data,tdata,weight),
          imgData.width,imgData.height)
      }

      ctx.putImageData(transformedImg, 0, 0)
      resolve(canvas.toDataURL())
    }
    image.src = imageData
  })
}

function linearCombination(a0, a1, weight) {
  return a1.map((x,i) => weight*x + (1.0-weight)*a0[i])
}
