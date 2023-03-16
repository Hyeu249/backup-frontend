import React from 'react';
import classes from './EditLayer.module.css';

import EditPenIcon from '@iso/vex_config/icon/EditPenIcon';

import EditLayerStyle from './EditLayer.style';

const EditLayer = ({
  value,
  setIsEdit,
  font_name,
  options,
  err,
  setErrFields,
  field_name,
  setIsAllowEdit,
  fieldType,
  inputType,
  disabled,
}) => {
  const textAfterHovered = value;
  let renderValue;
  let color;
  let borderRed;
  const isGreaterThan50 = value?.length > 50;

  if (err) {
    renderValue = err;
    color = 'red';
    borderRed = '1px solid red';
  } else {
    switch (fieldType) {
      case 'input':
        renderValue = value;
        if (isGreaterThan50) renderValue = `${value.substring(0, 50)}...`;
        if (inputType === 'number') {
          renderValue = Number(renderValue)?.toLocaleString('vi-VN');
        }

        color = '#262C2D';
        break;
      case 'select':
        renderValue = options?.filter(o => o.value === value)[0]?.label;
        color = '#006cb8';
        break;
      default:
        renderValue = value;
        color = '#262C2D';
    }
    if (disabled) {
      color = '#006cb8';
    }
  }

  return (
    <EditLayerStyle
      style={{
        border: borderRed,
        userSelect: disabled ? 'text' : 'none',
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
