import { useEffect, useRef, useState } from "react";

export type UseSyncStateType = <T>(
  state: T
) => [T, (val: T, callback: (data: T) => void) => void];

/**
 * 同步useState
 * @param state
 * @returns
 */
export const useSyncState: UseSyncStateType = (state) => {
  const cbRef: { current: any } = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [
    data,
    (val, callback) => {
      cbRef.current = callback;
      setData(val);
    },
  ];
};

export type CopyKeys<T> = {
  [P in keyof T]: T[P];
};

export type PartialByKeys<T, K extends keyof any = keyof T> = CopyKeys<
  Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;

export type RequiredByKeys<T, K extends keyof any = keyof T> = CopyKeys<
  Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;
