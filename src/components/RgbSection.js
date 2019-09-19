import React from 'react';
import styled from 'styled-components';

import ColorSlider from './ColorSlider';

const Section = styled.section`
  width: 90%;
  border: 1px solid #aaa;
  border-radius: 8px;
  margin: 40px 0;
  padding: 15px;
`;

const SectionTitle = styled.h1`
  font-weight: 100;
  font-size: 30pt;
  background: #fff;
  position: relative;
  top: -1.5ex;
  margin: 0;
  padding: 0 20px;
  display: inline-block;
`;

export default function RgbSection(props){
  return (
    <Section>
      <SectionTitle>RGB</SectionTitle>
      <ColorSlider value={.25} label="R" displayColor="#ef2929"/>
      <ColorSlider value={.75} label="G" displayColor="#8ae234"/>
      <ColorSlider value={.33} label="B" displayColor="#729fcf"/>
    </Section>
  );
}

