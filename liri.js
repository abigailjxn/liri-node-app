require("dotenv").config();

// Get Spotify Keys
const keys = require("./keys");

// Get Spotify API package and create constructor
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// User Input -- Commands + Queries
let userCommand = process.argv[2];
let searchQuery = process.argv.slice(3).join(" ");
let request = require("request");


// Create functions for each userCommand

function concertSearch(searchQuery) {
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
}

function spotifySearch(searchQuery) {
  let songTitle = searchQuery;

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
}

function omdbSearch (searchQuery) {
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
      Language: ${language}
      
      --------------------
      `);
      }
    });
}

// SWITCH START

switch (userCommand) {
  // BANDSINTOWN CASE
  case "concert-this":
    if (!searchQuery) {
      concertSearch("The Japanese House");
    } else {
      concertSearch(searchQuery);
    }
    break;

  // SPOTIFY CASE
  case "spotify-this-song":
      if (!searchQuery) {
        spotify.search({ type: "track", query: "The Sign", limit: 9 }, function(
          err,
          data
        ) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          let artist = data.tracks.items[8].artists[0].name;
          let songName = data.tracks.items[8].name;
          let prevLink = data.tracks.items[8].album.external_urls.spotify;
          let album = data.tracks.items[8].album.name;

          console.log(`
                    --------------------
            
                    Track Title: ${songName}
                    Artist: ${artist}
                    Album: ${album}
                    Spotify Preview: ${prevLink}
                    
                    --------------------
                    `);
        });
      } else {
        spotifySearch(searchQuery);
      }
    
    break;

  // OMDB CASE
  case "movie-this":
    if (!searchQuery) {
        omdbSearch("Mr. Nobody");
      } else {
        omdbSearch(searchQuery);
      }
    break;

  // RANDOM.TXT CASE
  case "do-what-it-says":
    let file = require("file-system");
    let text = file.readFileSync("./random.txt", "utf8");
    console.log(text);
    let textData = text.split(",");
    let textCommand = textData[0];
    let textQuery = textData[1];
    console.log(textCommand, textQuery);
    switch(textCommand) {
        case "concert-this":
        concertSearch(textQuery);
        break;

        case "spotify-this-song":
        spotifySearch(textQuery);
        break;

        case "movie-this":
        omdbSearch(textQuery);
        break;
    }

    break;
}
