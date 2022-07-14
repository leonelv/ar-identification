import { DATA_LEN } from "../constants";
import { RAW_DNI } from "../types";
import splitDNIData from "./split-dni-data";
import validationSchema from "./validation-schema";

const validateData = async (data: string) => {
  const splittedString = splitDNIData(data);
  const hasCorrectLength = splittedString.length === DATA_LEN;

  if (hasCorrectLength) {
    const [id, surname, name, sex, dni, copy, dateOfBirth, dateOfIssue, cuilBase] = splittedString;
    const extractedValuesFromString: RAW_DNI = {
      id,
      surname,
      name,
      sex,
      dni,
      copy,
      dateOfBirth,
      dateOfIssue,
      cuilBase,
    };

    const validated = await validationSchema.parseAsync(extractedValuesFromString);

    return validated as RAW_DNI;
  } else {
    throw new Error(`INVALID_DNI: (${data}) Input has a length of ${splittedString.length}`);
  }
};

export default validateData;
