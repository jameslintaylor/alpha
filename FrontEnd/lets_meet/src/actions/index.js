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

export const showPopup = (body) => {
  return {
    type: 'SHOW_POPUP',
    body: body
  }
}

export const dismissPopup = () => {
  return {
    type: 'DISMISS_POPUP'
  } 
}
