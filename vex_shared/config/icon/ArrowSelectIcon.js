import React from 'react';

const ArrowSelectIcon = ({
  style,
  styleDiv,
  className,
  classDiv,
  onClick,
  size,
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
        version="2.0"
        focusable="false"
        aria-hidden="true"
        className={className}
        style={{
          ...style,
          width: size,
          height: size,
          transform: 'rotate(180deg)',
        }}
        viewBox="0 0 16 16"
      >
        <path d="M4 11h8L8 5l-4 6z" className=""></path>
      </svg>
    </div>
  );
};

export default ArrowSelectIcon;
