//add code to read and set any environment variables with the dotenv package
require("dotenv").config();

//Add the code required to import the `keys.js` file and store it in a variable.
const keys = require("./keys")
console.log(keys);

//You should then be able to access your keys information like so


const spotify = new Spotify(keys.spotify);
console.log(spotify);

//Make it so liri.js can take in one of the following commands:
// `concert-this`

//  `spotify-this-song`

//  `movie-this`

//  `do-what-it-says`
