import { CSSProperties, PropsWithChildren } from 'react';

export interface ICommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  styles?: CSSProperties;
  [key: string]: any;
}
