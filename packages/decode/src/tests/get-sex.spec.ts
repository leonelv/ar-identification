import decode from "../dni-decoder";
import getSex from "../dni-decoder/get-sex";
import { Sex, UnparsedSex } from "../types";

describe("getSex", () => {
  test("should return the correct sex ID", async () => {
    const sexArr: UnparsedSex[] = ["M", "F", "X"];
    const resultArr: Sex[] = ["MALE", "FEMALE", "NON_BINARY"];

    for (let index = 0; index < sexArr.length; index++) {
      const sex = sexArr[index];
      expect(getSex(sex)).toBe(resultArr[index]);
    }
  });
});
