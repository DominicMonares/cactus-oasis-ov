const moment = require('moment');
let convertBool = (bool) => {
  if (bool === 'true') {
    return true;
  } else {
    return false;
  }
}

let convertDate = (date) => {
  let originalDate = moment(date).format('L');
  let convertedDate = originalDate.split('/');
  convertedDate.unshift(convertedDate[2]);
  convertedDate.pop();
  let newDate = convertedDate.join('-').concat('T00:00:00.000Z');
  return newDate;
}

module.exports = {
  'convertBool': convertBool,
  'convertDate': convertDate
}
