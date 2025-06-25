import React, { isValidElement, useMemo } from "react";

export enum IconSize {
  Small = 14,
  Medium = 16,
  Large = 20,
}

type IconProps = {
  size?: IconSize;
};

export const SVGIcon = ({
  children,
  size = IconSize.Medium,
}: React.PropsWithChildren & IconProps) => {
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
    () => React.cloneElement(iconElement, { style: iconStyle }),
    [iconElement, iconStyle]
  );
};
