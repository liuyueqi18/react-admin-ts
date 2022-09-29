type State = {
  isShowSdier: boolean;
};

const defaultState = {
  isShowSdier: false,
};

const layout = (state: State = defaultState, action: any) => {
  switch (action.type) {
    case "OPEN_SIDER":
      state.isShowSdier = true;
      return { ...state };
    case "CLOSE_SIDER":
      state.isShowSdier = false;
      return { ...state };
    default:
      return state;
  }
};

export default layout;
