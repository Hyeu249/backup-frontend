import React from 'react';

const ExpandIcon = ({ className, style, size = null }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || '16'}
      height={size || '16'}
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
      name="caret-down"
      style={{ ...style }}
    >
      <path
        fill=""
        d="M6.985 8C6.13 8 5.682 9.122 6.26 9.817l4.733 5.695c.542.65 1.472.65 2.014 0l4.733-5.695c.578-.695.13-1.817-.725-1.817H6.985z"
      ></path>
    </svg>
  );
};

export default ExpandIcon;
