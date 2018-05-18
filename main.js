SC.initialize({
    client_id: ''
    //
});


function Jukebox ()
{
  var results = [];
  var x = this;
  x.Search = search;
  x.SongId = songId;
  x.Pause = pause;
  x.play = play;
  x.SongTitle = songTitle;
  x.ArtistName = artistName;
  x.ReleaseDate = releaseDate;
  x.Description = description;
  x.Genre = genre;
  x.Artwork = artwork;
  x.ArtistLink = artistLink;
  x.SongLink = songLink;

  document.addEventListener("DOMContentLoaded", () => {
        var player;
        var playButton = document.getElementById('play_img');
        var pauseButton = document.getElementById('pause_img');
        var searchButton = document.getElementById('search_button');

        x.searchQuery = document.getElementById('search_input');
        x.artistName = document.getElementById('artistName_div');
        x.songTitle = document.getElementById('songTitle_div');
        x.artistLink = document.getElementById('artistlink_a');
        x.songLink = document.getElementById('songlink_a');
        x.genre = document.getElementById('genre_p');
        x.d = document.getElementById('description_div');
        x.releaseDate = document.getElementById('releaseDate_p');
        x.artwork = document.getElementById('artwork_img');


        searchButton.addEventListener("click", search);
        playButton.addEventListener("click", play);
        pauseButton.addEventListener("click", pause);

    });

    function search(){
        SC.get("/tracks", {
            q: x.searchQuery.value
        }).then(function(response) {
            console.log(response)
            results = response;
            response.forEach(function(obj) {
                let box = document.createElement('div');
                box.setAttribute("style", "border:ridge; border-color:black");
                box.addEventListener("click", ()=>{
                    x.SongId(obj.id);
                    x.SongTitle(obj.title);
                    x.ArtistName(obj.user.username);
                    x.SongLink(obj.permalink_url);
                    x.ArtistLink(obj.user.permalink_url);
                    x.Description(obj.description);
                    x.Genre(obj.genre);
                    x.ReleaseDate(obj.release_month, obj.release_day, obj.release_year);
                    x.Artwork(obj.artwork_url);
                })
                textNode = document.createTextNode(obj.title);
                box.appendChild(textNode);
                document.getElementById("songList_div").appendChild(box);
            })
        });
    };

    function songId(id) {
        SC.stream( '/tracks/' + id ).then(function(song){
            player = song;
            player.play();
        });
    }

    function songTitle(title) {
        x.songTitle.textContent = title
    }

    function artistName(username) {
        x.artistName.innerHTML = "<b>Artist: </b>" + username;
    }

    function pause() {
        player.pause();
    }

    function play() {
        player.play();
    }

    function songLink(permalink_url) {
        x.songLink.setAttribute("href", permalink_url);
    }

    function artistLink(permalink_url) {
        x.artistLink.setAttribute("href", permalink_url);
    }

    function artwork(artwork_url) {
        if(artwork_url != null) {
           x.artwork.src = artwork_url;
       }else{
           x.artwork.setAttribute("style", "width:100px");
           x.artwork.src = "images/no-artwork-available.jpg";
       }
    }

    function genre(genre) {
        x.genre.innerHTML = "<b>Genre: </b>" + genre;
    }

    function description(description) {
        if(description.length < 300){
            x.d.innerHTML = "<b>Track Description: </b>" + description;
       }else{
            x.d.innerHTML = "<b>Track Description: </b> N/A";
       }
    }

    function releaseDate(release_month, release_day, release_year) {
        if(release_month != null, release_day != null, release_year != null) {
            x.releaseDate.innerHTML = "<b>Release Date: </b>" + release_month + "/" + release_day + "/" + release_year;
       }else{
            x.releaseDate.innerHTML = "";
       }
    }
}

var myJukebox = new Jukebox();
