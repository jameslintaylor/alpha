const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthAbbrevs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const numDaysInMonth = (month, year) => (new Date(year, month, 0)).getDate()
const dayOffsetInMonth = (month, year) => (new Date(year, month - 1, 1)).getDay()
const nameForMonth = (month) => monthNames[(month - 1).mod(12)]
const abbrevForMonth = (month) => monthAbbrevs[(month - 1).mod(12)]

export {
  numDaysInMonth,
  dayOffsetInMonth,
  nameForMonth,
  abbrevForMonth
}

