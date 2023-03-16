import React from 'react';
import { CarIcon as CarIconReact } from '@iso/config/icon.config';

const CarIcon = ({ style, styleDiv, className, classDiv, onClick }) => {
  return (
    <div style={styleDiv} className={classDiv} onClick={onClick}>
      <CarIconReact size={19} type={{ ...style }} className={className} />
    </div>
  );
};

export default CarIcon;
