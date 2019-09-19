import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import ColorSlider from './ColorSlider';
import {changeRgbComponent} from '../ducks/color';

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

export function RgbSection(props){
  return (
    <Section>
      <SectionTitle>RGB</SectionTitle>
      <ColorSlider value={props.redValue} onChange={props.onRedChanged} label="R" displayColor="#ef2929"/>
      <ColorSlider value={props.greenValue} onChange={props.onGreenChanged} label="G" displayColor="#8ae234"/>
      <ColorSlider value={props.blueValue} onChange={props.onBlueChanged} label="B" displayColor="#729fcf"/>
    </Section>
  );
}

const mapStateToProps = ({color}) => {
  const rgb = color.toRgb();
  return {
    redValue: rgb.r,
    greenValue: rgb.g,
    blueValue: rgb.b,
  };
};

const mapDispatchToProps = {
  onRedChanged: (value) => changeRgbComponent({component:'red',value}),
  onBlueChanged: (value) => changeRgbComponent({component:'blue',value}),
  onGreenChanged: (value) => changeRgbComponent({component:'green',value}),
};

export default connect(mapStateToProps,mapDispatchToProps)(RgbSection);
