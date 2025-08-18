export type SpacerProps = {
  size: number;
};

export type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  ratio?: number;
  verticalSpacing?: number | { top: number; bottom: number };
  horizontalSpacing?: number | { left: number; right: number };
};

export type MainAxisAlignment = 'start' | 'center' | 'end' | 'between' | 'evenly' | 'grouped';

export type CrossAxisAlignment = 'start' | 'end' | 'center';

export type FlexWrap = 'wrap' | 'nowrap' | 'reverse';

export type FlexContainerCofiguration = {
  mainAxisAlignment: MainAxisAlignment;
  crossAxisAlignment: CrossAxisAlignment;
  wrap: FlexWrap;
};

export type FlexRowConfiguration = {
  stretchToFullHeight: boolean;
};

export type FlexColConfiugration = {
  stretchToFullWidth: boolean;
};
