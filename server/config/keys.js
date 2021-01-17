import dev from "./dev.js";
import prod from "./prod.js";

let config = "";

// if it's in production, use production config
if (process.env.NODE_ENV === "production") {
  config = prod;
}
// else use dev config
else {
  config = dev;
}

export default config;
