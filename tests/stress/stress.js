import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  stages: [
    {target: 100, duration: '30s'}
  ]
};

export default function () {
  http.get('http://localhost:8080/products/1000000');
  sleep(1);
}
