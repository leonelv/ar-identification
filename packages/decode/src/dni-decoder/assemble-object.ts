import { DNI, RAW_DNI, UnparsedSex } from "../types";
import createCuil from "./create-cuil";
import getDateOfExpiry from "./get-date-of-expiry";
import getSex from "./get-sex";
import parseDate from "./parse-date";

const assembleObject = ({ id, surname, name, sex, dni, copy, dateOfBirth, dateOfIssue, cuilBase }: RAW_DNI) => {
  const parsedDOI = parseDate(dateOfIssue);
  const parsedDOB = parseDate(dateOfBirth);
  const parsedDNI: Partial<DNI> = { id, surname, name, copy, dni };

  parsedDNI.dateOfIssue = parsedDOI.toDate();
  parsedDNI.dateOfBirth = parsedDOB.toDate();
  parsedDNI.dateOfExpiry = getDateOfExpiry({ dateOfIssue: parsedDOI, dateOfBirth: parsedDOB });
  parsedDNI.cuil = createCuil({ cuilBase, dni });
  parsedDNI.sex = getSex(sex as UnparsedSex);

  return parsedDNI as DNI;
};

export default assembleObject;
