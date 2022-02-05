let convertBool = (bool) => {
  if (bool === 'TRUE') {
    return true;
  } else {
    return false;
  }
}

let convertDate = (date) => {
  // "2021-11-18T00:00:00.000Z"
}


module.exports = {
  'convertBool': convertBool,
  'convertDate': convertDate
}
