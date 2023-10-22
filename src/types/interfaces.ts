export interface IOption {
  name: string;
  property: string;
  value: number;
  range : {
    min: number;
    max: number;
  },
  unit: string;
};

