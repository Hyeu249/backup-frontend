import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import { IoIosFlash } from 'react-icons/io';
import logoVex from '../../../packages/vex-web/public/favicon.png';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div style={{ backgroundColor: 'white' }}>
          <h3>
            <Link to="/dashboard">
              {/* <IoIosFlash size={27} /> */}
              <img style={{ width: '50px' }} src={logoVex} alt="logo" />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};
