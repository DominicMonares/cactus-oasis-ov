import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  stages: [
    {target: 1000, duration: '30s'}
  ]
};

export default function () {
  // http.get('http://localhost:8080/cart');

  http.post('http://localhost:8080/cart/?sku_id=10000000');
  sleep(1);
}