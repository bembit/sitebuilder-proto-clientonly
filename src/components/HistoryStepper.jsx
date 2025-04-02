// src/components/HistoryStepper.js
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

// Custom hook to debounce history updates
const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const HistoryStepper = () => {
  const { history, historyIndex } = useContext(ThemeContext);
  
  // Debounce history updates to 500ms to reduce render frequency
  const debouncedHistory = useDebouncedValue(history, 500);
  const debouncedHistoryIndex = useDebouncedValue(historyIndex, 500);

  // Memoize the change summaries to avoid recalculating on every render
  const changeSummaries = useMemo(() => {
    return debouncedHistory.map((state, index) => {
      if (index === 0) return 'Initial state';
      const prevState = debouncedHistory[index - 1];
      const prevLength = prevState.pageStructure.length;
      const currLength = state.pageStructure.length;
      if (currLength > prevLength) return `Added ${currLength - prevLength} element(s)`;
      if (currLength < prevLength) return `Removed ${prevLength - currLength} element(s)`;
      // Simplified check: only compare key fields instead of full JSON.stringify
      if (prevState.settings.backgroundColor !== state.settings.backgroundColor) return 'Background color changed';
      return 'Other change';
    });
  }, [debouncedHistory]);

  // Only render if there's history to show
  if (debouncedHistory.length === 0) {
    return (
      <div style={{ padding: '10px', border: '1px solid #ccc' }}>
        <h3>History Stepper</h3>
        <p>No history yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', maxHeight: '300px', overflowY: 'auto' }}>
      <h3>History Stepper</h3>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column-reverse' }}>
        {debouncedHistory.map((state, index) => {
          const isCurrent = index === debouncedHistoryIndex;
          return (
            <li
              key={index}
              style={{
                padding: '5px',
                backgroundColor: isCurrent ? '#333' : '#000',
                borderBottom: '1px solid #eee',
              }}
            >
              <strong>Step {index}</strong> {isCurrent && '(Current)'}
              <br />
              Elements: {state.pageStructure.length}
              <br />
              Change: {changeSummaries[index]}
            </li>
          );
        })}
      </ul>
      <p>
        Current Position: {debouncedHistoryIndex} / {debouncedHistory.length - 1}
      </p>
    </div>
  );
};

// Memoize to prevent re-renders unless history or historyIndex changes
export default React.memo(HistoryStepper, (prevProps, nextProps) => {
  return true;
});