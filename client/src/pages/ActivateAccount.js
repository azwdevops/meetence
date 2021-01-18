// import installed packages
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import styles
import "../styles/pages/ActivateAccount.css";
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
import { activateAccount } from "../redux/actions/auth";
// import shared/global items

// import components/pages

// import redux API

const ActivateAccount = () => {
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const btnRef = useRef();
  const pageRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleActivate = () => {
    setLoading(true);
    if (btnRef.current) {
      pageRef.current.setAttribute("id", "pageSubmitting");
    }
    dispatch(activateAccount({ token, history }));

    setLoading(false);
    if (btnRef.current) {
      pageRef.current.removeAttribute("id", "pageSubmitting");
    }
  };

  return (
    <div className="activate__account" ref={pageRef}>
      <h1>Click on the button below to verify your account</h1>
      {loading && (
        <CircularProgress style={{ position: "absolute", marginLeft: "1%" }} />
      )}
      <button type="button" onClick={handleActivate} ref={btnRef}>
        Verify
      </button>
    </div>
  );
};

export default ActivateAccount;
