/// <reference types="react-scripts" />

// interface ImportMetaEnv {
//   /** 环境类型 */
//   readonly REACT_APP_NODE_ENV: 'development' | 'stage' | 'prod';
//   /** Jenkins部署 */
//   readonly CI: boolean;
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_NODE_ENV: "development" | "stage" | "prod";
  }
}

declare module 'leancloud-storage'

declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
