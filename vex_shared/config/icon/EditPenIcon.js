import React from 'react';

const EditPenIcon = ({ style, className, onClick }) => {
  return (
    <React.Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 24 24"
        name="edit"
        style={{ ...style }}
        className={className}
        onClick={onClick}
      >
        <path
          fill=""
          fillRule="evenodd"
          d="M17 5.121c-.42 0-.878.172-1.293.586L14.414 7 17 9.586l1.293-1.293c.415-.415.586-.873.586-1.293 0-.42-.172-.878-.586-1.293-.415-.414-.873-.586-1.293-.586zM15.586 11L13 8.414 6.874 14.54 5.581 18.42l3.879-1.293L15.586 11zM17 3.121c.995 0 1.95.415 2.707 1.172.757.757 1.172 1.712 1.172 2.707 0 .995-.415 1.95-1.172 2.707l-9 9a1 1 0 01-.39.242l-6 2a1 1 0 01-1.266-1.265l2-6a1 1 0 01.242-.391l9-9C15.05 3.536 16.005 3.12 17 3.12z"
          clipRule="evenodd"
        ></path>
      </svg>
    </React.Fragment>
  );
};

export default EditPenIcon;
