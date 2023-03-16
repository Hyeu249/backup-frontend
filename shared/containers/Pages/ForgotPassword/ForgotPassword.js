import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './ForgotPassword.styles';

export default function () {
  const [email, setEmail] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [resetErrorMessage, setResetErrorMessage] = useState('');
  const [
    sendResetPasswordRequestSuccessMessage,
    setSendResetPasswordRequestSuccessMessage,
  ] = useState(false);

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = e.target.value;
    setEmail(value);
    setIsEmailTouched(true);
    setIsValidEmail(emailRegex.test(value));
  };

  const handleResetPasswordRequestSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
    };
    const response = await fetch(
      process.env.REACT_APP_API_URL + '/user/forgot-password',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
        },
      }
    );
    if (response.status !== 200) {
      const data = await response.json();
      if (data.message) {
        let messageObj = JSON.parse(data.message);
        setResetErrorMessage(messageObj.vi);
      }
    } else {
      setSendResetPasswordRequestSuccessMessage(true);
    }
  };
  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.forgetPassTitle" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.forgetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.forgetPassDescription" />
            </p>
          </div>
          {sendResetPasswordRequestSuccessMessage ? (
            <div style={{ color: 'green' }}>
              <p>
                <IntlMessages id="page.resetPasswordRequestSent" />
              </p>
            </div>
          ) : (
            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {!isValidEmail && isEmailTouched && (
                  <p style={{ color: 'red' }}>
                    <IntlMessages id="page.invalidEmail" />
                  </p>
                )}
              </div>
              {resetErrorMessage && (
                <div className="isoInputWrapper">
                  <p style={{ color: 'red' }}>{resetErrorMessage}</p>
                </div>
              )}
              <div className="isoInputWrapper">
                <Button
                  type="primary"
                  onClick={handleResetPasswordRequestSubmit}
                  disabled={!isValidEmail}
                >
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>
            </div>
          )}
          <Link to="/signin">
            <IntlMessages id="page.forgetPassBackSignIn" />
          </Link>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}
