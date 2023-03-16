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
        name="image"
        style={style}
        className={className}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M3 7a4 4 0 014-4h10a4 4 0 014 4V17a4 4 0 01-4 4H7a4 4 0 01-4-4V7zm16 0v6.586L16.414 11a2 2 0 00-2.828 0L10 14.586 9.414 14a2 2 0 00-2.828 0L5 15.586V7a2 2 0 012-2h10a2 2 0 012 2zM7 19c-.702 0-1.32-.362-1.677-.91L8 15.415 11.586 19H7zm10 0h-2.586l-3-3L15 12.414l4 4V17a2 2 0 01-2 2zM9 6a3 3 0 100 6 3 3 0 000-6zM8 9a1 1 0 112 0 1 1 0 01-2 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ImageIcon;
