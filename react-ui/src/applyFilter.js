import transformImageWithStyle from './styleTransfer'

let canvas

export default async function applyFilter(imageData, filter_or_style) {
  return new Promise((resolve) => {
    console.debug('start', { imageData })
    if (!filter_or_style || !imageData) {
      return resolve(imageData)
    }

    canvas = canvas || document.createElement('canvas')

    const image = new Image()
    image.onload = () => {
      const ctx = canvas.getContext('2d')

      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0, image.width, image.height)

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Choose whether to use pixelsJS or styleTransfer
      var is_filter = (typeof filter_or_style == 'string')
      if (is_filter) {
      	const	transformedImg = window.pixelsJS.filterImgData(imgData, filter_or_style)

      	ctx.putImageData(transformedImg, 0, 0)
      	resolve(canvas.toDataURL())
      }
      else {
      	transformImageWithStyle(imgData, filter_or_style).then(transformedImg => {
      		ctx.putImageData(transformedImg, 0, 0)
      		resolve(canvas.toDataURL())
      	})
      }
    }
    image.src = imageData
  })
}
