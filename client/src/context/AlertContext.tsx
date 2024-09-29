// src/context/AlertContext.tsx
import React, { createContext, useContext, useState } from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface Alert {
  id: number;
  type: AlertType;
  message: string;
}

interface AlertContextProps {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  let nextId = 0;

  const addAlert = (type: AlertType, message: string) => {
    const newAlert = { id: nextId++, type, message };
    setAlerts((prev) => [...prev, newAlert]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
