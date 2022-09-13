/** 
 * 路由类型
 */
export type RouteItemModel = {
  /** 路径 */
  path: string;
  /** 是否是页面级 */
  isPage?: boolean;
  /** 是否必须登录 */
  requiresAuth?: boolean;
  /** 侧边栏Icon */
  icon?: string;
  /** 页面标题 */
  title?: string;
  /** 页面组件 */
  component?: React.LazyExoticComponent<() => JSX.Element>;
  /** 子路由 */
  children?: RouteItemModel[];
};