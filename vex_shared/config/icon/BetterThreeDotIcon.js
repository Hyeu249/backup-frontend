import React from 'react';
import classes from './class.module.css';

const BetterThreeDotIcon = ({
  style,
  styleDiv,
  className,
  classDiv,
  onClick,
}) => {
  return (
    <div
      className={`${classes.bg_hover} ${classDiv}`}
      style={{
        ...styleDiv,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 24 24"
        name="bullet-list"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M5.5 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 6a1 1 0 011-1h9a1 1 0 110 2h-9a1 1 0 01-1-1zm-3.5 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 12a1 1 0 011-1h9a1 1 0 110 2h-9a1 1 0 01-1-1zm-3.5 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 17a1 1 0 100 2h9a1 1 0 100-2h-9z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default BetterThreeDotIcon;
