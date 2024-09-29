// src/components/Alert.tsx
import React from 'react';
import { useAlert } from '../context/AlertContext';

const Alert: React.FC = () => {
  const { alerts, removeAlert } = useAlert();

  return (
    <>
      {alerts.map((alert) => (
        <div key={alert.id} className={`flex items-center p-4 mb-4 text-${alert.type}-800 rounded-lg bg-${alert.type}-50`} role="alert">
          <div className="ms-3 text-sm font-medium">
            {alert.message}
          </div>
          <button
            type="button"
            className="ms-auto p-1.5"
            onClick={() => removeAlert(alert.id)}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
};

export default Alert;
