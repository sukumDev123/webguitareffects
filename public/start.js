let playD = false


DGI("delayTimeShow").innerHTML = parseInt(DGI("delayTimeRange").value) / 100

DGI("delayTimeRange").addEventListener("change", e => {
  DGI("delayTimeShow").innerHTML = parseInt(DGI("delayTimeRange").value) / 100
})

DGI("play").addEventListener("click", e => {
  e.preventDefault()

  const source = audioCtx.createBufferSource()

  if (bufferB !== undefined) {
    source.buffer = bufferB
    source.connect(audioCtx.destination)
    const clip = delayAnddisTor(audioCtx)
    if (clip.length) {
      clip.forEach(data => {
        source.connect(data)
      })
    }
    source.start()
  } else {
    alert("Choose your sound.")
  }
})
