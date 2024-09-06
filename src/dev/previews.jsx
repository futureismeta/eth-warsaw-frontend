import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { BalanceDisplay } from '../UserInterface/features/BalanceDisplay/index.js';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/BalanceDisplay">
        <BalanceDisplay />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
