# liri-node-app

<h1>LIRI</h1>
<h3>Language Interpretation and Recognition Interface</h3>

<h2>What does it do?</h2>
Using Node and the Command Line, this app will take in a command key-phrase and a search term and generate relevant information for the user.

After initiating node and running the file, the user issues a command phrase and search term.

Ex. node liri.js **command** **search**
    node liri.js spotify-this-song Saw You in a Dream

<h2>Commands</h2>

- **concert-this** : searches the BandsinTown API for an upcoming concert. The search term must be an __artist__. If no artist is given, the default search for this will be _The Japanese House_.

- **spotify-this-song** : searches the Spotify API for relevant information of a particular track and will return 3 different songs that include the search term. The serach term must be a __track__. If no track is given, the default search for this will be _The Sign by Ace of Base_.

- **movie-this** : searches the omdb API for information about a particular movie. The search term must be a __movie title__. If no movie is given, the default search for this will be _Mr. Nobody_.

- **do-what-it-says** : runs whatever commands have been pre-written in the random.txt file. 

<h2>Demo</h2>
[View a demonstration of the app here](LIRI-walkthrough.mov).

<h2>Issues</h2>

1. When searching, if a character is not an alphanumeric value, the command will return an error or not run at all.

    e.g. "What Do You Mean?"

    For the BandsInTown Documentation, it has this comment: _If it contains one of the special characters below, please be sure to replace it by the corresponding code: for / use %252F, for ? use %253F, for * use %252A, and for " use %27C_.

2. do-what-it-says : Doesn't work for "concert-this" for some reason. If I hard code it into the parameter for the concertSearch() function, it still works within the switch case. I'm not sure what's up since the other two cases work fine. 