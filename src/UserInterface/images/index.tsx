import React from 'react';

type ImageProps = {
  style?: React.CSSProperties;
};

export const AlephZero: React.FC<ImageProps> = ({ style }) => (
  <img src="/assets/images/alephzero.png" style={style} alt="Metis" />
);
