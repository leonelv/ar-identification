import validateData from "../dni-decoder/validate-data";

describe("parse", () => {
  test("should throw an error if the data is malformed", () => {
    const data = "item_1@item_2";

    validateData(data).catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });

  test("should return the parsed DNI", () => {
    validateData("00123456789@PITO@ELSA@F@1234567@B@22/11/1998@12/03/2018@204").then((data) => {
      expect(data).toHaveProperty("dni");
    });
  });
});
