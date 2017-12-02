let nextDateId = 0
export const addDate = (day, month, year) => {
  return {
    type: 'ADD_DATE',
    id: nextDateId++,
    day,
    month,
    year
  }
}
