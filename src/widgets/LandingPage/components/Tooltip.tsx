// components/Tooltip.tsx
import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div
          className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
          role="tooltip"
          style={{ bottom: '120%', left: '50%', transform: 'translateX(-50%)', width: '135px' }}
        >
          {content}
          <div
            className="tooltip-arrow"
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '5px solid #1f2937',
              backgroundColor: 'grey-700',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
