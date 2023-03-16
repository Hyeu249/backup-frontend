import React from 'react';

const ThreeDotIcon = ({ style, styleDiv, className, classDiv, onClick }) => {
  return (
    <div
      style={{
        ...styleDiv,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className={classDiv}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 24 24"
        name="more-horiz"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M6 14a2 2 0 100-4 2 2 0 000 4zm8-2a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ThreeDotIcon;
