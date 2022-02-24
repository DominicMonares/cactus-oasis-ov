import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        {target: 1, duration: '5s'},
        {target: 10, duration: '5s'},
        {target: 100, duration: '5s'},
        {target: 1000, duration: '5s'},
        {target: 0, duration: '25s'}
      ],
      gracefulRampDown: '0s'
    }
  }
};

export default function () {
  http.get('http://localhost:8080/cart');

  // http.post('http://localhost:8080/cart/?sku_id=10000000');
  sleep(1);
}