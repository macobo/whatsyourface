let canvas

export default async function applyFilter(imageData, filter) {
  return new Promise((resolve) => {
    console.debug('start', { imageData })
    if (!filter || !imageData) {
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
      const withFilter = window.pixelsJS.filterImgData(imgData, filter)

      ctx.putImageData(withFilter, 0, 0)
      resolve(canvas.toDataURL())
    }
    image.src = imageData
  })
}
