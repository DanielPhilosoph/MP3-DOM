const player = {
    songs: [
        {
            id: 1,
            title: "Vortex",
            album: "Wallflowers",
            artist: "Jinjer",
            duration: 242,
            coverArt: "./images/cover_art/jinjer_vortex.jpg",
            url: 'https://www.youtube.com/watch?v=mMvV1ZiSTK4'
        },
        {
            id: 2,
            title: "Vinda",
            album: "Godtfolk",
            artist: "Songleikr",
            duration: 160,
            coverArt: "./images/cover_art/songleikr_vinda.jpg",
            url: 'https://www.youtube.com/watch?v=PNsmqxcNHjI'
        },
        {
            id: 7,
            title: "Shiroyama",
            album: "The Last Stand",
            artist: "Sabaton",
            duration: 213,
            coverArt: "./images/cover_art/sabaton_shiroyama.jpg",
            url: 'https://www.youtube.com/watch?v=Ylyqoxh-cXk'
            
        },
        {
            id: 3,
            title: "Thunderstruck",
            album: "The Razors Edge",
            artist: "AC/DC",
            duration: 292,
            coverArt: "./images/cover_art/acdc_thunderstruck.jpg",
            url: 'https://www.youtube.com/watch?v=v2AC41dglnM'
        },
        {
            id: 4,
            title: "All is One",
            album: "All is One",
            artist: "Orphaned Land",
            duration: 270,
            coverArt: "./images/cover_art/orphaned_land_all_is_one.jpg",
            url: 'https://www.youtube.com/watch?v=Bds3FALcR7M'
        },
        {
            id: 5,
            title: "As a Stone",
            album: "Show Us What You Got",
            artist: "Full Trunk",
            duration: 259,
            coverArt: "./images/cover_art/full_trunk_as_a_stone.jpg",
            url: "https://www.youtube.com/watch?v=o5Taqq_I1Ns"
        },
        {
            id: 6,
            title: "Sons of Winter and Stars",
            album: "Time I",
            artist: "Wintersun",
            duration: 811,
            coverArt: "./images/cover_art/wintersun_sons_of_winter_and_stars.jpg",
            url: "https://www.youtube.com/watch?v=ttoJ-Ro0L04"
        },
    ],
    playlists: [
        { id: 1, name: "Metal", songs: [1, 7, 4, 6] },
        { id: 5, name: "Israeli", songs: [4, 5] },
    ],
    // ===> Returns the song by the ID given <===
    findSongByID(id){    
        return player.songs.find(songObj => songObj.id === id);        
    },

    // ===> Returns the playlist by the ID given <===
    findPlaylistByID(id){    
        return player.playlists.find(playlistObj => playlistObj.id === id);       
    },

}
