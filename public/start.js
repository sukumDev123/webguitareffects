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

/**
 * This DGI is document.getElementById
 * @param {*} nameId
 */
const DGI = nameId => document.getElementById(nameId)

DGI("delayTimeShow").innerHTML = parseInt(DGI("delayTimeRange").value) / 100

DGI("delayTimeRange").addEventListener("change", e => {
  DGI("delayTimeShow").innerHTML = parseInt(DGI("delayTimeRange").value) / 100
})

DGI("play").addEventListener("click", e => {
  e.preventDefault()
  const source = audioCtx.createBufferSource()
  if (bufferB) {
    source.buffer = bufferB
    source.connect(audioCtx.destination)
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

    const clip = [delay, distortion].filter(d => d)

    if (clip.length) {
      clip.forEach(data => {
        source.connect(data)
      })
    }

    source.start()
  }
})
