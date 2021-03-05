// import installed packages
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import styles
// import material ui items
// import shared/global items
import API from "../shared/axios";
// import components/pages
// import redux API
import { START_LOADING, STOP_LOADING } from "../redux/actions/types";

const Home = (props) => {
  const history = useHistory();
  const { startLoading, stopLoading } = props; // dispatch actions
  // function to handle go live submit
  const handleGoLive = (e) => {
    e.preventDefault();
    startLoading();
    const url = `/api/chat/go-live/`;
    const fetchRoomId = async () => {
      const res = await API.post(url);
      history.push(`/go-live/${res.data?.videoChatRoomId}/`);
    };
    fetchRoomId()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        stopLoading();
      });
  };
  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={handleGoLive}>
        Go Live
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    stopLoading: () => dispatch({ type: STOP_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
