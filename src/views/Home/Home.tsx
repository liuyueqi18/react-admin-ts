import React from "react";

export default function Home() {
  // console.log("import.meta :>> ", import.meta);
  console.log("process.env", process.env);
  return (
    <div>
      <p>这是基于 React18+TypeScript 构建的后台管理系统</p>
      <p>适合于新手上手</p>
    </div>
  );
}
