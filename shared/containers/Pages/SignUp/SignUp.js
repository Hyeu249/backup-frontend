import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import authAction from '@iso/redux/auth/actions';
import appActions from '@iso/redux/app/actions';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignUpStyleWrapper from './SignUp.styles';
import { FormattedMessage } from 'react-intl';
import ErrorField from './ErrorField';
import useRegister from './hook/useRegister';

const { login } = authAction;
const { clearMenu } = appActions;

export default function SignUp() {
  const {
    isEmptyFirstName,
    isEmptyLastName,
    isEmptyUserName,
    isEmptyPassword,
    isEmailNotValid,
    isEmptyRepeatPassword,
    isEmptyEmail,
    isEmptyAddress,
    isUserNameAlreadyExists,
    isEmailAlreadyExists,
    isPasswordNotMatched,
    callBack,
  } = useRegister();
  const { handleRegister } = callBack();

  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>

          <form className="isoSignUpForm" onSubmit={handleRegister}>
            <ErrorField is={isEmptyFirstName} IntlId="page.emptyFirstName" />
            <ErrorField is={isEmptyLastName} IntlId="page.emptyLastName" />
            <div className="isoInputWrapper isoLeftRightComponent">
              <FormattedMessage id="page.firstname">
                {msg => <Input size="large" placeholder={msg} />}
              </FormattedMessage>
              <FormattedMessage id="page.lastname">
                {msg => <Input size="large" placeholder={msg} />}
              </FormattedMessage>
            </div>
            <ErrorField is={isEmptyUserName} IntlId="page.emptyUserName" />
            <ErrorField
              is={isUserNameAlreadyExists}
              IntlId="page.ErrUsernameAlreadyExist"
            />
            <div className="isoInputWrapper">
              <FormattedMessage id="page.username">
                {msg => <Input size="large" placeholder={msg} />}
              </FormattedMessage>
            </div>
            <ErrorField
              is={isPasswordNotMatched}
              IntlId="page.passwordNotMatched"
            />
            <ErrorField is={isEmptyPassword} IntlId="page.emptyPassword" />
            <div className="isoInputWrapper">
              <FormattedMessage id="page.password">
                {msg => (
                  <Input size="large" type="password" placeholder={msg} />
                )}
              </FormattedMessage>
            </div>
            <ErrorField
              is={isPasswordNotMatched}
              IntlId="page.passwordNotMatched"
            />
            <ErrorField
              is={isEmptyRepeatPassword}
              IntlId="page.emptyPassword"
            />
            <div className="isoInputWrapper">
              <FormattedMessage id="page.confirmPassword">
                {msg => (
                  <Input size="large" type="password" placeholder={msg} />
                )}
              </FormattedMessage>
            </div>
            <ErrorField is={isEmptyAddress} IntlId="page.emptyAddress" />
            <div className="isoInputWrapper">
              <FormattedMessage id="page.address">
                {msg => <Input size="large" type="text" placeholder={msg} />}
              </FormattedMessage>
            </div>

            <ErrorField
              is={isEmailAlreadyExists}
              IntlId="page.emailAlreadyExists"
            />
            <ErrorField is={isEmptyEmail} IntlId="page.emptyEmail" />
            <ErrorField is={isEmailNotValid} IntlId="page.emailIsNotValid" />
            <div className="isoInputWrapper">
              <FormattedMessage id="page.email">
                {msg => <Input size="large" type="text" placeholder={msg} />}
              </FormattedMessage>
            </div>
            <div className="isoInputWrapper">
              <FormattedMessage id="page.phone">
                {msg => <Input size="large" type="tel" placeholder={msg} />}
              </FormattedMessage>
            </div>
            <div className="isoInputWrapper isoForgotPass">
              <IntlMessages id="page.dateOfBirth" />
              <Input size="large" type="date" />
            </div>
            <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
              <Checkbox>
                <IntlMessages id="page.signUpTermsConditions" />
              </Checkbox>
            </div>
            <div className="isoInputWrapper">
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: '#4280cd', cursor: 'pointer' }}
              >
                <IntlMessages id="page.signUpButton" />
              </Button>
            </div>
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
