const $ = require('jquery');

let cacheProduct = (product_id) => {
  $.ajax({
    method: 'GET',
    url: `localhost:8080/${product_id}`,
    success: (data) => {
      console.log(`${count} degrees warmer`);
    },
    failure: (err) => {
      if (err) {
        console.log(err);
      }
    }
  })
}

let warmupProducts = async () => {
  count = 1;
  while (count < 1000000) {
    await cacheProduct(1);
    count += 2;
  }
}

warmupProducts();
