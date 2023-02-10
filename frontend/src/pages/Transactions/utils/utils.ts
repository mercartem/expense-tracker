function pageCount (length: number, perPage = 10) {
  return Math.ceil(length / perPage)
}

export default pageCount