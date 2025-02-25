import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const redis = new Redis("rediss://default:AUsVAAIjcDEzZmJmNzBmMDU2OTU0ZjQ5OWM5MDZlMjJlOWYwMjlkMXAxMA@rare-giraffe-19221.upstash.io:6379");
redis.set("foo", "bar");
export default redis;
