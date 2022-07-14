import { Sex, UnparsedSex } from "../types";

const sexMap: Record<UnparsedSex, Sex> = {
  M: "MALE",
  F: "FEMALE",
  X: "NON_BINARY",
};

const getSex = (sex: UnparsedSex): Sex => {
  return sexMap[sex];
};

export default getSex;
