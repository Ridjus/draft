import { ReactComponent as VisibilityIcon } from '~/assets/icons/visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '~/assets/icons/visibility_off.svg';
import { useBoolean } from '~/hooks/useBoolean';
import './LoginForm.css';

export function LoginForm() {
  const [passwordVisibility, passwordVisibilityOptions] = useBoolean();

  return (
    <form className="login-form" autoComplete="off">
      <h3 className="login-title">Login to Your Account</h3>
      <div className="form-group">
        <label className="login-label" htmlFor="email/username">
          Email or username
        </label>
        <input className="login-input" type="text" id="email/username" />
      </div>
      <div className="form-group">
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-input login-password"
          type={passwordVisibility ? 'text' : 'password'}
          id="password"
        />
        <button
          type="button"
          className="password-visibility-btn"
          onClick={passwordVisibilityOptions.toggle}
        >
          {passwordVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
      <a href="/" className="forgot-password">
        Forgot password?
      </a>
      <button type="submit" className="form-btn">
        Sign in
      </button>
    </form>
  );
}
