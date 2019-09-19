import tinycolor from 'tinycolor2';

const CHANGE_RGB_COMPONENT = "@color-control/color/CHANGE_RGB_COMPONENT";

const initialState = tinycolor("rebeccapurple");

// Reducer
export default function reducer(state = initialState, action = {}) {
  const color = state;
  switch (action.type) {
    case CHANGE_RGB_COMPONENT:
      return tinycolor({
        ...color.toRgb(),
        ...rgbComponentOverlay(action)
      });
      break;
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
  return { type: CHANGE_RGB_COMPONENT, component, value };
}
