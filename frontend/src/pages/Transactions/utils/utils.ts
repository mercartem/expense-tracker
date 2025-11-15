function pageCount(length: number, perPage = 10) {
  return Math.ceil(length / perPage);
}

const getNewSelectedItems = (id: string, selected: string[]) => {
  const selectedIndex = selected.indexOf(id);
  let newSelectedItems: string[] = [];

  if (selectedIndex === -1) {
    newSelectedItems = [...selected, id];
  } else {
    newSelectedItems = selected.filter((item) => item !== id);
  }
  return newSelectedItems;
};

export { pageCount, getNewSelectedItems };
