// We're going to try something new in these comments. Different comments are 
// targeted at different levels of expertise.  In an effort to help you 
// ignore things that don't matter, we've labeled these:
// (1) Need-to-know -- You won't know what's going on without this.
// (2) Want-to-know -- If you wanted to recreate this, you'd need this.
// (3) Nice-to-know -- A subtlety or advanced feature you may want to explore.

var tracklist = document.getElementById('tracklist');

// (1) An initially empty variable we'll use to point to the current track
var currentTrack = null;

// (1) An array to hold all the tracks we'll be playing with
var tracks = [];

// (1) We're going to construct our search using Spotify's API, in our case
// searching for Kanye West and limiting our results to 10 tracks
var search = 'Kanye West';
var maxTracks = 10;



//////////////////////////////////////////////////////////////////////////////
// Loading the page

// (1) When everything is loaded, then--
window.onload = function () {
	// (1) Grab the tracks from Spotify's search results
	tracks = SPSearch('track', search).tracks;

	// (1) Limit our results list
	var numTracks = Math.min(maxTracks, tracks.length);
	tracks = tracks.slice(0, numTracks);

	// (1) Iterate over our tracks and 
	for (var i = 0; i < numTracks; i++) {
		var div = trackDiv(tracks[i]);  // (1) create a div to hold it
		insertTrackDiv(div, tracklist); // (1) put it into our list
	}
};



//////////////////////////////////////////////////////////////////////////////
// Generating the tracklist rows

function trackDiv(track) {
	// (1) This function generates a div from a given track
	
	analyse(track); // (1) Grab all the Spotify and Echonest data we need and 
					// put it into the track object

	var attrs = rowAttrsFromTrack(track); // (1) generate the data- attributes
										  // we'll be using for the trackDiv

	var row = entag(
		'div', // (1) Create a div
		attrs, // with these attributes
		cellsFromTrackAndAttrs(track, attrs)); // which contains these cells
	
	rowBackground(row); // (1) and add a background to the row

	return row;
}


function rowAttrsFromTrack(track) {
	// (1) We're using http://ejohn.org/blog/html-5-data-attributes/ to store 
	// information about each track in attributes of the div itself.  This
	// function generates those attributes we'll attach later

	var attrs = {
			'class': 'track row',
			'id': track.href,
			'data-album': track.album.name,
			'data-artist': artists(track),
			'data-title': track.name,
			// (3) This is the conditional operator, which can be used as a 
			// shortcut for writing out a full if/else statement.  You can read
			// more about it at:
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
			'data-tempo': track.echo ? track.echo.audio_summary.tempo : '-'
		};

	return attrs;
}


function insertTrackDiv(trackDiv, tracklist) {
	// (1) This function actually inserts the div we make into the tracklist
	var tracklistBody = tracklist.getElementsByClassName('body')[0];
	var numTracks = tracklistBody.children.length;

	// (1) We keep track of the playlist position in a data-attribute
	trackDiv.setAttribute('data-playlist-position', numTracks);
	placeRow(trackDiv); // and have a function to place it spatially
	tracklistBody.appendChild(trackDiv);

	return trackDiv;
}


function placeRow(trackDiv) {
	// (2) Naively, you'd want to control placement and ordering of tracks just
	// by controlling the ordering of the tracklists children; however, since
	// we're dealing with embedded content (the play embeds Spotify offers),
	// a subtlety is involved.  Whenever an iframe's position in the DOM 
	// changes, its content reloads.  This means that when we reordered the
	// rows, we'd be incurring a delay as we wait for the refresh on all the
	// iframes.
	//
	// Instead, we decouple the ordering in the DOM from the position, and 
	// manually calculate the position we use--

	if (trackDiv.hasAttribute('data-playlist-position')) {
		var pos = trackDiv.getAttribute('data-playlist-position');
		trackDiv.style.top = "calc(" + pos + "*(80px + 1em + 1px)" + ")";
	}
	else {
		console.log(trackDiv.id, "missing 'data-playlist-position' attribute.");
	}
}



//////////////////////////////////////////////////////////////////////////////
// Utility functions

function entag(tag, attributes, content) {
	// (2) This function lets us intelligently stick some content into a tag
	// with a given set of attributes without having to go through the node 
	// creation manually each time.
	//
	// Generating a table, there are a lot of times we want to wrap some
	// content in a particular type of tag with a particular set of attributes
	//
	// Generalizing this lets us avoid walking through this loop each time and
	// just think about what element we want to end up with.

	var element = document.createElement(tag);
	for (var key in attributes) { element.setAttribute(key, attributes[key]); }

	smartInsert(content, element);

	return element;
}


function smartInsert(content, container) {
	// (2) Depending on the type of content (an array, a string, a node) we
	// want to do insertion a little differently.

	if (content instanceof Array) {
		// If we have an array
		for (var i = 0; i < content.length; i++) {
			// smartInsert each element of that array
			smartInsert(content[i], container);
		}
	}
	else if (content instanceof Node) {
		// if we have a Node, just insert it
		container.appendChild(content);
	}
	else {
		// Otherwise, wrap it in a span (a Node) and insert it
		var stringContent = String(content);
		var span = document.createElement('span');
		span.innerHTML = stringContent;
		smartInsert(span, container);
	}
}