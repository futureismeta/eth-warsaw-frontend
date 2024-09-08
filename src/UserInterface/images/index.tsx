import React from 'react';

type ImageProps = {
  style?: React.CSSProperties;
};

export const AlephZeroLogo: React.FC<ImageProps> = ({ style }) => (
  <img src="/assets/images/alephzero.jpg" style={style} alt="Metis" />
);
