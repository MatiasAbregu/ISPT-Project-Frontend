import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const FilterContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const FilterProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    setSearchTerm("");
  }, [pathname]);

  return (
    <FilterContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </FilterContext.Provider>
  );
};
