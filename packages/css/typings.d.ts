declare type IObject = {
  [K: string]: any;
};

declare type StyleObject = React.CSSProperties & {
  [K: string]: StyleObject | string | number;
};
