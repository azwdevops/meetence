// import installed packages
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
// import styles

// import material ui items

// import shared/global items

// import components/pages
import MediumDialog from "../common/MediumDialog";
// import redux API
import { CLOSE_SIGNUP } from "../../redux/actions/types";

const Signup = ({ googleSucess, googleFailure }) => {
  const dispatch = useDispatch();
  const signupForm = useSelector((state) => state.auth.signupForm);

  const handleSignup = (e) => {};

  const handleChange = (e) => {};
  return (
    <MediumDialog isOpen={signupForm}>
      <form className="dialog">
        <h3>Create new account</h3>
        <div className="dialog__row">
          <label htmlFor="" className="label__left">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
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
                Google Sign In
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
