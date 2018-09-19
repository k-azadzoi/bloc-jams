var collectionItemTemplate =
'<div class="collection-album-container column fourth">'
+ '  <img src="assets/images/album_covers/01.png"/>'
+ '  <div class="collection-album-info caption">'
+ '    <p>'
+ '      <a class="album-name" href="album.html"> The Colors </a>'
+ '      <br/>'
+ '      <a href="album.html"> Pablo Picasso </a>'
+ '      <br/>'
+ '      X songs'
+ '      <br/>'
+ '    </p>'
+ '  </div>'
+ '</div>'
;


window.onload = function() {
    // #1 select the first element with an album-covers class name
    // we assign the specified element to a variable named collectionContainer
    var collectionContainer = document.getElementsByClassName('album-covers')[0];

    // #2 assign an empty string to collectionContainer's innerHTML propert to clear
    // its content. Gives us a clean slate before inserting content with JavaScript. 
    collectionContainer.innerHTML = '';

    // #3 for loop that inserts 12 albums using += operator
    // apends content to strings
    for (var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}