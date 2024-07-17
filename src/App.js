import React, { useState } from "react";
import Header from "./components/Header";
import BarChart from "./components/BarChart";
import "./App.css";
import CountryHeading from "./components/CountryHeading";
import WorldWide from "./components/WorldWide";

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <Header onSearchChange={handleSearchChange} />
      <WorldWide />
      <CountryHeading />
      <BarChart searchValue={searchValue} />
    </div>
  );
}
