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
let request = require("request");

switch (userCommand){ 
  case "concert-this":
    // add validation later -- The name of the artist. If it contains one of the special characters below, please be sure to replace it by the corresponding code: for / use %252F, for ? use %253F, for * use %252A, and for " use %27C
    let artist = searchQuery;
    let queryUrl =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp";
    var moment = require("moment");
    moment().format();
    request(queryUrl, function(error, response, body) {
      let concertDate = moment(JSON.parse(body)[0].datetime).calendar();
      let concertTime = moment(JSON.parse(body)[0].datetime).format("h:mm a");
      if (!error && response.statusCode === 200) {
        console.log(`

            --------------------

            ${artist} will be playing at ${JSON.parse(body)[0].venue.name}
            in ${JSON.parse(body)[0].venue.city}
            on ${concertDate} at ${concertTime}.
           
            --------------------

            `);
      }
    });
    break;
  case "spotify-this-song":
    let songTitle = searchQuery;
    // if (songTitle == undefined) {
    //   console.log("it was undefined");
    //   songTitle = "thesign"
    //   spotify.search({ type: "track", query: songTitle, limit: 1 }, function(
    //     err,
    //     data
    //   ) {
    //     if (err) {
    //       return console.log("Error occurred: " + err);
    //     }
      
    //       let artist = data.tracks.items[i].artists[0].name;
    //       let songName = data.tracks.items[i].name;
    //       let prevLink = data.tracks.items[i].album.external_urls.spotify;
    //      let album = data.tracks.items[i].album.name;
  
    //       console.log(`
    //       --------------------
  
    //       Track Title: ${songName}
    //       Artist: ${artist}
    //       Album: ${album}
    //       Spotify Preview: ${prevLink}
          
    //       --------------------
    //       `);
    // });
    spotify.search({ type: "track", query: songTitle, limit: 3 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      let artist = "";
      let songName = "";
      let prevLink = "";
      let album = "";
      for (let i = 0; i < data.tracks.items.length; i++) {
        artist = data.tracks.items[i].artists[0].name;
        songName = data.tracks.items[i].name;
        prevLink = data.tracks.items[i].album.external_urls.spotify;
        album = data.tracks.items[i].album.name;

        // console.log(artist, songName, prevLink, album);
        console.log(`
        --------------------

        Track Title: ${songName}
        Artist: ${artist}
        Album: ${album}
        Spotify Preview: ${prevLink}
        
        --------------------
        `);
      }
    });
    break;
//   case "movie-this":
    break;
//   case "do-what-it-says":
    break;
// }
}
