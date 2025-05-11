// src/components/ui/Tabs.jsx
import { useState } from 'react';

export function Tabs({ tabs = [], children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveIndex(idx)}
            className={`py-2 px-4 rounded ${
              activeIndex === idx ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children[activeIndex]}</div>
    </div>
  );
}

export function Tab({ children }) {
  return <div>{children}</div>;
}
