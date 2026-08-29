"use client";

import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export function StateContextProvider({ children }) {
  const [place, setPlace] = useState("Colombo");
  const [weather, setWeather] = useState(null);

  return (
    <StateContext.Provider
      value={{
        place,
        setPlace,
        weather,
        setWeather,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}