import React, { useEffect, useState } from "react";

function getLocalStorageSavedData(key, initialValue) {
  const savedData = JSON.parse(localStorage.getItem(key));
  if (savedData) return savedData;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage(key, initialValue, savedData) {
  const [value, setValue] = useState(() => {
    return getLocalStorageSavedData(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return [value, setValue];
}
