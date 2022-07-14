import dayjs, { Dayjs } from "dayjs";
import { RENEW_AGE } from "../constants";
import { DNI } from "../types";

const getDateOfExpiry = ({ dateOfBirth, dateOfIssue }: Record<"dateOfBirth" | "dateOfIssue", Dayjs>) => {
  const today = dayjs();
  const age = today.diff(dateOfBirth, "y");
  const isUnder14 = age < RENEW_AGE;
  const baseDateToCalculateExpiry = isUnder14 ? dateOfBirth : dateOfIssue;

  return baseDateToCalculateExpiry.add(15, "y").toDate();
};

export default getDateOfExpiry;
