  var peer = new Peer();
 peer.on('open', (id) => {
    var peerIdSpace = document.querySelector("#peer_id_space");
    peerIdSpace.textContent = id;
  });
  var connectBtn = document.querySelector("button");

  connectBtn.addEventListener("click", e => {
    var peerId = document.querySelector("#peer_id").value;
    console.log(peerId)
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
getUserMedia({video: true, audio: true}, function(stream) {
  var call = peer.call(peerId, stream);
  call.on('stream', function(remoteStream) {
    var video = document.createElement("video");
    video.srcObject = remoteStream;
    video.style.height = '400px';
      video.style.width = '400px';
    document.querySelector("#myVideo").appendChild(video);
    video.play();
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
  });

  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function(call) {
  getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      var video = document.createElement("video");
    video.srcObject = remoteStream;
    video.style.height = '400px';
      video.style.width = '400px';
    document.querySelector("#remoteVideo").appendChild(video);
    video.play();
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});
