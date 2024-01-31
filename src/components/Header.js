import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "2px solid black",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  // Add backdrop filter for blurred background
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)", // For Safari
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function Header({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <div
      style={{
        padding: "10px",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
        margin: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottom: "2px solid black",
          padding: "0px 20px",
          // Add a backdrop filter for blurred background
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // For Safari
        }}
      >
        <div
          className="Logo-covid"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>COVID-19 TRACKER</h2>
        </div>
        <div
          className="search-covid"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Enter Country | City Name ..."
              inputProps={{ "aria-label": "search", value: searchValue }}
              onChange={handleSearchChange}
            />
          </Search>
        </div>
      </div>
    </div>
  );
}
