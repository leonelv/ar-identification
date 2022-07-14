import { RAW_DNI } from "../types";

const createCuil = ({ dni, cuilBase }: Pick<RAW_DNI, "dni" | "cuilBase">) => {
  const cuilStart = `${cuilBase[0]}${cuilBase[1]}`;
  const cuilEnd = cuilBase[2];
  const cuil = `${cuilStart}-${dni}-${cuilEnd}`;

  return cuil;
};

export default createCuil;
