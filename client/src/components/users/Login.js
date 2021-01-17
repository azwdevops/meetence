// import installed packages
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

// import styles

// import material ui items

// import shared/global items

// import components/pages
import MinDialog from "../common/MinDialog";

// import redux API
import { CLOSE_LOGIN } from "../../redux/actions/types";

const Login = ({ googleSucess, googleFailure }) => {
  const dispatch = useDispatch();
  const loginForm = useSelector((state) => state.auth.loginForm);

  const handleLogin = (e) => {};

  const handleChange = (e) => {};

  return (
    <MinDialog isOpen={loginForm}>
      <form className="dialog">
        <h3>Login here</h3>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__Buttons">
          <button type="button" onClick={() => dispatch({ type: CLOSE_LOGIN })}>
            Close
          </button>
          <button type="submit">Login</button>
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
    </MinDialog>
  );
};

export default Login;
