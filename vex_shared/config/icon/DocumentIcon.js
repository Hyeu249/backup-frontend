import React from 'react';

const ImageIcon = ({ style, styleDiv, className, classDiv, onClick }) => {
  return (
    <div style={styleDiv} className={classDiv} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        fill="currentColor"
        viewBox="0 0 24 24"
        name="document"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M8 5a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-5h-4a3 3 0 01-3-3V5H8zm5 .414V9a1 1 0 001 1h3.586L13 5.414zM4 7a4 4 0 014-4h4.172a3 3 0 012.12.879l4.83 4.828A3 3 0 0120 10.828V17a4 4 0 01-4 4H8a4 4 0 01-4-4V7z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ImageIcon;
