import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import authAction from '@iso/redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import SignInStyleWrapper from './SignIn.styles';
import { FormattedMessage } from 'react-intl';

const { login } = authAction;
const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.Auth.idToken);

  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const [errLogin, setErrLogin] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      username: e.target.elements[0].value,
      password: e.target.elements[1].value,
    };

    const response = await fetch(
      process.env.REACT_APP_API_URL + '/user/login',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
        },
      }
    );

    const data = await response.json();
    const UNAUTHORIZED = 401;
    if (response.status == UNAUTHORIZED) return setErrLogin(true);

    if (data.jwt) {
      dispatch(login(data.jwt));
    }
    dispatch(clearMenu());
    history.push('/dashboard');
  };
  let { from } = location.state || { from: { pathname: '/dashboard' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <form onSubmit={handleLogin}>
              <div className="isoInputWrapper">
                <FormattedMessage id="page.username">
                  {(msg) => (
                    <Input size="large" placeholder={msg} autoComplete="true" />
                  )}
                </FormattedMessage>
              </div>

              <div className="isoInputWrapper">
                <FormattedMessage id="page.password">
                  {(msg) => (
                    <Input
                      size="large"
                      type="password"
                      placeholder={msg}
                      autoComplete="false"
                    />
                  )}
                </FormattedMessage>
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button
                  style={{ backgroundColor: '#4280cd' }}
                  type="primary"
                  htmlType="submit"
                >
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              {errLogin && (
                <p className="isoHelperText" style={{ color: 'red' }}>
                  <IntlMessages id="page.errorLogin" />
                </p>
              )}
            </form>

            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgot-password" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
              <Link to="/signup">
                <IntlMessages id="page.signInCreateAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
