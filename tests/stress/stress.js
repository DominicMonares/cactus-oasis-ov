import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 2000 },
    { duration: '20s', target: 2000 },
    { duration: '10s', target: 0 }
  ],
};

export default function () {
  http.get('http://localhost:8080/products/999456');

  // http.post('http://localhost:8080/cart/?sku_id=10000000');
  sleep(1);
}
