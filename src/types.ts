export type BlockInfo = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  hit: boolean;
  isBlock: boolean;
};

export type PlatformInfo = {
  x: number;
  y: number;
  w: number;
  h: number;
  isBlock: boolean;
};

export type PlayerState = {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  speed: number;
  jump: number;
  grounded: boolean;
  facing: 'left' | 'right';
};

export type CVItem = {
  period?: string;
  role?: string;
  desc?: string;
  category?: string;
  skills?: string;
  author?: string;
  quote?: string;
};

export type CVSection = {
  id: string;
  title: string;
  iconName: string;
  content?: string;
  items?: CVItem[];
};
