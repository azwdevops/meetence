// import installed packages
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";
// import styles
import "../styles/pages/VideoChatRoom.css";
// import material ui items
// import shared/global items
import API from "../shared/axios";
import globals from "../shared/globals";
// import components/pages
// import redux API

const VideoChatRoom = (props) => {
  const { videoChatRoomId } = useParams();
  const { userId } = props; // get state from props
  const {} = props; // get dispatch actions from props

  const myPeer = new Peer(undefined);
  const { dev, devHome } = globals;

  let ENDPOINT;
  if (dev) {
    ENDPOINT = devHome;
  }
  const socket = socketIOClient(ENDPOINT);

  const videoGrid = document.getElementById("video__grid");
  const myVideo = document.createElement("video");
  // function to initialize video connection

  const initializeVideoConnection = () => {
    myVideo.muted = true; // mute our own video for ourselves to avoid echo when our mike plays back the same sound
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);
        myPeer.on("call", (call) => {
          call.answer(stream); // answer a video call

          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      });
  };

  // function to add video stream
  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    videoGrid.append(video);
  };

  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });
  };

  // useEffect to get video room details
  useEffect(() => {
    API.get(`/api/chat/${videoChatRoomId}/`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videoChatRoomId]);

  // useEffect to create a connection
  useEffect(() => {
    if (userId) {
      socket.emit("join-room", videoChatRoomId, userId);
      socket.on("user-connected", (userId) => {
        console.log("USER CONNECTED", userId);
        initializeVideoConnection();
      });
    }
  }, [ENDPOINT, videoChatRoomId, userId, initializeVideoConnection, socket]);

  return (
    <div className="">
      <div id="video__grid">test</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};
const mapDispatchToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoChatRoom);
