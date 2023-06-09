const options = { style: "decimal", maximumFractionDigits: 2 };
export const getFormattedPopulation = (population: number) => {
  return population.toLocaleString("en", options);
};
