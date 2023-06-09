import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { getAllFlags } from "../services/queries";
import { useQuery } from "@tanstack/react-query";
import { FlagCard } from "../components/FlagCard";
import { Link } from "react-router-dom";

export const Flags: React.FC = () => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  const onClear = (): void => {
    setSearchValue("");
    setShowClearIcon("none");
  };

  const flags = useQuery({
    queryKey: ["all"],
    queryFn: getAllFlags,
  });

  const filteredFlags = regionFilter
    ? flags.data.filter((flag: any) => flag.region === regionFilter)
    : flags.data;
  const resultFlags = searchValue
    ? filteredFlags.filter((flag: any) =>
        flag.name.common.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filteredFlags;

  return (
    <div className="px-[16px] pt-[26px] pb-[65px] md:px-[80px] md:pt-[48px]">
      <div className="md:flex md:justify-between md:mb-[18px]">
        <div className="mb-[40px] md:w-[480px]">
          <FormControl fullWidth>
            <TextField
              placeholder="Search for a country..."
              value={searchValue}
              onChange={onSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={onClear}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
        <FormControl className="w-[196px]" sx={{ marginBottom: "30px" }}>
          <InputLabel id="demo-simple-select-label">
            Filter by Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={regionFilter}
            onChange={(e) => {
              setRegionFilter(e.target.value);
            }}
          >
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="md:flex flex-wrap md:justify-between">
        {resultFlags?.map((flag: any) => (
          <Link key={flag.name.common} to={`/detail/${flag.name.common}`}>
            <FlagCard
              title={flag.name.common}
              population={flag.population}
              region={flag.region}
              capital={flag.capital}
              img={flag.flags.svg}
              className="mb-[40px] mx-auto md:mx-0 md:mb-[75px]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
