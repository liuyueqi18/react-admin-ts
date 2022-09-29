import { CLOSE_SIDER, OPEN_SIDER } from "../constants";

export interface OpenSdierT {
  isShowSdier: boolean;
  type: OPEN_SIDER;
}

export interface CloseSdierT {
  isShowSdier: boolean;
  type: CLOSE_SIDER;
}

export type LayoutAction = OpenSdierT | CloseSdierT;

const handlerOpenSider = (isShowSdier: boolean): OpenSdierT => ({
  isShowSdier: isShowSdier,
  type: OPEN_SIDER,
});

const handlerCloseSider = (isShowSdier: boolean): CloseSdierT => ({
  isShowSdier: isShowSdier,
  type: CLOSE_SIDER,
});

export { handlerOpenSider, handlerCloseSider };
