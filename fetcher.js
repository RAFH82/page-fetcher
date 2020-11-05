const actions = process.argv.slice(2);
const request = require("request");
const fs = require("fs");

request(actions[0], (error, response, body) => {
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.

  fs.access(actions[0], fs.F_OK, err => {
    if (err) {
      console.error("file path exists");
      return;
    }
  });

  fs.writeFile(actions[1], body, error => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Downloaded and saved ${body.length} bytes to ${actions[1]}`);
    }
  });
});

// Downloaded and saved 1235 bytes to ./index.html
