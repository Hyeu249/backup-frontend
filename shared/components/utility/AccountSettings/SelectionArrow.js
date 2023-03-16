import React from 'react';
import '@iso/cra/src/index.css';

const SelectionArrow = ({ className, style }) => {
  return (
    <svg
      xmlns=""
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`opacity-50 hover-opacity-100 ${className}`}
      name="chevron-down"
      style={{ ...style }}
    >
      <path
        fill=""
        fillRule="evenodd"
        d="M5.293 8.293a1 1 0 011.414 0L12 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default SelectionArrow;
