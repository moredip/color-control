import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const SwatchEl = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 50pt;

  background-color: ${props => props.displayColor};
`;

export function Swatch({color}){
    const hexColor = color.toHexString();
    return (
        <SwatchEl displayColor={hexColor}>{hexColor}</SwatchEl>
    );
}

const mapStateToProps = ({color}) => {
    return {color};
};

const mapDispatchToProps = undefined;

export default connect(mapStateToProps,mapDispatchToProps)(Swatch);