import React from 'react';

type ConditionalProps = React.PropsWithChildren & {
  when: boolean;
};

export const Conditional = ({ when, children }: ConditionalProps) => (when === true ? children : null);
