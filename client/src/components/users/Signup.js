// import installed packages
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
// import styles

// import material ui items

// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty } from "../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API
import { CLOSE_SIGNUP } from "../../redux/actions/types";
import { signup } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/shared";

const Signup = ({ googleSucess, googleFailure }) => {
  const dispatch = useDispatch();
  const signupForm = useSelector((state) => state.auth.signupForm);
  const alert = useSelector((state) => state.shared.alert);

  // internal state
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // refs
  const btnRef = useRef();
  const formRef = useRef();

  //############### destructuring code ###################//
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirm_password,
  } = newUser;
  const { error, fillFields } = globals;

  //#################end of destructuring ###########//

  const handleSignup = (e) => {
    e.preventDefault();
    if (ifEmpty(newUser)) {
      return setAlert(dispatch, error, fillFields);
    }
    if (password !== confirm_password) {
      return setAlert(dispatch, error, "Passwords should match");
    }
    if (btnRef.current) {
      formRef.current.setAttribute("id", "pageSubmitting");
    }
    setLoading(true);
    // call the signup action creator
    dispatch(signup(newUser));

    setLoading(false);
    if (btnRef.current) {
      formRef.current.removeAttribute("id", "pageSubmitting");
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  return (
    <MediumDialog isOpen={signupForm}>
      <form className="dialog">
        <h3>Create new account</h3>
        <p className={`response__message ${alert.alertType}`}>
          {alert.status && alert.msg}
        </p>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            className="input__left"
            onChange={handleChange}
            required
          />
          <label htmlFor="" className="label__right">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            className="input__right"
            onChange={handleChange}
            required
          />
        </div>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            className="input__left"
            onChange={handleChange}
            required
          />
          <label htmlFor="" className="label__right">
            Email
          </label>
          <input
            type="email"
            name="email"
            username={email}
            className="input__right"
            onChange={handleChange}
            required
          />
        </div>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="input__left"
            onChange={handleChange}
            required
          />
          <label htmlFor="" className="label__right">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            className="input__right"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__Buttons">
          <button
            type="button"
            onClick={() => dispatch({ type: CLOSE_SIGNUP })}
          >
            Close
          </button>
          <button type="submit" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div className="extra__formButtons">
          <GoogleLogin
            clientId="419209056133-go6htupj48ppega1d66bj5suhvd9f6ic.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="google__signin">
                Sign Up With Google
              </button>
            )}
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </div>
      </form>
    </MediumDialog>
  );
};

export default Signup;
