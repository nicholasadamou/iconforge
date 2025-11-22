export interface Icon {
  id: string;
  unicode: string;
  label: string;
  styles: string[];
  search: string[];
}

export type IconStyle = 'solid' | 'regular' | 'brands';

export interface CanvasState {
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  stackedSize: number;
  icon: Icon | null;
  stackedIcon: Icon | null;
  stackedSelected: boolean;
}
