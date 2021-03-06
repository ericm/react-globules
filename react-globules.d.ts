import * as React from "react";

export interface GlobulesProps {
  widthPercent: boolean;
  heightPercent: boolean;
  width: number;
  height: number;
  speed: number;
  density: number;
  color?: string;
  background?: string;
  genMore?: boolean;
}
export interface GlobulesState {
  width: number;
  height: number;
  primary: string;
  background: string;
  density: number;
}
export default class Globules extends React.Component<
  GlobulesProps,
  GlobulesState
> {}
