//add code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Add the code required to import the `keys.js` file and store it in a variable.
const keys = require("./keys");
console.log(keys);

//You should then be able to access your keys information like so
const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);
console.log(spotify);

//Make it so liri.js can take in one of the following commands:
let userCommand = process.argv[2];
let searchQuery = process.argv[3];

switch (userCommand) {
  case "concert-this":
    break;
  case "spotify-this-song":
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;
}
