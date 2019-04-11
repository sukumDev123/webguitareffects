function makeDistortionCurve(amount) {
  var k = typeof amount === "number" ? amount : 50,
    n_samples = 48000,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    x
  for (let i = 0; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
  }
  return curve
}

const distortionNode = (
  bufferB,
  fillterType,
  filterFeq,
  feedBackGain = 0.8
) => {
  const source = audioCtx.createBufferSource()
  source.buffer = bufferB

  const biq = audioCtx.createBiquadFilter()
  biq.type = fillterType
  biq.frequency.value = filterFeq

  const distortionGainNode = audioCtx.createGain()
  distortionGainNode.gain.value = feedBackGain

  const distortionNode = audioCtx.createWaveShaper()
  distortionNode.curve = makeDistortionCurve(400)
  //   distortionNode.oversample = "4x"
  distortionNode.connect(biq)
  biq.connect(distortionGainNode)
  distortionGainNode.connect(audioCtx.destination)
  //   distortionGainNode.connect(audioCtx.destination)
  //   distortionGainNode.connect(distortionNode)
  //   biq.connect(distortionGainNode)
  //   distortion.connect(audioCtx.destination)
  return distortionNode
}
