let analyser
let dataArray = []
let bufferLength = 0,
  WIDTH = 0,
  HEIGHT = 0
const gg = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.")
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true
        }
      )

      // Success callback
      .then(function(stream) {
        var ctx = new AudioContext()

        const source = ctx.createMediaStreamSource(stream)
        const createB = ctx.createBiquadFilter()

        analyser = ctx.createAnalyser()
        analyser.fftSize = 2048
        bufferLength = analyser.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)
        WIDTH = canvasD.width
        HEIGHT = canvasD.height
        createB.connect(analyser)
        analyser.connect(ctx.destination)
        const clip = delayAnddisTor(ctx)
        if (clip.length) {
          clip.forEach(data => {
            createB.connect(data)
          })
        }
        source.connect(createB)

        draw()
      })

      // Error callback
      .catch(function(err) {
        console.log("The following getUserMedia error occured: " + err)
      })
  } else {
    console.log("getUserMedia not supported on your browser!")
  }
}
DGI("playMicro").addEventListener("click", e => {
  e.preventDefault()
  gg()
})
var ctx = canvasD.getContext("2d")
ctx.moveTo(0, 0)
ctx.lineTo(200, 100)
ctx.stroke()
function draw() {
  // console.log({ dataArray })
  // if (dataArray) {
  if (dataArray.length) {
    requestAnimationFrame(draw)
    analyser.getByteTimeDomainData(dataArray)
  }
  // }

  ctx.fillStyle = "rgb(200, 200, 200)"
  ctx.fillRect(0, 0, canvasD.width, canvasD.height)

  ctx.lineWidth = 2
  ctx.strokeStyle = "rgb(0, 0, 0)"

  ctx.beginPath()

  var sliceWidth = (canvasD.width * 1.0) / bufferLength
  var x = 0

  for (var i = 0; i < bufferLength; i++) {
    var v = dataArray[i] / 128.0
    var y = (v * canvasD.height) / 2

    if (i === 0) {
      // ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
      // console.log({ x, y })
    }

    x += sliceWidth
  }

  ctx.lineTo(canvasD.width, canvasD.height / 2)
  ctx.stroke()
}

// function drewAt() {
//   drawVisual = requestAnimationFrame(drawAlt)

//   analyser.getByteFrequencyData(dataArrayAlt)

//   canvasCtx.fillStyle = "rgb(0, 0, 0)"
//   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

//   var barWidth = (WIDTH / bufferLengthAlt) * 2.5
//   var barHeight
//   var x = 0

//   for (var i = 0; i < bufferLengthAlt; i++) {
//     barHeight = dataArrayAlt[i]

//     canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)"
//     canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)

//     x += barWidth + 1
//   }
// }
