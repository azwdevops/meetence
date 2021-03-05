const jwt = require("jsonwebtoken");

// this file is user to generate keys, it's an inbuilt module in node
// generate new tokens if the application is being used or there is a risk for the existing keys

const crypto = require("crypto");

const key1 = crypto.randomBytes(32).toString("hex"); // to be used for signing tokens
const key2 = crypto.randomBytes(32).toString("hex"); // to be used for email verification

// console.table({ key1, key2 }); // uncomment this when running th command below

// to generate keys in console, type in the console  node server/utils/generator_keys.js

// this keys should be stored in the environment variable and only changed when there is a risk for the current key

let info = { id: "60058897d16f623e10a77edb" };

const token = jwt.sign(
  info,
  "44310dcc583228d1475e11f29dff42ec438b488aaf12386cde93351698d13446"
);

const verified =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDU4ODk3ZDE2ZjYyM2UxMGE3N2VkYiIsImlhdCI6MTYxMTAwMDI1OX0.v2SS7Ozj_Mcpx-geV6xWiKaPwxQZ0m-yQtmuGHFNAIg";

const unverified = verified + "1";

let decoded = jwt.verify(
  unverified,
  "44310dcc583228d1475e11f29dff42ec438b488aaf12386cde93351698d13446"
);

// console.log(decoded);
