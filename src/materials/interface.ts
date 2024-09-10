import { PropsWithChildren } from 'react';

export interface ICommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  [key: string]: any;
}
