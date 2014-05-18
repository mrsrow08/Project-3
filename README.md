# Project-3

![A screenshot from the app](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/Screenshot.png)

In `Project-3`, we're going to look at some of the basics of interacting with APIs.  We'll be focusing on two: [Spotify's Web API](https://developer.spotify.com/technologies/web-api/) and [Echo Nest's API](http://developer.echonest.com/docs/v4).  We use these APIs to construct a small, Spotify playlist which visualizes some EchoNest data, lets you sort by things like title and tempo, and displays album art.

We've tried something a bit new in this project.  In addition to [building the project up commit-by-commit](https://github.com/DGMD-E-15/Project-3/commits/master), we've added many more comments to the code than we have in the past, and [we've attempted to categorize the comments](https://github.com/DGMD-E-15/Project-3/blob/master/beat.js#L1) to make reading through the function and structure of the app a little easier.

![API sources from which we construct the app](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/APISources.png)

To use the Spotify Play Button embeds, you'll need to [install Spotify](http://spotify.com/) (you can sign up for a free account).  Spotify's Play Button interacts with your local Spotify installation enabling you to click a Play Button on a website and have your local Spotify app begin playing the song.

---

## Extensions

### (1) Add another EchoNest attribute for sorting

Using EchoNest's API, add another column of information on each track and modify the sorting logic to let you sort by the new data.

![Bring in a new EchoNest attribute for sorting](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/NewSortExtension.png)

### (2) Visualize another EchoNest attribute

Choose another piece of data from EchoNest's API to visualize using a Processing sketch, either for a currently playing song or for all the songs.

![Visualize a new EchoNest attribute](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/NewVisualizationExtension.png)

### (3) Use the EchoNest API to hide the Spotify logo

In each Spotify embed iframe, you'll notice a small, Spotify logo in the lower right.  Using the [`coverURL` function in `spotify.js`](https://github.com/DGMD-E-15/Project-3/blob/master/spotify.js#L186), you can access an album cover _without_ a Spotify logo.  Use this to modify [the `.inter` overlay](https://github.com/DGMD-E-15/Project-3/blob/master/spotify.js#L59) and include a circular `div` with an appropriately positioned background to hide the Spotify logo until you click on the `.inter` overlay.

![Hide the Spotify logo using the full album art](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/HideSpotifyLogoExtension.png)

### (4) Lyrics from musixmatch with song

[MUSIXMATCH](http://musixmatch.com/) offers [an API](https://developer.musixmatch.com/) which, among other things, lets you query songs' lyrics.  Add functionality to the project where the lyrics from the current track are faded in when [`currentTrack`](https://github.com/DGMD-E-15/Project-3/blob/master/beat.js#L11) is switched.

![Add lyrics from MUSIXMATCH to the interface](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/LyricsExtension.png)

### (5) Fix the UI issues created by so many asynchronous loads

You'll notice that this app sucks.  Which is to say, the user experience is very painful because we basically have to wait for a Spotify iframe and three API queries to EchoNest and Spotify _for every song_ 'til we display anything.  Design a solution to this.  You might indicate the page is loading with some sort of progress bar or sequentially inserts songs as they are loaded so that users aren't left hanging.

![Make the user experience of waiting for content to load less shitty](https://raw.githubusercontent.com/DGMD-E-15/Project-3/master/README_media/AsyncExtension.png)


---

