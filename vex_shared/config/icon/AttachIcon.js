import React from 'react';

const AttachIcon = ({ style, styleDiv, className, classDiv, onClick }) => {
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
        name="attachment"
        className={className}
        style={style}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M17.245 4.844a2.825 2.825 0 00-4.028 0L6.404 11.73a4.887 4.887 0 000 6.855 4.738 4.738 0 006.754 0l6.131-6.197a1 1 0 111.422 1.407l-6.132 6.197a6.738 6.738 0 01-9.597 0c-2.643-2.671-2.643-6.998 0-9.67l6.813-6.885a4.825 4.825 0 016.872 0 4.924 4.924 0 010 6.915l-6.132 6.197a2.913 2.913 0 01-4.146 0 2.962 2.962 0 010-4.16l5.45-5.509a1 1 0 011.422 1.407l-5.45 5.508a.962.962 0 000 1.348.913.913 0 001.303 0l6.131-6.197a2.924 2.924 0 000-4.102z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default AttachIcon;
