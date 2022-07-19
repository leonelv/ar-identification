import { object, string } from "zod";
import {
  ID_LEN,
  DATE_REGEX,
  DNI_MIN_LEN,
  DATE_LEN,
  SEX_LEN,
  SEX_REGEX,
  CUIL_BASE_LEN,
  CUIL_BASE_REGEX,
  COPY_LEN,
  COPY_REGEX,
  DNI_MAX_LEN,
} from "../constants";

const validationSchema = object({
  id: string().length(ID_LEN).regex(/\d+/),
  surname: string(),
  name: string(),
  sex: string().length(SEX_LEN).regex(SEX_REGEX),
  copy: string().length(COPY_LEN).regex(COPY_REGEX),
  dni: string().min(DNI_MIN_LEN).max(DNI_MAX_LEN),
  dateOfBirth: string().length(DATE_LEN).regex(DATE_REGEX),
  dateOfIssue: string().length(DATE_LEN).regex(DATE_REGEX),
  cuilBase: string().length(CUIL_BASE_LEN).regex(CUIL_BASE_REGEX).optional(),
});

export default validationSchema;
