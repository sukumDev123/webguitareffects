const delayNade = (audioCtx, delayTime, filterF, feedbackIn) => {
  // const source2 = audioCtx.createBufferSource()
  const delay = audioCtx.createDelay()

  delay.delayTime.value = delayTime

  const feedback = audioCtx.createGain()
  feedback.gain.value = feedbackIn

  const filter = audioCtx.createBiquadFilter()
  filter.frequency.value = filterF

  delay.connect(feedback)
  feedback.connect(delay)
  filter.connect(delay)
  delay.connect(audioCtx.destination)

  return delay
}
// export default delayNade
