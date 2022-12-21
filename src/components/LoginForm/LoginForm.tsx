import { match } from 'ts-pattern';
import { useImmerReducer } from 'use-immer';

import { ReactComponent as VisibilityIcon } from '~/assets/icons/visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '~/assets/icons/visibility_off.svg';
import { useBoolean } from '~/hooks/useBoolean';
import { LoginCredentialsDTO } from '~/services/login';
import './LoginForm.css';

enum LOGIN_ACTIONS {
  EMAIL = 'email',
  PASSWORD = 'password',
}

interface LoginReducerAction {
  type: LOGIN_ACTIONS;
  payload: string;
}

const loginReducer = (state: LoginCredentialsDTO, action: LoginReducerAction) => {
  match<LOGIN_ACTIONS>(action.type)
    .with(LOGIN_ACTIONS.EMAIL, () => {
      state.email = action.payload;
      return state;
    })
    .with(LOGIN_ACTIONS.PASSWORD, () => {
      state.password = action.payload;
      return state;
    })
    .otherwise(() => state);
};

export function LoginForm() {
  const [loginData, updateLoginData] = useImmerReducer(loginReducer, { email: '', password: '' });
  const [passwordVisibility, passwordVisibilityOptions] = useBoolean();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(loginData);
  };

  return (
    <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
      <h3 className="login-title">Sign in to Your Account</h3>
      <div className="form-group">
        <label className="login-label" htmlFor="email/username">
          Email or username
        </label>
        <input
          className="login-input"
          type="text"
          id="email/username"
          value={loginData.email}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateLoginData({ type: LOGIN_ACTIONS.EMAIL, payload: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-input login-password"
          type={passwordVisibility ? 'text' : 'password'}
          id="password"
          value={loginData.password}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateLoginData({ type: LOGIN_ACTIONS.PASSWORD, payload: e.target.value })
          }
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
