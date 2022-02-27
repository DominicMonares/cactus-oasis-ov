let cacheProduct = async (product_id) => {

}

let warmupProducts = async () => {
  count = 1;
  while (count < 10) {
    console.log(`${count} loading?`);
    await cacheProduct(count);
    count += 4;
  }
}

warmupProducts();
