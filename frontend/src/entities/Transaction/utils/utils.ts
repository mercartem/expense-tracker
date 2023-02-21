function convertData(date: string, locale: string) {
  const formattedDate = new Date(date).toLocaleDateString(locale);
  return formattedDate;
}

export function capitalizeDescription(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
export default convertData;
