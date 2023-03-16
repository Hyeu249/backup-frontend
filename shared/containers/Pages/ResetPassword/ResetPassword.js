import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import ResetPasswordStyleWrapper from './ResetPassword.styles';

export default function () {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [resetErrorMessage, setResetErrorMessage] = useState(null);

  useEffect(() => {
    const isMatched = newPassword === confirmPassword;
    setPasswordsMatch(isMatched);
  }, [newPassword, confirmPassword]);

  const isFormInvalid = !newPassword || !confirmPassword || !passwordsMatch;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const userData = {
      token: token,
      new_password: confirmPassword,
    };

    const response = await fetch(
      process.env.REACT_APP_API_URL + '/user/reset-password-with-token',
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
      history.push('/signin');
    }
  };
  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.resetPassTitle" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.resetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.resetPassDescription" />
            </p>
          </div>

          <div className="isoResetPassForm">
            {resetErrorMessage && (
              <p style={{ color: 'red' }}>{resetErrorMessage}</p>
            )}
            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordsMatch && (
                <p style={{ color: 'red' }}>
                  <IntlMessages id="page.confirmPasswordNotMatched" />
                </p>
              )}
            </div>

            <div className="isoInputWrapper">
              <Button
                type="primary"
                onClick={handleResetPassword}
                disabled={isFormInvalid}
              >
                <IntlMessages id="page.resetPassSave" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  );
}
