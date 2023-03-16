import React from 'react';
import { useDispatch } from 'react-redux';

import Dropdown, {
  DropdownMenu,
  MenuItem,
} from '@iso/components/uielements/dropdown';
import authAction from '@iso/redux/auth/actions';

import NavigateLogo from './NavigateLogo';
import SelectionArrow from './SelectionArrow';
import classes from './AccountSettings.module.css';
import '@iso/cra/src/index.css';
import { PersonOutlineIcon, LogOutIcon } from '@iso/config/icon.config';

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default ({ collapsed }) => {
  return (
    <div
      className=""
      style={{
        height: '60px',
        borderBottom: '1px solid #12151529',
      }}
    >
      {collapsed ? <NavigateLogo collapsed={collapsed} /> : <AccountSettings />}
    </div>
  );
};

function AccountSettings() {
  const userInfo = {
    userName: 'Bao Hieu',
    userEmail: 'labaohieu@gmail.com',
    userAvatarImage: undefined,
  };

  return (
    <Dropdown
      overlay={<MenuDropdown userInfo={userInfo} />}
      trigger={['click']}
    >
      <div style={{ width: '100%', height: '100%' }}>
        {/* dropdown */}
        <div
          className={classes.moreDarkBlue_hover}
          style={{
            padding: '9px 16px',
            color: 'white',
            width: '100%',
            height: '100%',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <div>
                <div className="flex-spbt-alct">
                  <span
                    style={{
                      display: 'block',
                      fontFamily: fontFamily,
                      fontSize: '14px',
                      fontWeight: '600',
                      lineHeight: '16px',
                    }}
                  >
                    VEX transportation
                  </span>
                  <SelectionArrow />
                </div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: fontFamily,
                    fontSize: '12px',
                    color: '#ffffffbf',
                    lineHeight: '16px',
                  }}
                >
                  {userInfo?.userName || ''}
                </span>
              </div>
              <div
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  backgroundColor: !userInfo.userAvatarImage ? '#ee60b5' : '',
                }}
                className="flex-jtct-alct"
              >
                {!userInfo.userAvatarImage ? (
                  <div>
                    {userInfo.userName
                      ?.split(' ')
                      ?.map(letter => letter[0])
                      ?.join('')}
                  </div>
                ) : (
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                    src={userInfo.userAvatarImage}
                    alt="avatar"
                  ></img>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

function DropdownHeader() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '5px',
          border: '1px dotted black',
        }}
      ></div>
      <div
        style={{ fontFamily: fontFamily, fontSize: '16px', fontWeight: '600' }}
      >
        VEX transportation
      </div>
    </div>
  );
}

function MenuDropdown({ userInfo }) {
  const dispatch = useDispatch();
  const { logout } = authAction;

  return (
    <div className="dropdown-menu" style={{ width: '300px' }}>
      <DropdownHeader />
      <HeaderItem userInfo={userInfo} />
      <div className="flex-alct dropdown-item">
        <PersonOutlineIcon style={{ fontSize: '20px' }} />
        <div style={{ fontFamily: fontFamily, paddingLeft: '10px' }}>
          Thông tin cá nhân
        </div>
      </div>

      <div
        className="flex-alct dropdown-item"
        style={{ fontFamily: fontFamily }}
      >
        <LogOutIcon style={{ fontSize: '20px' }} />
        <div
          style={{ fontFamily: fontFamily, paddingLeft: '10px' }}
          onClick={() => dispatch(logout())}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
}

function HeaderItem({ userInfo }) {
  return (
    <div
      className="flex-alct"
      style={{ borderTop: '1px solid #00000017', marginBottom: '7px' }}
    >
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: !userInfo.userAvatarImage ? '#ee60b5' : '',
        }}
        className="flex-jtct-alct"
      >
        {!userInfo.userAvatarImage ? (
          <div style={{ fontSize: '13px', color: 'white' }}>
            {userInfo.userName
              ?.split(' ')
              ?.map(letter => letter[0])
              ?.join('')}
          </div>
        ) : (
          <img
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            }}
            src={userInfo.userAvatarImage}
            alt="avatar"
          ></img>
        )}
      </div>
      <div style={{ paddingLeft: '10px' }}>
        <div
          style={{
            fontFamily: fontFamily,
            fontSize: '13px',
          }}
        >
          {userInfo.userName || ''}
        </div>
        <div
          style={{ fontFamily: fontFamily, fontSize: '10px', color: '#a6a6a6' }}
        >
          {userInfo.userEmail || ''}
        </div>
      </div>
    </div>
  );
}
