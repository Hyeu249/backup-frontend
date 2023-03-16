import React from 'react';
import classes from './EditLayer.module.css';

import EditPenIcon from '@iso/vex_config/icon/EditPenIcon';

const MultipleSelectionLayer = ({
  value,
  setIsEdit,
  font_name,
  options,
  err,
  setErrFields,
  field_name,
  setIsAllowEdit,
  disabled,
}) => {
  let color;
  let borderRed;
  let renderValue;
  let filteredOptions;

  const styleText = {
    position: 'relative',
    display: 'flex',
    flex: 'none',
    boxSizing: ' border-box',
    maxƯidth: '100%',
    height: '24px',
    marginTop: '2px',
    marginBottom: '2px',
    lineHeight: '22px',
    background: 'rgba(0,0,0,.06)',
    border: '1px solid rgba(5,5,5,.06)',
    borderRadius: '4px',
    cursor: 'default',
    transition: 'font-size .3s,line-height .3s,height .3s',
    userSelect: 'none',
    marginInlineEnd: ' 4px',
    paddingInlineStart: '8px',
    paddingInlineEnd: '4px',
  };
  if (err) {
    renderValue = err;
    color = 'red';
    borderRed = '1px solid red';
  } else {
    filteredOptions = options.filter(o => value.includes(o.value));
    renderValue = filteredOptions.map(option => {
      return (
        <div key={option.value} style={styleText}>
          {option.label}
        </div>
      );
    });
    color = '#006cb8';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '66.666667%',
        userSelect: 'none',
        border: borderRed,
        borderRadius: '5px',
      }}
      className={!disabled ? classes.field_hover : ''}
    >
      <label
        style={{
          display: 'none',
          position: 'absolute',
          top: '2px',
          right: '5px',
        }}
        className={classes.pencil_hover}
        onClick={() => {
          setErrFields(errs => {
            if (field_name === '') return errs;
            return { ...errs, [field_name]: false };
          });
          setIsEdit(true);
          setIsAllowEdit(true);
        }}
      >
        <EditPenIcon />
      </label>
      <div
        className="custom-crollbar"
        style={{
          display: 'flex',
          width: '100%',
          minHeight: '34px',
          maxHeight: '100px',
          overflowY: 'scroll',
          height: 'auto',
          flexWrap: 'wrap',
          fontFamily: font_name,
          fontSize: '13px',
          color: color,
          borderRadius: '5px',
          boxSizing: 'border',
          padding: '0px 25px 0px 10px',
        }}
      >
        {renderValue.length > 0 ? renderValue : '...'}
      </div>
    </div>
  );
};

export default MultipleSelectionLayer;
