import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useRegister = () => {
  const history = useHistory();
  //State
  const [isEmptyFirstName, setIsEmptyFirstName] = React.useState('init');
  const [isEmptyLastName, setIsEmptyLastName] = React.useState('init');
  const [isEmptyUserName, setIsEmptyUserName] = React.useState('init');
  const [isEmptyPassword, setIsEmptyPassword] = React.useState('init');
  const [isEmailNotValid, setIsEmailNotValid] = React.useState('init');
  const [isEmptyRepeatPassword, setIsEmptyRepeatPassword] =
    React.useState('init');
  const [isEmptyEmail, setIsEmptyEmail] = React.useState('init');
  const [isEmptyAddress, setIsEmptyAddress] = React.useState('init');

  const [isUserNameAlreadyExists, setUserNameAlreadyExists] =
    React.useState('init');
  const [isEmailAlreadyExists, setEmailAlreadyExists] = React.useState('init');
  const [isPasswordNotMatched, setIsPasswordNotMatched] =
    React.useState('init');

  const callBack = useCallback(() => {
    const handleRegister = async (event) => {
      event.preventDefault();
      const password = event.target.elements[3].value;
      const repeatPassword = event.target.elements[4].value;

      const userData = {
        first_name: event.target.elements[0].value,
        last_name: event.target.elements[1].value,
        username: event.target.elements[2].value,
        password: password,
        address: event.target.elements[5].value,
        email: event.target.elements[6].value,
        phone: event.target.elements[7].value,
        date_of_birth: new Date(event.target.elements[8].value),
      };

      const isSomethingEmpty =
        !userData.first_name ||
        !userData.last_name ||
        !userData.username ||
        !userData.password ||
        !repeatPassword ||
        !userData.address ||
        !userData.email;

      //Check if field is empty
      if (isSomethingEmpty) {
        if (userData.first_name === '') {
          setIsEmptyFirstName(true);
        } else {
          setIsEmptyFirstName(false);
        }
        if (userData.last_name === '') {
          setIsEmptyLastName(true);
        } else {
          setIsEmptyLastName(false);
        }
        if (userData.username === '') {
          setIsEmptyUserName(true);
        } else {
          setIsEmptyUserName(false);
        }
        if (password === '') {
          setIsEmptyPassword(true);
        } else {
          setIsEmptyPassword(false);
        }
        if (repeatPassword === '') {
          setIsEmptyRepeatPassword(true);
        } else {
          setIsEmptyRepeatPassword(false);
        }
        if (userData.address === '') {
          setIsEmptyAddress(true);
        } else {
          setIsEmptyAddress(false);
        }
        if (userData.email === '') {
          setIsEmptyEmail(true);
        } else {
          setIsEmptyEmail(false);
        }

        return;
      } else {
        setIsEmptyFirstName(false);
        setIsEmptyLastName(false);
        setIsEmptyUserName(false);
        setIsEmptyPassword(false);
        setIsEmptyRepeatPassword(false);
        setIsEmptyAddress(false);
        setIsEmptyEmail(false);
      }

      //Check if password is matched
      if (password != repeatPassword) {
        setIsPasswordNotMatched(true);
      } else {
        setIsPasswordNotMatched(false);
      }

      const response = await fetch(
        process.env.REACT_APP_API_URL + '/user/register',
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

      const BADREQUEST = 400;
      if (response.status == BADREQUEST) {
        //Check if user is already exists
        if (data.message?.includes('username already exists')) {
          setUserNameAlreadyExists(true);
        } else {
          setUserNameAlreadyExists(false);
        }

        //Check if email is valid
        if (data.errors?.email?.includes('email must be a valid email')) {
          setIsEmailNotValid(true);
        } else {
          setIsEmailNotValid(false);
        }

        //Check if Email already exists
        if (data.message?.includes('email already exists')) {
          setEmailAlreadyExists(true);
        } else {
          setEmailAlreadyExists(false);
        }

        return;
      } else {
        setUserNameAlreadyExists(false);
        setIsEmailNotValid(false);
        setEmailAlreadyExists(false);
      }

      const SUCCESS = 200;
      if (response.status === SUCCESS) {
        alert('Tạo tài khoản thành công');
        history.push('/signin');
      }
    };

    return {
      handleRegister,
    };
  }, []);
  return {
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
  };
};

export default useRegister;
