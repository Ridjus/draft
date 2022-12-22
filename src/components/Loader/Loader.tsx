import * as React from 'react';
import './Loader.css';

export function Loader({ color }: { color: string }) {
  return (
    <div
      className="loader"
      style={{ '--color': color, '--base': `${color}4d` } as React.CSSProperties}
    />
  );
}
