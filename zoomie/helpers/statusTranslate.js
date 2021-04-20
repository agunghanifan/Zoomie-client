function statusTranslate (statusCode) {
  switch (statusCode) {
    case 0:
      return "Wait for repairshop's confirm"
    case 1:
      return 'Booked / Confirmed by repairshop'
    case 2:
      return 'On Progress / On Maintenance'
    case 3:
      return 'On Queue'
    case 10:
      return 'Finished'
    case 99:
      return 'Delete Booking'
    default:
      return 'Please contact administrator'
  }
}

module.exports = statusTranslate;