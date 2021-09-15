
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

function titleValidation(title){
    const error = document.getElementById("title-error");
    if(title.length === 0){
        error.textContent = "Title is required";
        return false;
    }
    else if(title.length < 2){
        error.textContent = "Title is to short";
        return false;
    }
    else{
        error.textContent = "";
        return true;
    }
}
function albumValidation(album){
    const error = document.getElementById("album-error");
    if(album.length === 0){
        error.textContent = "Album is required";
        return false;
    }
    else if(album.length < 2){
        error.textContent = "Album is to short";
        return false;
    }
    else{
        error.textContent = "";
        return true;
    }
}
function  artistValidation(artist){
    const error = document.getElementById("artist-error");
    if(artist.length === 0){
        error.textContent = "Artist is required";
        return false;
    }
    else if(artist.length < 2){
        error.textContent = "Artist is to short";
        return false;
    }
    else{
        error.textContent = "";
        return true;
    }
}
function  durationValidation(duration){
    const error = document.getElementById("duration-error");
    const regex = new RegExp('^[0-9]{2}:[0-9]{2}$');
    if(!regex.test(duration)){
        error.textContent = "Duration is not valid format (MM:SS) :" + duration;  
        return false;
    }
    else{
        error.textContent = "";
        return true;
    }
        
}
function coverArtValidation(coverArt){
    const error = document.getElementById("cover-art-error");
    if(coverArt.length === 0){
        error.textContent = "Cover art is required";
        return false;
    }
    else{
        error.textContent  = "";
        return true;
    }
}


  
