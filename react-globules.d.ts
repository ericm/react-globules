import React, { Component } from "react";

export interface GlobulesProps {
  widthPercent: boolean;
  heightPercent: boolean;
  width: number;
  height: number;
  speed: number;
  density: number;
}
export interface GlobulesState {
  width: number;
  height: number;
  primary: string;
  background: string;
  density: number;
}
export default class Globules extends Component<GlobulesProps, GlobulesState> {}
