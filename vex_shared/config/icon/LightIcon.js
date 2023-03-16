import React from 'react';

const LightIcon = ({ style, styleDiv, className, classDiv, onClick }) => {
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
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 24 24"
        color="text-gray-400"
        name="hint"
        className={className}
        style={{ ...style }}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M13 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm5.707 3.707l1-1a1 1 0 00-1.414-1.414l-1 1a1 1 0 001.414 1.414zM12 9a3 3 0 00-3 3c0 .621.212 1.088.596 1.815l.073.136c.289.543.637 1.198.904 2.049h2.854c.267-.85.615-1.506.904-2.049l.073-.136C14.788 13.088 15 12.62 15 12a3 3 0 00-3-3zm-1.041 9c.027.314.041.647.041 1a1 1 0 102 0c0-.353.014-.686.041-1H10.96zM7 12a5 5 0 0110 0c0 1.16-.438 2.012-.829 2.75l-.06.116h-.001c-.372.7-.728 1.37-.935 2.343A8.514 8.514 0 0015 19a3 3 0 11-6 0c0-.71-.069-1.296-.175-1.791-.207-.972-.563-1.642-.935-2.343l-.061-.115C7.438 14.01 7 13.159 7 12zm-4-1a1 1 0 100 2h1a1 1 0 100-2H3zm17 0a1 1 0 100 2h1a1 1 0 100-2h-1zM4.293 4.293a1 1 0 011.414 0l1 1a1 1 0 01-1.414 1.414l-1-1a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default LightIcon;
