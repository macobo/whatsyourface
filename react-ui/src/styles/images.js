export const fetchImageDataObject = (url, maxWidth = null) => {
  return new Promise((resolve) => {
    const image = new Image()

    image.onload = () => {
      const { canvas, context } = getCanvasContext()

      const { width, height } = image
      if (maxWidth && width > maxWidth) {
        height = Math.round(height * maxWidth / width)
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      context.drawImage(image, 0, 0, width, height)
      resolve(context.getImageData(0, 0, width, height))
    }

    image.src = url
  })
}

export const imageDataToUrl = (imageData) => {
  const { context, canvas } = getCanvasContext()
  context.putImageData(imageData, 0, 0)

  return canvas.toDataURL()
}

let canvas
const getCanvasContext = () => {
  canvas = canvas || document.createElement('canvas')

  const context = canvas.getContext('2d')

  return { canvas, context }
}
