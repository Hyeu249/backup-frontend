import React from 'react';

export function Header() {
  return (
    <div
      style={{
        height: '170px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9e9e9',
      }}
    >
      <h1>Header</h1>
    </div>
  );
}

export function Content({ children }) {
  return <div className="flex-space-between">{children}</div>;
}

export function LeftContent({ children }) {
  return (
    <div
      style={{
        overflow: 'scroll',
        maxHeight: 'calc(100vh - 295px)',
        padding: '16px',
      }}
      className="custom-crollbar"
    >
      {children}
    </div>
  );
}

export function RightContent({ children }) {
  return (
    <div
      style={{
        overflow: 'scroll',
        maxHeight: 'calc(100vh - 295px)',
        flex: '1',
      }}
      className="custom-crollbar"
    >
      {children}
    </div>
  );
}
