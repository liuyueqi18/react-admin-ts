import React from "react";

export default function Home() {
  console.log("REACT_APP_NODE_ENV :>> ", import.meta);
  console.log("process", process.env.REACT_APP_NODE_ENV);
  console.log("process", process.env);
  return (
    <div>
      <p>这是基于 React18+TypeScript 构建的后台管理系统</p>
      <p>适合于新手上手</p>
    </div>
  );
}
