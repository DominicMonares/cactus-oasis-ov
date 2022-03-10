// generates random number within the last 10% of the db
// *note* unable to control warming 30-40% of last 10% cache up

const randomProduct = () => {
  return Math.floor(Math.random() * (1000011 - 900010) + 900010);
}

const randomCart = () => {
  let carts = [1111, 1234, 4321, 3232];
  let user = Math.floor(Math.random() * (3 - 0) + 0);
  return carts[user];
}

module.exports = {
  'randomProduct': randomProduct,
  'randomCart': randomCart
}
