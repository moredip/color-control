import React from 'react';
import ColorSlider from './ColorSlider';

export default function RgbSection(props){
  return (
    <section>
      <ColorSlider value={100} label="R" displayColor="#ef2929"/>
      <ColorSlider value={200} label="G" displayColor="#8ae234"/>
      <ColorSlider value={70} label="B" displayColor="#729fcf"/>
    </section>
  );
}

