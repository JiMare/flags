import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFlagByName } from "../services/queries";
import { getFormattedPopulation } from "../utils/utils";
import { Borders } from "../components/Borders";

export const FlagDetail: React.FC = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const [codes, setCodes] = useState([]);

  const detailFlag = useQuery({
    queryKey: ["name", name],
    queryFn: () => getFlagByName(name as string),
  });

  useEffect(() => {
    if (detailFlag.data) setCodes(detailFlag.data[0]?.borders);
  }, [detailFlag]);

  return (
    <div className="px-[28px] pb-[60px] md:px-[80px]">
      <button
        onClick={() => navigate("/")}
        className="mt-[40px] flex items-center justify-center gap-[8px] shadow-md px-[24px] py-[6px] mb-[64px] dark:bg-grey rounded-sm h-[32px] w-[104px] md:mt-[80px] md:h-[40px] md:w-[136px] md:py-[10px]"
      >
        <KeyboardBackspaceIcon sx={{ width: "20px" }} />
        <span className="text-[14px] font-light md:text-[16px]">Back</span>
      </button>
      {detailFlag.data && (
        <div className="md:flex md:justify-between md:items-start md:gap-[20px]">
          <img
            src={detailFlag.data[0].flags?.svg}
            alt="flag"
            className="w-[320px] h-[230px] mx-auto rounded-md md:mx-0 md:w-1/2 md:h-auto md:max-w-[560px]"
          />
          <div className="mt-[44px] w-[320px] mx-auto md:mx-0 md:mt-[40px] md:w-1/2">
            <h2 className="text-[22px] font-extrabold mb-[16px] md:text-[32px] md:mb-[23px]">
              {detailFlag.data[0].name.common}
            </h2>
            <div className="md:flex md:max-w-[560px] md:justify-between">
              <ul className="pb-[32px]">
                {detailFlag.data[0].name?.nativeName && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Native Name:{" "}
                      <span className="font-light">
                        {Object.values(detailFlag.data[0].name.nativeName)
                          .map((name: any) => name.common)
                          .join(", ")}
                      </span>
                    </h3>
                  </li>
                )}
                {detailFlag.data[0].population && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Population:{" "}
                      <span className="font-light">
                        {getFormattedPopulation(detailFlag.data[0].population)}
                      </span>
                    </h3>
                  </li>
                )}
                {detailFlag.data[0].region && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Region:{" "}
                      <span className="font-light">
                        {detailFlag.data[0].region}
                      </span>
                    </h3>
                  </li>
                )}
                {detailFlag.data[0].subregion && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Sub Region:{" "}
                      <span className="font-light">
                        {detailFlag.data[0].subregion}
                      </span>
                    </h3>
                  </li>
                )}
                {detailFlag.data[0].capital && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Capital:{" "}
                      <span className="font-light">
                        {detailFlag.data[0].capital}
                      </span>
                    </h3>
                  </li>
                )}
              </ul>
              <ul>
                {detailFlag.data[0].tld &&
                  detailFlag.data[0].tld.length > 0 && (
                    <li className="mb-[6px]">
                      <h3 className="text-[14px] font-semibold md:text-[16px]">
                        Top Level Domain:{" "}
                        <span className="font-light">
                          {detailFlag.data[0].tld[0]}
                        </span>
                      </h3>
                    </li>
                  )}
                {detailFlag.data[0].currencies && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Currencies:{" "}
                      <span className="font-light">
                        {Object.values(detailFlag.data[0].currencies)
                          .map((currency: any) => currency.name)
                          .join(", ")}
                      </span>
                    </h3>
                  </li>
                )}
                {detailFlag.data[0].languages && (
                  <li className="mb-[6px]">
                    <h3 className="text-[14px] font-semibold md:text-[16px]">
                      Languages:{" "}
                      <span className="font-light">
                        {Object.values(detailFlag.data[0].languages).join(", ")}
                      </span>
                    </h3>
                  </li>
                )}
              </ul>
            </div>
            {codes && codes.length > 0 && (
              <div className="md:flex md:items-start md:mt-[68px] md:gap-[16px]">
                <h3 className="text-[16px] font-semibold mt-[34px] mb-[16px] md:mt-0 md:whitespace-nowrap">
                  Border Countries:
                </h3>
                <Borders codes={codes} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
