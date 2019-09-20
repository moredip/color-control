import tinycolor from 'tinycolor2';
import createColorFeedGateway from '../gateways/colorFeed';

const CHANGE_RGB_COMPONENT = "@color-control/color/CHANGE_RGB_COMPONENT";
const PUT_COLOR_STARTED = "@color-control/color/PUT_COLOR_STARTED";
const PUT_COLOR_SUCCEEDED = "@color-control/color/PUT_COLOR_SUCCEEDED";

const initialState = tinycolor("rebeccapurple");
const colorFeedGateway = createColorFeedGateway();

export default function reducer(state = initialState, action = {}) {
  const color = state;
  switch (action.type) {
    case CHANGE_RGB_COMPONENT:
      return tinycolor({
        ...color.toRgb(),
        ...rgbComponentOverlay(action)
      });
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
    dispatch({ type: PUT_COLOR_STARTED, color });

    const colorFromServer = await colorFeedGateway.putColor(color);

    dispatch({ type: PUT_COLOR_SUCCEEDED, colorFromServer });
  }
}
