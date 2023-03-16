import React from 'react';

const ImageIcon = ({ style, styleDiv, className, classDiv, onClick }) => {
  return (
    <div
      style={{ ...styleDiv, display: 'flex' }}
      className={classDiv}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 24 24"
        name="maximize"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4h-4a1 1 0 110-2h4a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a1 1 0 11-2 0V7zm0 9a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3zm5 0H5v3h3v-3zm4-9a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 101.414 1.414L15 10.414V12a1 1 0 102 0V8a1 1 0 00-1-1h-4z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ImageIcon;
