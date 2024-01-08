import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue
  );

  const save = (value) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
}

