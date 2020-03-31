import tinycolor from 'tinycolor2';
import createColorFeedGateway from '../gateways/colorFeed';

const CHANGE_RGB_COMPONENT = "@color-control/color/CHANGE_RGB_COMPONENT";
const CHANGE_COLOR = "@color-control/color/CHANGE_COLOR";

const initialState = tinycolor("#000");
const colorFeedGateway = createColorFeedGateway();

export default function reducer(state = initialState, action = {}) {
  const color = state;
  switch (action.type) {
    case CHANGE_RGB_COMPONENT:
      return tinycolor({
        ...color.toRgb(),
        ...rgbComponentOverlay(action)
      });
    case CHANGE_COLOR:
      return action.colorFromServer;
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
export function changeRgbComponent({component,value}) {
  return async (dispatch,getState) => {
    dispatch({ type: CHANGE_RGB_COMPONENT, component, value });
    const {color} = getState();
    const colorFromServer = await colorFeedGateway.putColor(color);
    dispatch({ type: CHANGE_COLOR, colorFromServer });
  }
}

export function refreshColorFromBackend() {
  return async (dispatch) => {
    const colorFromServer = await colorFeedGateway.getColor();
    dispatch({ type: CHANGE_COLOR, colorFromServer });
  }
}
