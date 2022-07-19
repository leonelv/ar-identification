import decode from "../dni-decoder";

describe("decode", () => {
  // 00178519415@BURRIEZA@TOMAS@M@40665966@A@18/09/1997@01/04/2013
  test("should return a parsed DNI object with cuil", async () => {
    const dni = await decode("00123456789@PITO@ELSA@F@1234567@B@22/11/1998@12/03/2018@204");

    expect(dni).toMatchSnapshot()
  });

  test("should return a parsed DNI object without cuil", async () => {
    const dni = await decode("00123456789@PITO@ELSA@F@1234567@B@22/11/1998@12/03/2018");

    expect(dni).toMatchSnapshot()
  });
});
