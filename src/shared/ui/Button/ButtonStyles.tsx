import { cva } from 'class-variance-authority';

export const cvaButton = cva(
  [
    'ButtonStyles-cvaButton',
    'relative',
    'inline-flex items-center justify-center',
    'group/button cursor-pointer select-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      theme: {},
      size: {},
      isLoading: {
        true: ['!text-opacity-0'],
        false: [],
      },
    },
    defaultVariants: {},
  }
);

export const cvaIcon = cva(
  [
    'ButtonStyles-cvaIcon',
    'inline-flex justify-center items-center',
    'text-0',
    'rounded-full',
  ],
  {
    variants: {
      theme: {},
      size: {},
      isLoading: {},
    },
    defaultVariants: {},
  }
);

export const cvaButtonInner = cva(
  ['flex items-center text-white gap-2', 'block overflow-visible'],
  {
    variants: {
      size: {},
    },
  }
);

export const cvaButtonInnerRow = cva([
  'ButtonStyles-cvaButtonInnerRow',
  'relative',
  'block',
]);
