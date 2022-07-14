import dayjs from "dayjs";
import getDateOfExpiry from "./get-date-of-expiry";
import parseDate from "./parse-date";

describe("getDateOfExpiry", () => {
  test("should return a date object with a 15 year difference (based on DOB)", () => {
    const dateOfBirth = parseDate("22/11/2020");
    const dateOfIssue = parseDate("22/11/2020");

    const result = getDateOfExpiry({ dateOfBirth, dateOfIssue });

    expect(dayjs(result).year()).toBe(2035);
  });

  test("should return a date object with a 15 year difference (based on DOI)", () => {
    const dateOfBirth = parseDate("22/11/1998");
    const dateOfIssue = parseDate("12/03/2018");

    const result = getDateOfExpiry({ dateOfBirth, dateOfIssue });

    expect(dayjs(result).year()).toBe(2033);
  });
});
