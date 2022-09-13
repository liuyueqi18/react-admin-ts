export type CopyKeys<T> = {
  [P in keyof T]: T[P];
};

export type PartialByKeys<T, K extends keyof any = keyof T> = CopyKeys<
  Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;

export type RequiredByKeys<T, K extends keyof any = keyof T> = CopyKeys<
  Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>
>;
