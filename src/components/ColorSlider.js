import React from 'react';
import styled from 'styled-components';

const Number = styled.div`
  float: right;
  display: inline-block;
  margin: 0 21px;
  font-size: 32pt;

  color: ${props => props.displayColor};
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  height: 14px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #999;
    cursor: ew-resize;
    position:relative;
  }
`;

const Slider = styled(RangeInput)`
  display: inline-block;
  width: 70%;
  margin: 19px 0;

  background-color: ${props => props.displayColor};
`;

export default function ColorSlider({label,value,displayColor}){
  return (
    <div>
      <span class="label">{label}</span> 
      <Slider displayColor={displayColor} value={value} type="range" min="0" max="255"/>
      <Number displayColor={displayColor}>{value}</Number>
    </div>
  );
}
