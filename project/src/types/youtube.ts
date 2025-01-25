/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IYT {
  loading: number;
  loaded: number;
  get: any;
  Player: any;
  ready: any;
  scan: any;
  setConfig: any;
  subscribe: any;
  onsubscribe: any;
  PlayerState: {
    BUFFERING: number;
    CUED: number;
    ENDED: number;
    PAUSED: number;
    PLAYING: number;
    UNSTARTED: number;
  };
};
