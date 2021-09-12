/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
let currentSongPlaying = "";
function playSong(songId) {
    
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [coverArt, title, duration, album, artist, id]
    const classes = ["coverArt", "title", "duration", "album", "artist", "id"]
    const attrs = { onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs, "song")
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [name, id, songs]
    const classes = ["name", "id", "songs"]
    const attrs = {}
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



