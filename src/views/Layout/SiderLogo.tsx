import React from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/App.module.css";
import logo from "../../image/logo.png";

const SiderLogo = () => {
  const layoutState = useSelector(
    (state: { layout: { isShowSdier: boolean } }) => state.layout
  );

  return (
    <div className={styles.siderLogoContent}>
      <img src={logo} className={styles.siderLogo} alt="" />
      {!layoutState.isShowSdier && (
        <span className={styles.siderTitle}>React-Admin-Ts</span>
      )}
    </div>
  );
};
export default SiderLogo;
