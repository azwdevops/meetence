// import installed packages
import { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import Peer from "peerjs";
// import styles
import "../styles/pages/VideoChatRoom.css";

// import material ui items
// import shared/global items
import API from "../shared/axios";
import globals from "../shared/globals";
// import components/pages
// import redux API

class VideoChatRoom extends Component {
  constructor(props) {
    super(props);
    const { dev, devHome } = globals;
    let ENDPOINT;
    if (dev) {
      ENDPOINT = devHome;
    }
    this.state = {
      videoChatRoomId: props.match.params?.videoChatRoomId,
      socket: io(ENDPOINT),
      myPeer: new Peer(undefined),
      peers: {}, // to hold state for all connected people in the chat
    };
  }

  componentDidMount() {
    const { socket, videoChatRoomId, myPeer } = this.state;
    // on mount, initialize my own video connection
    this.initializeMyOwnVideoConnection();
    myPeer.on("open", (connectedUserId) => {
      socket.emit("join-room", videoChatRoomId, connectedUserId);
    });
    // API.get(`/api/chat/${this.state.videoChatRoomId}/`)
    //   .then((res) => {
    //     myPeer.on("open", () => {
    //       socket.emit("join-room", videoChatRoomId, userId);
    //     });
    //     socket.on("user-connected", (userId) => {
    //       console.log("USER CONNECTED", userId);
    //       this.initializeVideoConnection();
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  // initialize a web connection video for my case, and add it to the video stream
  // this captures my own video
  initializeMyOwnVideoConnection = () => {
    const myVideo = document.createElement("video");
    const { myPeer, socket } = this.state;
    myVideo.muted = true; // mute our own video for ourselves to avoid echo when our mike plays back the same sound
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.addVideoStream(myVideo, stream);
        myPeer.on("call", (call) => {
          call.answer(stream); // answer a video call
          const video = document.createElement("video");
          call.on("stream", (userVideoStream) => {
            this.addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId) => {
          this.connectToNewUser(userId, stream);
        });
        // when user leaves the video chat, remove them from the video grid, to avoid videos left hanging when they leave
        // this ensures clean video grid
        socket.on("user-disconnected", (userId) => {
          console.log(userId);
          // check if peers exist and close connection when user is disconnected
          if (this.state.peers[userId]) {
            this.state.peers[userId].close();
          }
        });
      });
  };
  // function to add video stream, reusable both when I connect to the stream, and also when others connect to the stream
  addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    const videoGrid = document.getElementById("video__grid");
    videoGrid.append(video);
  };

  // connect to new user to allow others to see my stream, and me to see theirs when they connect
  connectToNewUser = (userId, stream) => {
    const call = this.state.myPeer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      this.addVideoStream(video, userVideoStream);
    });
    call.on("close", () => {
      video.remove();
    });
    // add the user and create their state of peers, this will help us keep track of if a user os still on call,
    // if not we close their connection by listening to the user-disconnected event
    this.setState({ ...this.state, peers: { userId: call } });
  };

  render() {
    return (
      <div className="">
        <div id="video__grid">test</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};
const mapDispatchToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoChatRoom);
