export type UnparsedSex = "M" | "F" | "X";
export type Sex = "MALE" | "FEMALE" | "NON_BINARY";

export type RAW_DNI = Record<
  "id" | "surname" | "name" | "sex" | "dni" | "dateOfBirth" | "dateOfIssue" | "cuilBase" | "copy",
  string
>;

export interface DNI {
  name: string;
  surname: string;
  dateOfBirth: Date;
  dateOfIssue: Date;
  dateOfExpiry: Date;
  copy: string;
  sex: Sex;
  dni: string;
  cuil: string;
  id: string;
}
