import AMapLoader from "@amap/amap-jsapi-loader";
import { message } from "antd";

import gdStyle from "../../styles/SZArderCard/gd.module.css";

import fixedLogo from "../../image/fixedLogo.png";
import { getSZLeisureCardData } from "../../service/szLeisureCard";
import { useEffect, useState } from "react";

window._AMapSecurityConfig = {
  securityJsCode: "e5783ee62505e5504e02825477bdba91",
};

type LeisuerDataT = ReturnType<typeof getSZLeisureCardData> extends Promise<
  infer T
>
  ? T
  : never;

let map: {
  add: (data: any) => void;
  setFitView: (
    overlays: [] | null,
    immediately: boolean,
    avoid: number[],
    maxZoom?: number
  ) => void;
};

const getContent = (item: LeisuerDataT[0]) => {
  return `
  <div class=${gdStyle.content}>
    <img src=${fixedLogo} class=${gdStyle.img} alt="" />
    <span class=${gdStyle.text}>${item.name}</span>
  </div>
  `;
};

const markerClick = (data: {
  target: {
    getExtData: () => LeisuerDataT[0];
  };
}) => {
  const item = data.target.getExtData();
  console.log("item :>> ", item);
};

export default function GD() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const isMobileFun = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const getMapData = async () => {
    isMobileFun();
    const data = await getSZLeisureCardData();
    AMapLoader.load({
      key: "e5783ee62505e5504e02825477bdba91",
      version: "2.0",
      plugins: [],
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          zoom: 10,
          center: [120.610868, 31.329679],
        });
        data.forEach((i) => {
          const marker = new AMap.Marker({
            content: getContent(i),
            position: i.position,
          });
          marker.setExtData(i);
          marker.on("click", markerClick);
          map.add(marker);
        });
        if (!isMobile) {
          map.setFitView(null, false, [100, 100, 100, 100]);
        }
      })
      .catch((e) => {
        message.error(JSON.stringify(e) || "错误");
      });
  };
  useEffect(() => {
    getMapData();
    return () => {
      // Nothing...
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className={!isMobile ? gdStyle.map : gdStyle.mobileMap}>
      <div
        id="container"
        className={!isMobile ? gdStyle.map : gdStyle.mobileMap}
      ></div>
    </div>
  );
}
