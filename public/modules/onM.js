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
      const source = audioCtx.createMediaStreamSource(stream)
      const biquadFilter = audioCtx.createBiquadFilter()
      biquadFilter.type = "lowshelf"
      biquadFilter.frequency.value = 1000
      biquadFilter.gain.value = 0.5

      //   const buffer = audioCtx.createBuffer(source.mediaStream)

      //   buffer.buffer = source.mediaStream
      // connect the AudioBufferSourceNode to the gainNode
      // and the gainNode to the destination, so we can play the
      // music and adjust the volume using the mouse cursor

      source.connect(biquadFilter)
      biquadFilter.connect(audioCtx.destination)
      //   stream.pl
    })

    // Error callback
    .catch(function(err) {
      console.log("The following getUserMedia error occured: " + err)
    })
} else {
  console.log("getUserMedia not supported on your browser!")
}
