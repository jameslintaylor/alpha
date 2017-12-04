// not at all pure since objects are passed by reference but oh well
// it's fun to play pretend
const update = (f, key, obj) => {
  obj[key] = f(obj[key])
  return obj
}

export const dates = (state = [], action) => {
  switch (action.type) {
  case 'ADD_DATE':
    return [
      ...state,
      (({id, start, end}) => ({id, start, end}))(action)
    ]
  case 'REMOVE_DATE':
    // not an efficient implementation but it'll do
    return state.filter((day) => !(day.id == action.id))
  default:
    return state
  }
}
