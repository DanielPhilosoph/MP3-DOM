/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
let currentSongPlaying = "";
function playSong(songId) {
    const songObj = player.findSongByID(songId);
    //Log the song info in format.
    console.log("Playing " + songObj.title + " from " + songObj.album + " by " + songObj.artist + " | " + calcPlayTime(songObj.duration) + "."); 

    const divID = "song" + songId;   
    const div = document.getElementById(divID);    
    if(currentSongPlaying === ''){
        currentSongPlaying = divID;
        div.classList.add("clicked");                         
    }
    else{
        const lastPlayedSongDiv = document.getElementById(currentSongPlaying);
        currentSongPlaying = divID;
        lastPlayedSongDiv.classList.remove("clicked");
        div.classList.add("clicked");        
    }
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    const songObj = player.findSongByID(songId);    
    if(confirm(`Are you sure you want to remove the song ${songObj.title}?`)){
        //remove song
        player.songs.forEach((Obj, index) => {
            if(Obj.id === songId){
              player.songs.splice(index, 1);
              // Song Existed - remove from all playlists
              player.playlists.forEach(playlistObj => {
                const index = playlistObj.songs.indexOf(songId);
                if(index > -1){
                  playlistObj.songs.splice(index, 1);
                }
                if(playlistObj.songs.length === 0){
                    removePlaylist(playlistObj.id);
                }                
              });  
            }            
        });    
        updatePage();    
    }
}

/**
 * Deletes playlist from player
 */
function removePlaylist(id) {        
    player.playlists.forEach((Obj, index) => {
      if(Obj.id === id){
        player.playlists.splice(index, 1);      
      }  
    });      
  }

/**
 * Updates page info
 */
function updatePage(){
    const songsDiv = document.getElementById("songs");
    const playlistDiv = document.getElementById("playlists");
    songsDiv.innerHTML = "";
    playlistDiv.innerHTML = "";
    generatePlaylists();
    generateSongs();
}


/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    const TWO_MIN = 120;
    const SEVEN_MIN = 420

    //Create all td before appending
    const titleTd = createElement("td", [title], ["title"], {});
    const albumTd = createElement("td", [album], ["album"], {});
    const artistTd = createElement("td", [artist], ["artist"], {});    
    let durationClasses = ["duration"];    
    if(duration < TWO_MIN){
        durationClasses.push("duration-0-120");
    }
    else if(duration > SEVEN_MIN){
        durationClasses.push("duration-420");
    }
    
    const durationTd = createElement("td", [calcPlayTime(duration)], durationClasses, {rowspan: 2});
    const playButton = createElement("button", ['🎶'], ["play-button"], {}, {click: ()=>playSong(id) }); 
    const removeButton = createElement("button", ['❌'], ["remove-button"], {}, {click: ()=>removeSong(id) }); 
    const buttonsTd = createElement("td", [playButton, removeButton]);
       
    //Td Img
    const img = createElement("img", [], ["coverArt"], {src: coverArt})
    const coverArtTd = createElement("td", [img], ["tdImgSize"], {rowspan: 3});
    
    //Creating tr and appending them in order
    const firstTr = createElement("tr", [coverArtTd, titleTd, durationTd]);
    const albumTr = createElement("tr", [albumTd]);
    const artistTr = createElement("tr", [artistTd, buttonsTd]);

    //Create table and appending tr into it.
    const table = createElement("table", [firstTr, albumTr, artistTr], ["songs-table"], {});

    //Push table as child and add class
    children.push(table);
    classes.push("song-div-list");
    return createElement("div", children, classes, attrs, eventListeners);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    //Set up consts
    const songsDurationTime = calcPlayTime(playlistDuration(id));
    const numberOfSongsString = songs.length + " Songs";

    //Create td before iappending
    const nameTd = createElement("td", [name], ["name"], {rowspan: 2});
    const songsDurationTd = createElement("td", [songsDurationTime], ["songs"], {});
    const numberOfSongsTd = createElement("td", [numberOfSongsString], ["number-of-songs"], {});

    //Create tr with td elements
    const firstTr = createElement("tr", [nameTd, numberOfSongsTd]);
    const songsDurationTr = createElement("tr", [songsDurationTd], []);

    //Create table and append all tr
    const table = createElement("table", [firstTr, songsDurationTr], ["playlist-table"], {});

    //Push table into childern and add class
    children.push(table);
    classes.push("playlist-div-list");
    return createElement("div", children, classes, attrs, eventListeners);
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    
    const myElement = document.createElement(tagName);

    for(const child of children){
        myElement.append(child);
    }

    for(const cls of classes){
        myElement.classList.add(cls);
    }

    for (const attr in attributes) {
        myElement.setAttribute(attr, attributes[attr]);
    }

    for (const listener in eventListeners){        
        const functionArray = eventListeners[listener];                
        myElement.addEventListener(listener, functionArray);
    }

    return myElement;    

}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
 function generateSongs() {
    player.songs.forEach(song => {
        const div = createSongElement(song);
        div.setAttribute("id", "song" + song.id);
        document.getElementById('songs').appendChild(div);
    });
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    player.playlists.forEach(playlist => {
        document.getElementById('playlists').appendChild(createPlaylistElement(playlist));
    });
}


function main(player){
    sortSongByTitle();
    sortPlaylistByTitle();
    generateSongs();
    generatePlaylists();    
}

main(player);



