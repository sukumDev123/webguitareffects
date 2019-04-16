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
  audioCtx,
  fillterType,
  filterFeq,
  feedBackGain = 0.8
) => {
  const biq = audioCtx.createBiquadFilter()
  biq.type = fillterType
  biq.frequency.value = filterFeq

  const distortionGainNode = audioCtx.createGain()

  const distortionNode = audioCtx.createWaveShaper()
  distortionNode.curve = makeDistortionCurve(400)
  //   distortionNode.oversample = "4x"

  const feedBack = audioCtx.createGain()

  feedBack.gain.value = feedBackGain
  distortionNode.connect(biq)
  biq.connect(distortionGainNode)
  feedBack.connect(distortionNode)

  distortionGainNode.connect(audioCtx.destination)
  //   distortionGainNode.connect(audioCtx.destination)
  //   distortionGainNode.connect(distortionNode)
  //   biq.connect(distortionGainNode)
  //   distortion.connect(audioCtx.destination)
  return distortionNode
}
