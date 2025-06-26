import { ThemeColors } from './ThemeColors';
import './types.d.ts';

export const ThemeValues = {
  colors: { ...ThemeColors },
  field: {
    defaultBorder: `1px solid ${ThemeColors.grey.veryLight}`,
    hoverBorder: `1px solid ${ThemeColors.grey.main}`,
    borderRadius: '4px',
  },
};
