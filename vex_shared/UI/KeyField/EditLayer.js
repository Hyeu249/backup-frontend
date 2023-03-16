import React from 'react';
import classes from './EditLayer.module.css';

import EditPenIcon from '@iso/vex_config/icon/EditPenIcon';

import EditLayerStyle from './EditLayer.style';

const EditLayer = ({
  //field
  value,
  //set
  setIsEdit,
  //options
  options,
  //err
  field_name,
  err,
  setErrFields,
  //others
  font_name,
  setIsAllowEdit,
  disabled = false,
  style = {},
}) => {
  const textAfterHovered = value;
  let renderValue;
  let color;
  let borderRed;
  const isGreaterThan50 = value?.length > 20;

  if (err) {
    renderValue = err;
    color = 'red';
    borderRed = '1px solid red';
  } else {
    renderValue = options?.filter(o => o.value === value)[0]?.label;
    if (isGreaterThan50) renderValue = `${renderValue.substring(0, 20)}...`;
    color = '#006cb8';
  }

  return (
    <EditLayerStyle
      style={{
        border: borderRed,
        ...style,
      }}
      className={!disabled ? classes.field_hover : ''}
    >
      {isGreaterThan50 && (
        <div style={{ opacity: '0%' }} className="textAfterHovered">
          {textAfterHovered}
        </div>
      )}

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
        style={{
          width: '100%',
          height: '21.5px',
          fontFamily: font_name,
          fontSize: '13px',
          color: color,
          borderRadius: '5px',
          boxSizing: 'border',
          padding: '0px 25px 0px 10px',
        }}
      >
        {renderValue ? renderValue : '...'}
      </div>
    </EditLayerStyle>
  );
};

export default EditLayer;
