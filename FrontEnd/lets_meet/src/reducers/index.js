// not at all pure since objects are passed by reference but oh well
// it's fun to play pretend
const update = (f, key, obj) => {
  obj[key] = f(obj[key])
  return obj
}

export const dates = (state = [], action) => {
  switch (action.type) {
  case 'ADD_DATE':
    const newDate = (({day, month, year}) => ({day, month, year}))(action)
    return [...state, newDate]
  default:
    return state
  }
}
