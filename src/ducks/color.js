import tinycolor from 'tinycolor2';
import {GLOBALTON as colorFeedGateway} from '../gateways/colorFeed';

const CHANGE_RGB_COMPONENT = "@color-control/color/CHANGE_RGB_COMPONENT";
const CHANGE_COLOR = "@color-control/color/CHANGE_COLOR";

const initialState = tinycolor("#000");

export default function reducer(state = initialState, action = {}) {
  const color = state;
  switch (action.type) {
    case CHANGE_RGB_COMPONENT:
      return tinycolor({
        ...color.toRgb(),
        ...rgbComponentOverlay(action)
      });
    case CHANGE_COLOR:
      return action.newColor;
    default: return state;
  }
}

function rgbComponentOverlay({component,value}){
  switch (component) {
    case 'red': return {r:value};
    case 'green': return {g:value};
    case 'blue': return {b:value};
    default: return {};
  }
}

// Action Creators

export function updateColor(newColor){
  return {
    type: CHANGE_COLOR,
    newColor
  }
}

export function changeRgbComponent({component,value}) {
  return (dispatch,getState) => {
    dispatch({ type: CHANGE_RGB_COMPONENT, component, value });
    const {color} = getState();
    colorFeedGateway.putColor(color);
  }
}
