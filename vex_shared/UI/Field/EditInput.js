import React from 'react';

const EditInput = ({ value, setIsEdit, setValue, font_name, inputType }) => {
  if (inputType === 'number') {
    return (
      <input
        value={value}
        type={inputType}
        style={{
          width: '66.666667%',
          height: '23.5px',
          fontFamily: font_name,
          fontSize: '13px',
          color: '#262C2D',
          borderRadius: '5px',
          boxSizing: 'border',
          padding: '0px 25px 0px 10px',
          outline: 'none',
          border: '1px solid #6cbdff',
          boxShadow: '0px 0px 0px 3px #63c2ff66 ',
        }}
        autoFocus={true}
        onBlur={() => setIsEdit(false)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setIsEdit(false);
          }
        }}
        onChange={e => setValue(e.target?.value)}
      />
    );
  }
  return (
    <textarea
      value={value}
      style={{
        width: '66.666667%',
        height: '23.5px',
        fontFamily: font_name,
        fontSize: '13px',
        color: '#262C2D',
        borderRadius: '5px',
        boxSizing: 'border',
        padding: '0px 25px 0px 10px',
        outline: 'none',
        border: '1px solid #6cbdff',
        boxShadow: '0px 0px 0px 3px #63c2ff66 ',
      }}
      autoFocus={true}
      onBlur={() => setIsEdit(false)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          setIsEdit(false);
        }
      }}
      onChange={e => setValue(e.target?.value)}
    ></textarea>
  );
};

export default EditInput;
