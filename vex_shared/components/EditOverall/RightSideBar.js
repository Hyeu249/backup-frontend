import React, { useState } from 'react';

function RightSideBar({ onClick, defaultType, options }) {
  const [who, setWho] = useState(defaultType);
  return (
    <div style={{ width: '50px' }}>
      {options.map(({ type, IconLabel }) => {
        return (
          <IconLabel
            key={type}
            classDiv="flex-jtct-alct"
            onClick={() => {
              setWho(type);
              onClick({ type: type });
            }}
            styleDiv={{
              width: '100%',
              height: '50px',
              cursor: 'pointer',
              userSelect: 'none',
              backgroundColor: who === type ? '#e4f4ff' : '',
            }}
          />
        );
      })}
    </div>
  );
}
export default React.memo(RightSideBar);
