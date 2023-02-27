import { ReactNode } from 'react';

export interface Range {
  label: ReactNode;
  value: [Date, Date];
  closeOverlay?: boolean;
  placement?: 'bottom' | 'left';
}
