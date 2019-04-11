const audioCtx = new AudioContext()
let bufferB = undefined
const fileInput = () => {
  var reader1 = new FileReader()
  reader1.onload = function(ev) {
    // Decode audio
    audioCtx.decodeAudioData(ev.target.result).then(function(buffer) {
      // setTimeout(() => osc.stop(), 1000)
      bufferB = buffer
      console.log({ buffer })
    })
  }
  reader1.readAsArrayBuffer(fileVedio.files[0])
}
