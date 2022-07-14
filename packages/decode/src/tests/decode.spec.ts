import decode from "../dni-decoder";

describe("decode", () => {
  test("should return a parsed DNI object", async () => {
    const dni = await decode("00123456789@PITO@ELSA@F@1234567@B@22/11/1998@12/03/2018@204");

    expect(dni).toMatchSnapshot()
  });
});
