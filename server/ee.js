const jwt = require('jsonwebtoken');

const secret = '5aeaf349535764cf44b50114efd9fe736d766b2f5a3122d9291c0ad42e69f46f2fdd7e663fa06407dc7928a0ce548487cd5c41c26863e8e1860fcde87ff9de09';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoib0x1d0NGMWlMVUVpWHcxMDdHeDA2THlNMS1idGZhYmNoeHB1bjZMak1oYyIsInBsYXRmb3JtIjoibmF2ZXIifSwiaWF0IjoxNzE5NTQxMzM2LCJleHAiOjE3MTk1NDQ5MzZ9.cncc3HgRSJaQjvWR8XAFbFkoafFxofWoqk4w1mV8yJA';

try {
  const decoded = jwt.verify(token, secret);
  console.log('Token is valid:', decoded);
} catch (err) {
  console.error('JWT verification error:', err);
}
