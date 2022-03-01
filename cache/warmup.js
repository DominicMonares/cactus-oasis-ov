const {getProduct} = require('../server/routeMethods');

let warmupProducts = async () => {
  count = 1;
  while (count < 10) {
    console.log(`${count} loading`);
    await getProduct(null, null, count);
    count += 4;
  }
}

warmupProducts();
