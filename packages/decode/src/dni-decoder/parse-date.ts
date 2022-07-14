import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const parseDate = (date: string) => {
  return dayjs(date, "DD/MM/YYYY");
};

export default parseDate;
