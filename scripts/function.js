

function addSongIntoTable(arrOfValues, classes, attributes){
    const SONG_COVER_ART = 0;
    //const SONG_TITLE = 1;
    const SONG_DURATION = 2;
    const SONG_ALBUM = 3;    
    const SONG_ARTIST = 4;
    const SONG_ID = 5;
    const table = document.createElement("table");    
    table.classList.add("songs-table");    
    let attributeKeysArr = Object.keys(attributes);

    for (let index = 0; index < attributeKeysArr.length; index++) {        
        table.setAttribute(attributeKeysArr[index], Object.values(attributes)[index]);
    }
    let row = document.createElement("tr");
    for(let index in arrOfValues){ 
        if(index != SONG_ID){
            if(index == SONG_ALBUM || index == SONG_ARTIST){
                row = document.createElement("tr");
            }           
            const cell = document.createElement("td");
            cell.textContent = arrOfValues[index];
            cell.classList.add(classes[index]);
            if(index == SONG_COVER_ART){
                cell.setAttribute("rowspan", "3");            
                cell.textContent = '';
                const img = document.createElement("img");
                img.setAttribute("src", arrOfValues[index]);
                img.classList.add(classes[index]);
                cell.appendChild(img);
                
            }  
            if(index == SONG_DURATION){
                cell.setAttribute("rowspan", "3");
                cell.textContent = calcPlayTime(arrOfValues[index]);
                if(arrOfValues[index] <= 120){
                    cell.classList.add("duration-0-120");
                }
                else if(arrOfValues[index] >= 420){
                    cell.classList.add("duration-420");
                }
            }  
            row.appendChild(cell);
            table.appendChild(row);
        }
    }                
    return table;
}

function addPlaylistIntoTable(arrOfValues, classes, attributes){
    const PLAYLIST_NAME = 0;
    const PLAYLIST_ID = 1;
    const PLAYLIST_SONGS = 2;
    const table = document.createElement("table");
    table.classList.add("songs-table");        
    let attributeKeysArr = Object.keys(attributes);
    let attributeValuesArr = Object.values(attributes);
    for (let index = 0; index < attributeKeysArr.length; index++) {        
        table.setAttribute(attributeKeysArr[index], attributeValuesArr[index]);
    }

    let row = document.createElement("tr");
    for(let index = 0; index <= arrOfValues.length; index++){ 
        if(index !== PLAYLIST_ID){            
            row = document.createElement("tr");                               
            const cell = document.createElement("td");
            cell.textContent = arrOfValues[index];
            cell.classList.add(classes[index]);        
            if(index === PLAYLIST_SONGS){                
                cell.textContent = calcPlayTime(playlistDuration(arrOfValues[PLAYLIST_ID]));
            }
            row.appendChild(cell);
            if(index === PLAYLIST_NAME){
                cell.setAttribute("rowspan", 2);
                let cell1 = document.createElement("td");
                cell1.textContent = arrOfValues[PLAYLIST_SONGS].length + " Songs";
                cell1.classList.add("number-of-songs");
                row.appendChild(cell1);
            }
            table.appendChild(row);
        }
    }
    return table;    
}

// ===> Gets array of song objects and sort by title <===
function sortSongByTitle(){
    player.songs.sort(function(name1, name2) {    
        var nameA = name1.title.toUpperCase(); 
        var nameB = name2.title.toUpperCase(); 
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;   
    });
    return songs;
}

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

  function playlistDuration(id) {      
    const myPlaylist = player.findPlaylistByID(id);
    let durationInSeconds = 0;
    myPlaylist.songs.forEach(song => {   
      durationInSeconds += player.findSongByID(song).duration;
    });
    return durationInSeconds;  
  }
