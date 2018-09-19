//Album

var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '2:15' },
        { title: 'Red', duration: '5:12' },
        { title: 'Pink', duration: '3:26' },
        { title: 'Purple', duration: '1:23' },
    ]
};

//Another Album

var albumMarconi = {
    title: 'The Telephon',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '3:43' },
        { title: 'Lazing on a Sunday Afternoon', duration: '1:08' },
        { title: 'I\'m in love with my Car', duration: '3:05'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]

};


//Third album

var albumQueen = {
    title: 'A Night at the Opera',
    artist: 'Queen',
    label: 'EM',
    year: '1975',
    albumArtUrl: 'assets/images/album_covers/17.png',
    songs: [
        { title: 'Death on Two Legs', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]


}



//function to generate the song row content

var createSongRow = function(songNumber, songName, songLength) {  //inside the function carries the arguments
    //inside the template var will take the arguments above
    var template = 
        '<tr class="album-view-song-item">'
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>'
        + '  <td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
        ;

    return template;
};

// select all HTML elements, we want to populate the elements with information
// assign corresponding values of the album objects properties to the HTML elements 
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album){ 



    //firstChild property identifies the first child node an element
    // and nodeValue returns or sets the value of a node

    //albumTitle only has one text node
        albumTitle.firstChild.nodeValue = album.title;
        albumArtist.firstChild.nodeValue = album.artist;
        albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
        albumImage.setAttribute('src', album.albumArtUrl);  

        //clear contents of album song list container
        albumSongList.innerHTML = '';
        
//use a for loop to go through all the songs from the album object 
// insert it into the HTML using the innerHTML propert
        for (var i = 0; i < album.songs.length; i++) {
            albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        }

};

var findParentByClassName = function(element, targetClass) {
    if (element){
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null){
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }

};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
//Set to null so that no song is playing until with click one.
var currentlyPlayingSong = null;


window.onload = function() {
    setCurrentAlbum(albumPicasso);

    songListContainer.addEventListener('mouseover', function(event) {
        //only target individual song rows during event delegations
        if (event.target.parentElement.className === 'album-view-song-item') {

            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            //change the content from the numnber to the play button's HTML
            var songItem = getSongItem(event.target)
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });


    //For loop for the mouseleave event 
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event){
            //cached the song item that is left in the varibale
            // reference getSongItem() causes multiple queries
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');

            //conditional that checks that the item the mouse is leaving is not the current
            // song, and we only change the content if it isn't
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });

        songRows[i].addEventListener('click', function(event){
            //Event handler call
            clickHandler(event.target);
        });
    }

    var albums = [albumPicasso, albumMarconi, albumQueen];
    var index = 1;

    albumImage.addEventListener('click', function(event){
            setCurrentAlbum(albums[index]);
            index++;
            if (index == albums.length) {
                index = 0;
            }
    });
   
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
        //set the songItem's content to the pause putton and set currentlyPlayingSong to the new song's number
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');

    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
        
    }  else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');

    }

};
