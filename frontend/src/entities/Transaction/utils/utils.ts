function convertData(date: string, locale: string) {
  const formattedDate = new Date(date).toLocaleDateString(locale);
  return formattedDate;
}

export default convertData;