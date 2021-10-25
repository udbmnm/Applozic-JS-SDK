import * as React from 'react';
import { motion, SVGMotionProps } from 'framer-motion';
import { RefAttributes } from 'react';
import { IconButton } from '@chakra-ui/button';

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const PluginViewToggle = ({
  toggle
}: {
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
  <IconButton
    onClick={toggle}
    type="button"
    aria-label="plugin-button"
    style={{
      outline: 'none',
      border: 'none',
      // -webkit-user-select: "none",
      // -moz-user-select: "none",
      // -ms-user-select: "none",
      cursor: 'pointer',
      position: 'absolute',
      top: '18px',
      left: '15px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'transparent'
    }}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' }
        }}
      />
    </svg>
  </IconButton>
);

export default PluginViewToggle;
