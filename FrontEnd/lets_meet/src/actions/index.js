let nextDateId = 0
export const addDate = (start, end) => {
  return {
    type: 'ADD_DATE',
    id: nextDateId++,
    start,
    end
  }
}

export const removeDate = (id) => {
  return {
    type: 'REMOVE_DATE',
    id: id
  }
}
