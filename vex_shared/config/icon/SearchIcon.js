import React from 'react';

const SearchIcon = ({
  style,
  styleDiv,
  className,
  classDiv,
  onClick,
  size = 16,
}) => {
  return (
    <div
      style={{ ...styleDiv, display: 'flex' }}
      className={classDiv}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="currentColor"
        viewBox="0 0 24 24"
        color="text-gray-600"
        name="search"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M11 5c-3.277 0-6 2.723-6 6s2.723 6 6 6c1.584 0 3.133-.69 4.208-1.722C16.326 14.206 17 12.694 17 11c0-3.277-2.723-6-6-6zm-8 6c0-4.381 3.619-8 8-8 4.382 0 8 3.619 8 8 0 1.87-.625 3.595-1.711 4.958l3.41 3.326a1 1 0 11-1.397 1.432l-3.45-3.366C14.509 18.356 12.792 19 11 19c-4.381 0-8-3.618-8-8z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default SearchIcon;
