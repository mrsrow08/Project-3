//////////////////////////////////////
// Musixmatch functionality

// you can read more about mashape.com with musixmatch using https://www.mashape.com/musixmatch-com/musixmatch
var MAPI = 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/';
var MAPI_KEY = 'IlJKUisHm2VwySsSrSdiPMs7g8xgwgGt';


function MMSearch(track){

    // songs from Echonest API for getting track
    var songs = ENSongMMId(track);
    var trackId = songs.foreign_ids[0].foreign_id.toString().split(':')[2];
    var lyrics = MMSearchLyrics({
        'track_id' : trackId
    });
    // check lyrics returned
    if(lyrics === null || lyrics === 'undefined' || lyrics === ''){
        return null;
    }
    return lyrics.lyrics_body;
}

function MMSearchLyrics(parameters){

    // (1) This function searches _just_ musixmatch lyrics API and returns the
    // parsed JSON object
    var getLyricsAPI = MAPI + 'track.lyrics.get';
    var url = [
        getLyricsAPI,
        urlEncodeParams(parameters)
    ].join('');
    var result = httpGetMashape(url);
    if(result === null || result === 'undefined' || result === ''){
        return null;
    }
    return JSON.parse(result);
}

function httpGetMashape(url) {
    // (1) This function lets us, in some ways, simulate a browser and go
    // visit a particular URL programmatically, and returns the results with Authorization.

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.setRequestHeader("X-Mashape-Authorization", MAPI_KEY);
    xhr.send();
    return xhr.responseText;
}