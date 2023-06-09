import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getNamesByCodes } from "../services/queries";
import { useNavigate } from "react-router-dom";

type Props = {
  codes: string[];
};

export const Borders: React.FC<Props> = ({ codes }) => {
  const navigate = useNavigate();
  const namesData = useQuery({
    queryKey: ["names", { codes: codes }],
    queryFn: () => getNamesByCodes(codes),
  });

  return (
    <div className="flex flex-wrap gap-[10px]">
      {namesData.data
        ?.map((data: any) => data.name.common)
        .map((name: string) => (
          <button
            key={name}
            onClick={() => navigate(`/detail/${name}`)}
            className="shadow-md dark:bg-grey rounded-sm w-[96px] flex-shrink-0 py-[6px]"
          >
            <span className="text-[12px] font-light md:text-[14px]">
              {name}
            </span>
          </button>
        ))}
    </div>
  );
};
