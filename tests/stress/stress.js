import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 2000 },
    { duration: '30s', target: 2000 },
    { duration: '15s', target: 0 }
  ],
};

export default function () {
  http.get('http://localhost:8080/products/994455');

  // http.post('http://localhost:8080/cart/?sku_id=10000000');
  sleep(1);
}
