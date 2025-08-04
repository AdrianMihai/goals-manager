import React from 'react';

type TableProps = React.PropsWithChildren & {
  data: Array<any>;
  onTableDataRender: (dataRow: any, columnId: string) => React.ReactNode | undefined;
};

export const Table = ({ data, children }: TableProps) => {};
