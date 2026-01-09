import { createClient } from "redis";

export class RateLimiter {
  constructor() {
    this.redis = createClient();
    this.redis.connect();
  }

  async allowRequest(ipAddress, apiRoute, maxRequests, windowSeconds) {
    const key = `rate:${ipAddress}:${apiRoute}`;

    
    const currentCount = await this.redis.incr(key);

    if (currentCount === 1) {
      await this.redis.expire(key, windowSeconds);
    }

    if (currentCount > maxRequests) {
      return false;
    }

    return true;
  }

  async close() {
    await this.redis.quit();
  }
}
