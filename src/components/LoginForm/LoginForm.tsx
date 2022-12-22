import { useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';
import { useImmerReducer } from 'use-immer';

import { ReactComponent as VisibilityIcon } from '~/assets/icons/visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '~/assets/icons/visibility_off.svg';
import { useBoolean } from '~/hooks/useBoolean';
import { LoginCredentialsDTO, loginWithEmailAndPassword } from '~/services/login';

import { Loader } from '../Loader/Loader';
import './LoginForm.css';

enum LOGIN_ACTIONS {
  EMAIL = 'email',
  PASSWORD = 'password',
  ERROR = 'error',
  LOADING = 'loading',
}

interface LoginReducerAction {
  type: LOGIN_ACTIONS;
  payload: string | boolean;
}

interface LoginReducerState extends LoginCredentialsDTO {
  isError: boolean;
  isLoading: boolean;
}

const loginReducer = (state: LoginReducerState, action: LoginReducerAction) => {
  match<LOGIN_ACTIONS>(action.type)
    .with(LOGIN_ACTIONS.EMAIL, () => {
      state.email = action.payload as string;
      state.isError = false;
      return state;
    })
    .with(LOGIN_ACTIONS.PASSWORD, () => {
      state.password = action.payload as string;
      state.isError = false;
      return state;
    })
    .with(LOGIN_ACTIONS.ERROR, () => {
      state.isError = action.payload as boolean;
      return state;
    })
    .with(LOGIN_ACTIONS.LOADING, () => {
      state.isLoading = action.payload as boolean;
    })
    .otherwise(() => state);
};

export function LoginForm() {
  const navigate = useNavigate();
  const [loginData, updateLoginData] = useImmerReducer(loginReducer, {
    email: '',
    password: '',
    isError: false,
    isLoading: false,
  });
  const [passwordVisibility, passwordVisibilityOptions] = useBoolean();

  const setLoginError = () => updateLoginData({ type: LOGIN_ACTIONS.ERROR, payload: true });
  const setLoginLoading = () => updateLoginData({ type: LOGIN_ACTIONS.LOADING, payload: true });
  const setLoginLoaded = () => updateLoginData({ type: LOGIN_ACTIONS.LOADING, payload: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password || loginData.isError) {
      setLoginError();
      return;
    }

    setLoginLoading();
    loginWithEmailAndPassword(loginData).then((res) => {
      if (res.status === 200) {
        navigate('/home');
      } else {
        setLoginError();
        setLoginLoaded();
      }
    });
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
          data-error={loginData.isError}
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
          data-error={loginData.isError}
        />
        <button
          type="button"
          className="password-visibility-btn"
          onClick={passwordVisibilityOptions.toggle}
        >
          {passwordVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
      <a href="/sign-in" className="forgot-password">
        Forgot password?
      </a>
      <button type="submit" className="form-btn">
        {loginData.isLoading ? <Loader color="#121212" /> : 'Sign in'}
      </button>
    </form>
  );
}
