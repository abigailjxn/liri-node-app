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

switch (userCommand) {
  // BANDSINTOWN CASE
  case "concert-this":
    // add validation later -- The name of the artist. If it contains one of the special characters below, please be sure to replace it by the corresponding code: for / use %252F, for ? use %253F, for * use %252A, and for " use %27C
    let artist = searchQuery;
    let bandsQueryUrl =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp";
    var moment = require("moment");
    moment().format();
    request(bandsQueryUrl, function(error, response, body) {
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

  // SPOTIFY CASE
  case "spotify-this-song":
    let songTitle = searchQuery;
    // add if (songTitle == undefined) case
    // also add user validation for multi-word songTitle
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

  // OMDB CASE
  case "movie-this":
  // add undefined "MR.Nobody Case"
  // add multi-word movie titles
    let movieTitle = searchQuery;
    let movieQueryUrl =
      "http://www.omdbapi.com/?apikey=trilogy&t=" +
      movieTitle +
      "&y=&plot=short";
    request(movieQueryUrl, function(error, response, body) {
      if (error) {
        console.log("Error occurred: " + error);
      } else if (!error && response.statusCode === 200) {
        let movieTitle = JSON.parse(body).Title;
        let releaseYear = JSON.parse(body).Year;
        let plot = JSON.parse(body).Plot;
        let actors = JSON.parse(body).Actors;
        let imdbRating = JSON.parse(body).imdbRating;
        let rotTomRating = JSON.parse(body).Ratings[1].Value;
        let productionCountry = JSON.parse(body).Country;
        let language = JSON.parse(body).Language;

        console.log(`
      --------------------
      
      Movie Title: ${movieTitle}
      Release Year: ${releaseYear}
      Plot Summary: ${plot}
      Cast: ${actors}
      IMDB Rating: ${imdbRating}
      Rotten Tomatoes Rating: ${rotTomRating}
      Produced in: ${productionCountry}
      Language ${language}
      
      --------------------
      `);
      }
    });
    break;
  case "do-what-it-says":
    break;
}
