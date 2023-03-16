import React from 'react';
import { Link } from 'react-router-dom';

import logoVex from '../../../../packages/vex-web/public/favicon.png';

const NavigateLogo = ({ collapsed }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <h3
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to="/dashboard">
          <img style={{ width: '45px' }} src={logoVex} alt="logo" />
        </Link>
      </h3>
    </div>
  );
};

export default NavigateLogo;
