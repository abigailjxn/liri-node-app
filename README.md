# liri-node-app

<h1>LIRI</h1>
<h3>Language Interpretation and Recognition Interface</h3>

<h2>What does it do?</h2>
Using Node and the Command Line, this app will take in a command key-phrase and a search term and generate relevant information for the user.

After initiating node and running the file, the user issues a command phrase and search term.

Ex. node liri.js *command* *search*

<h2>Commands</h2>

- concert-this : searches the BandsinTown API for an upcoming concert. The search term must be an _artist_. If no artist is given, the default search for this will be _The Japanese House_.

- spotify-this-song : searches the Spotify API for relevant information of a particular track and will return 3 different songs that include the search term. The serach term must be a _track_. If no track is given, the default search for this will be _The Sign by Ace of Base_.

- movie-this : searches the omdb API for information about a particular movie. The search term must be a _movie title_. If no movie is given, the default search for this will be _Mr. Nobody_.

- do-what-it-says : runs whatever commands have been pre-written in the random.txt file. 

<h2>Issues</h2>

When searching, if a character is not an alphanumeric value, the command will return an error or not run at all.

e.g. "What Do You Mean?"