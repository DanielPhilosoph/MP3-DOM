/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
let currentSongPlaying = "";
function playSong(songId) {
    const songObj = player.findSongByID(songId);
    console.log("Playing " + songObj.title + " from " + songObj.album + " by " + songObj.artist + " | " + calcPlayTime(songObj.duration) + "."); 
    const divID = "song" + songId;   
    const div = document.getElementById(divID);    
    if(currentSongPlaying === ''){
        currentSongPlaying = divID;
        div.classList.add("clicked");  
        window.open(songObj.url, songObj.title , "height=500,width=500");             
    }
    else{
        const lastPlayedSongDiv = document.getElementById(currentSongPlaying);
        currentSongPlaying = divID;
        lastPlayedSongDiv.classList.remove("clicked");
        div.classList.add("clicked");
        window.open(songObj.url, songObj.title , "height=500,width=500"); 
    }
}


/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt, url }) {
    const children = []
    const classes = []
    const attrs = { onclick: `playSong(${id})` }

    //Create all td before appending
    const titleTd = createElement("td", [title], ["title"], {});
    const albumTd = createElement("td", [album], ["album"], {});
    const artistTd = createElement("td", [artist], ["artist"], {});
    const durationTd = createElement("td", [calcPlayTime(duration)], ["duration"], {rowspan: 3});
    //Td Img
    const img = createElement("img", [], ["coverArt"], {src: coverArt})
    const coverArtTd = createElement("td", [img], ["tdImgSize"], {rowspan: 3});
    
    //Creating tr and appending them in order
    const firstTr = createElement("tr", [coverArtTd, titleTd, durationTd]);
    const albumTr = createElement("tr", [albumTd]);
    const artistTr = createElement("tr", [artistTd]);

    //Create table and appending tr into it.
    const table = createElement("table", [firstTr, albumTr, artistTr], ["songs-table"], {});

    //Push table as child and add class
    children.push(table);
    classes.push("song-div-list")
    return createElement("div", children, classes, attrs, "song")
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    //Set up consts
    const songsDurationTime = calcPlayTime(playlistDuration(id));
    const numberOfSongsString = songs.length + " Songs";

    //Create td before iappending
    const nameTd = createElement("td", [name], ["name"], {rowspan: 2});
    const songsDurationTd = createElement("td", [songsDurationTime], ["songs"], {});
    const numberOfSongsTd = createElement("td", [numberOfSongsString], ["number-of-songs"], {});

    //Create tr with td elements
    const firstTr = createElement("tr", [nameTd, numberOfSongsTd])
    const songsDurationTr = createElement("tr", [songsDurationTd], []);

    //Create table and append all tr
    const table = createElement("table", [firstTr, songsDurationTr], ["playlist-table"], {});

    //Push table into childern and add class
    children.push(table);
    classes.push("playlist-div-list")
    return createElement("div", children, classes, attrs, "playlist")
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
function createElement(tagName, children = [], classes = [], attributes = {}, type) {
    
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

    return myElement;    

}


function main(player){
    sortSongByTitle();
    sortPlaylistByTitle();
    player.songs.forEach(song => {
        const div = createSongElement(song);
        div.setAttribute("id", "song" + song.id);
        document.getElementById('songs').appendChild(div);
    });
    player.playlists.forEach(playlist => {
        document.getElementById('playlists').appendChild(createPlaylistElement(playlist));
    });
}

main(player);



