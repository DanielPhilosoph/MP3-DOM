
// ===> Gets array of song objects and sort by title <===
function sortSongByTitle(){
    player.songs.sort(function(name1, name2) {    
        var nameA = name1.title.toUpperCase(); 
        var nameB = name2.title.toUpperCase(); 
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;   
    });
    return songs;
}

// ===> Gets array of playlist objects and sort by name <===
function sortPlaylistByTitle(){
    player.playlists.sort(function(name1, name2) {    
        var nameA = name1.name.toUpperCase(); 
        var nameB = name2.name.toUpperCase(); 
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;      
    });
}

// ===> Reformat from seconds to MM:SS <===
function calcPlayTime(durationTime) {
    const min = Math.floor(durationTime / 60);
    const sec = durationTime - min * 60;
    // Should add 0 before the number?   
    const numberAsString1 = (min < 10) ? "0" : "";
    const numberAsString2 = (sec < 10) ? "0" : "";
    return numberAsString1 + min + ":" + numberAsString2 + sec;
  }

// Calc playlist duration - return in seconds
function playlistDuration(id) {      
    const myPlaylist = player.findPlaylistByID(id);
    let durationInSeconds = 0;
    myPlaylist.songs.forEach(song => {   
        durationInSeconds += player.findSongByID(song).duration;
    });
    return durationInSeconds;  
}

// ===> Convert MM:SS to Seconds <===
function convertTimeToSec(duration){
    const newDuration = duration.split(":")
    return parseInt(newDuration[0]) * 60 + parseInt(newDuration[1]);
}


  
