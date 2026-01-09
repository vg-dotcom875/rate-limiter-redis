import { RateLimiter } from "./rateLimiter.js";

const rateLimiter = new RateLimiter();

const ip = "1.1.1.1";
const route = "/order";
const maxRequests = 2;
const windowSeconds = 4;

async function test() {
  console.log(await rateLimiter.allowRequest(ip, route, maxRequests, windowSeconds)); 
  await sleep(2000);

  console.log(await rateLimiter.allowRequest(ip, route, maxRequests, windowSeconds)); 
  await sleep(2000);

  console.log(await rateLimiter.allowRequest(ip, route, maxRequests, windowSeconds)); 
  await sleep(1000);

  console.log(await rateLimiter.allowRequest(ip, route, maxRequests, windowSeconds)); 
  await sleep(1000); 

  console.log(await rateLimiter.allowRequest(ip, route, maxRequests, windowSeconds)); 
  await sleep(2000);

  console.log(await rateLimiter.allowRequest(ip, route, maxRequests, windowSeconds)); 
  await rateLimiter.close();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test();
