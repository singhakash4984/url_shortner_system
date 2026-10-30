
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const response = http.get(
  'http://localhost/api/v1/url/leetcode',
  {
    redirects: 0,
    headers: {
      Authorization: `Bearer ${__ENV.ACCESS_TOKEN}`,
    },
  }
);

  console.log(JSON.stringify({
    status: response.status,
    error: response.error,
    error_code: response.error_code,
    location: response.headers.Location,
    body: response.body?.slice(0, 500),
  }));

  check(response, {
    'status is 302': (r) => r.status === 302,
    'Location header exists': (r) =>
      Boolean(r.headers.Location),
  });
}
