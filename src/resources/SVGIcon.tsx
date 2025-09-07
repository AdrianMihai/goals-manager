import React, { isValidElement, useMemo } from 'react';

export enum IconSize {
  Small = 14,
  Medium = 16,
  Large = 20,
  VeryLarge = 28,
  ExtremelyLarge = 48,
}

type IconProps = React.PropsWithChildren &
  React.SVGProps<SVGAElement> & {
    className?: string;
    size?: IconSize;
  };

export const SVGIcon = ({ children, className, size = IconSize.Medium, ...rest }: IconProps) => {
  const iconStyle = useMemo(
    () => ({
      width: `${size}px`,
      height: `${size}px`,
    }),
    [size]
  );

  const iconElement = useMemo(() => {
    if (isValidElement(children)) {
      return children;
    }

    return <span>Missing Icon</span>;
  }, [children]);

  return useMemo(
    () => React.cloneElement(iconElement, { style: iconStyle, className, 'data-part': rest['data-part'] }),
    [iconElement, iconStyle]
  );
};
