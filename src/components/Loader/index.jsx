import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import S from './style.module.css';

const Loader = () => {
  const ranodmColor = () => {
    const a = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    const color = `rgb(${a}, ${b}, ${c})`;
    return color;
  };

  return (
    <div className={S.loader}>
      <TailSpin
        type="TailSpin"
        color={ranodmColor()}
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loader;
