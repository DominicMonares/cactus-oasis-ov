// generates random number within the last 10% of the db
// *note* unable to control warming 30-40% of last 10% cache up

const randomProduct = () => {
  return Math.random() * (1000011 - 900010) + 900010;
}

module.exports = {
  'randomProduct': randomProduct
}
