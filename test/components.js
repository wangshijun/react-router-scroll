import React from 'react';

function Page1() {
  return (
    <div style={{ width: 20000, height: 20000 }} />
  );
}

function Page2() {
  return (
    <div style={{ width: 10000, height: 10000 }} />
  );
}

function ScrollableComponent() {
  return (
    <div style={{ width: 100, height: 100, overflow: 'hidden' }}>
      <div style={{ width: 20000, height: 20000 }} />
    </div>
  );
}

export {
  Page1,
  Page2,
  ScrollableComponent,
};
