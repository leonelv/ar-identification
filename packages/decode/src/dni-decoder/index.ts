import assembleObject from "./assemble-object";
import validateData from "./validate-data";

const decode = async (data: string) => {
  const validatedData = await validateData(data);
  const result = assembleObject(validatedData);

  return result;
};

export default decode;
