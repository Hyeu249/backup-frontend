import React from 'react';

const ImageDocumentIcon = ({
  style,
  styleDiv,
  classDiv,
  className,
  onClick,
}) => {
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
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        color="text-purple-500"
        name="document-image"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M8 5a2 2 0 00-2 2v8.586l2.293-2.293a1 1 0 011.414 0L11 14.586l4.293-4.293a1 1 0 011.414 0L18 11.586V9.243a2 2 0 00-.586-1.415l-2.242-2.242A2 2 0 0013.757 5H8zm0 14c-.702 0-1.32-.362-1.677-.91L9 15.415l1.293 1.293a1 1 0 001.414 0L16 12.414l2 2V17a2 2 0 01-2 2H8zm12-2V9.243a4 4 0 00-1.172-2.829l-2.242-2.242A4 4 0 0013.757 3H8a4 4 0 00-4 4v10a4 4 0 004 4h8a4 4 0 004-4zm-10-6.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default ImageDocumentIcon;
