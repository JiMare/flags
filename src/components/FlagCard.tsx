import React from "react";
import Card from "@mui/material/Card/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { getFormattedPopulation } from "../utils/utils";

type Props = {
  title: string;
  population: number;
  region: "Africa" | "America" | "Asia" | "Europe" | "Oceania";
  capital: string;
  img: string;
  className?: string;
};

export const FlagCard: React.FC<Props> = ({
  title,
  population,
  region,
  capital,
  img,
  className,
}) => {

  return (
    <Card sx={{ width: 264, maxHeight: 348 }} className={className}>
      <CardMedia sx={{ height: 160 }} image={img} title="flag" />
      <CardContent sx={{ padding: "24px" }}>
        <h2 className="text-[18px] font-extrabold mb-[14px]">{title}</h2>
        <ul className="pb-[24px]">
          <li className="mb-[6px]">
            <h3 className="text-[14px] font-semibold">
              Population:{" "}
              <span className="font-light">{getFormattedPopulation(population)}</span>
            </h3>
          </li>
          <li className="mb-[6px]">
            <h3 className="text-[14px] font-semibold">
              Region: <span className="font-light">{region}</span>
            </h3>
          </li>
          <li>
            <h3 className="text-[14px] font-semibold">
              Capital: <span className="font-light">{capital}</span>
            </h3>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
