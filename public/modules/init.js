const audioCtx = new AudioContext()
const canvasD = document.getElementById("myCanvas")
let bufferB = undefined

/**
 * The DGI is document.getElementById
 * @param {*} nameId
 */
const DGI = nameId => document.getElementById(nameId)
const fileInput = () => {
  var reader1 = new FileReader()
  reader1.onload = function(ev) {
    // Decode audio
    audioCtx.decodeAudioData(ev.target.result).then(function(buffer) {
      bufferB = buffer
    })
  }
  reader1.readAsArrayBuffer(fileVedio.files[0])
}
const setUpdata = () => {
  return {
    effects: {
      type: document.getElementById("effectTypeGain").value
        ? document.getElementById("effectTypeGain").value
        : "highpass",
      freq: 1000
    },
    delay: {
      delayTime: parseInt(DGI("delayTimeRange").value) / 100,
      freq: 1000,
      filter: 0.8
    }
  }
}

const delayAnddisTor = bufferB => {
  const setUp = setUpdata()
  const delay = document.getElementById("delay").checked
    ? delayNade(
        bufferB,
        setUp.delay.delayTime,
        setUp.delay.freq,
        setUp.delay.filter
      )
    : ""
  const distortion = document.getElementById("effects").checked
    ? distortionNode(bufferB, setUp.effects.type, setUp.effects.freq)
    : ""

  return [delay, distortion].filter(d => d)
}
