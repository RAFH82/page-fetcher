const actions = process.argv.slice(2);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const request = require("request");
const fs = require("fs");

request(actions[0], (error, response, body) => {
  console.log("error:", error); // Print the error if one occurred
  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.

  fs.access(actions[0], fs.F_OK, err => {
    if (!err) {
      fs.writeFile(actions[1], body, error => {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Downloaded and saved ${body.length} bytes to ${actions[1]}`
          );
          process.exit();
        }
      });
    } else {
      console.error("File path exists!");
      rl.question(
        "Would you like to overwrite the file? Please enter Y or N ",
        answer => {
          let name = answer;
          if (name !== "Y") {
            process.exit();
          } else {
            fs.writeFile(actions[1], body, error => {
              if (error) {
                console.log(error);
              } else {
                console.log(
                  `Downloaded and saved ${body.length} bytes to ${actions[1]}`
                );
                process.exit();
              }
            });
          }
        }
      );
    }
  });
});

// Downloaded and saved 1235 bytes to ./index.html
