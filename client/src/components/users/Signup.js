// import installed packages
import { useState } from "react";
import { connect } from "react-redux";

// import styles

// import material ui items

// import shared/global items
import globals from "../../shared/globals";
import { ifEmpty, resetFormValues } from "../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API
import { CLOSE_SIGNUP, START_LOADING } from "../../redux/actions/types";
import { signup } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/shared";

const Signup = (props) => {
  const { signupForm, loading, alert } = props;
  const { startLoading, newAlert, signupUser, closeSignup } = props; // dispatch actions

  // internal state
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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

  // function to clear form values
  const resetSignup = () => {
    resetFormValues(newUser);
  };

  const closeSignupForm = () => {
    closeSignup();
    resetSignup();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (ifEmpty(newUser)) {
      return newAlert(error, fillFields);
    }
    // confirm passwords match
    if (password !== confirm_password) {
      return newAlert(error, "Passwords should match");
    }

    startLoading();
    // call the signup action creator
    signupUser(newUser, resetSignup);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  return (
    <MediumDialog isOpen={signupForm}>
      <form className="dialog" id={loading ? "formSubmitting" : ""}>
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
          <button type="button" onClick={closeSignupForm}>
            Close
          </button>
          <button type="submit" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </MediumDialog>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.shared?.loading,
    alert: state.shared?.alert,
    signupForm: state.auth.signupForm,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    newAlert: (type, msg) => dispatch(setAlert(type, msg)),
    signupUser: (newUser, resetSignup) =>
      dispatch(signup(newUser, resetSignup)),
    closeSignup: () => dispatch({ type: CLOSE_SIGNUP }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
