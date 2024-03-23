//* Seleccionamos elementos padre del DOM
let playlistContainer = document.querySelector(".playlist-container");
let nextBtn = document.querySelector('.playlist-container button');
let mainIndex = document.querySelector('#index'); 
//Seleccionamos elementos del header
let header = document.querySelector('header');
let logIn = document.querySelector('.logIn');

//*Almacenamos en una constante la API Key
// let apiKey = "2e977a96admshece76346f9b6412p15c859jsn812de15db313";
//// let apiKey = "8537f834a1msh7926f4bd74ed48dp1f5493jsnf550fe5133bf";
// let apiKey = "205c146008msh386bb49efbaf6aep1692e8jsn2c6a0adc8ee5";
// let apiKey = "a4298e97a9mshd05ca8f7f4a206fp125be3jsn9cdcc73cfd09";
let apiKey = "5fb3ef689dmsh9c1abdd1e347a39p1edb64jsnb037f4251651";


//* Sign In buscar datos usuario
document.querySelector(".envia").addEventListener("click", () => {
  userName = document.querySelector(".search").value;
  let instructions = document.querySelector('.instructions');
  instructions.setAttribute('class', 'hidden');
  modal.classList.add("oculta-modal");
  logIn.classList.add('hidden');
  let profileFigure = document.createElement('figure');
  let profilePhoto = document.createElement('img');
  profileFigure.append(profilePhoto)
  header.append(profileFigure);
  const url = `https://spotify23.p.rapidapi.com/user_profile/?id=${userName}&playlistLimit=100&artistLimit=100`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5fb3ef689dmsh9c1abdd1e347a39p1edb64jsnb037f4251651",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((datos) => {
      // Seleccionamos variables del API
      let userName = datos.name;
      let imgSrc = datos.image_url;
      let playlistNum = datos.total_public_playlists_count;
      let playlistArray = datos.public_playlists;
      profilePhoto.src = imgSrc;
      // Seleccionamos elementos del DOM
      let userNameDom = document.querySelector(".userName");
      let figure = document.querySelector(".figurePhoto");
      let img = document.createElement("img");
      figure.appendChild(img);
      let playlistNumberSpan = document.querySelector(".playlistNumber");
      let containerHeading = document.createElement("h3");
      playlistContainer.appendChild(containerHeading);

      // Damos contenido a los elementos del DOM
      userNameDom.innerHTML = userName;
      img.src = imgSrc;
      img.alt = "Profile Photo";
      playlistNumberSpan.innerHTML = playlistNum + " public playlists";
      containerHeading.innerHTML = " Your Public Playlists";

      //Cogemos ID playlists y llamamos a la función para conseguir sus datos
      playlistArray.map((playlist) => {
        let playlistUri = playlist.uri;
        let playlistID = playlistUri.slice(17);
        fetchPlaylistData(playlistID);
        // fetchPlaylistTracks(playlistID);
      });
      //Llamamos a la función del boton para que seleccione las playlists
      nextBtn.classList.remove('hidden');
      selectPlaylists();
    });
});

let loadedPlaylists = {};

//* Buscamos datos playlist y mostramos playlists
function fetchPlaylistData(playlistID) {
  const url = `https://spotify23.p.rapidapi.com/playlist/?id=${playlistID}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5fb3ef689dmsh9c1abdd1e347a39p1edb64jsnb037f4251651",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((playlistData) => {
      // Seleccionamos variables del API
      let playlistName = playlistData.name;
      let playlistImgSrc = playlistData.images[0].url;
      let playlistTrackNumber = playlistData.tracks.total;

      // Seleccionamos y creamos elementos del DOM
      let playlistDiv = document.createElement("div");
      playlistDiv.setAttribute('class', 'playlist-div');
      playlistDiv.setAttribute('id', playlistID);

      /*// Activar playlist seleccionada
      playlistDiv.addEventListener('click', (e)=>{
        e.stopPropagation(); // Detiene la propagación del evento click
        playlistDiv.classList.toggle('playlist-active');
        //evitar que se dupliquen los tracks de la playlist cuando hago el fetchPlaylistTracks
        if(playlistDiv.classList.contains("playlist-active")){
          let playlistID = playlistDiv.id;
          if (!loadedPlaylists[playlistID]) {
            fetchPlaylistTracks(playlistID,playlistDiv);
            loadedPlaylists[playlistID] = true; // Marcar la lista de reproducción cómo cargada
          }
        }
      });*/

      // Activar playlist seleccionada
      playlistDiv.addEventListener('click', (event) => {
        event.stopPropagation(); // Detiene la propagación del evento click
        
        if (!event.target.closest('.tracksList')) { // Verificar si el clic no proviene de un elemento dentro de tracksList
          playlistDiv.classList.toggle('playlist-active');
        }
        
        if(playlistDiv.classList.contains("playlist-active")){
          let playlistID = playlistDiv.id;
          if (!loadedPlaylists[playlistID]) {
            fetchPlaylistTracks(playlistID,playlistDiv);
            loadedPlaylists[playlistID] = true; // Marcar la lista de reproducción como cargada
          }
        }
      });

      let playlistNameDom = document.createElement("h4");
      let playlistFigure = document.createElement("figure");
      let playlistImgDom = document.createElement("img");
      let playlistTrackNumberDom = document.createElement("p");
      let playlistContainer = document.querySelector(".playlist-container");
      playlistFigure.append(playlistImgDom);
      playlistDiv.append(playlistFigure, playlistNameDom, playlistTrackNumberDom);

      playlistContainer.appendChild(playlistDiv);

      // Damos contenido a los elementos del DOM
      playlistNameDom.innerHTML = playlistName;
      playlistImgDom.src = playlistImgSrc;
      playlistTrackNumberDom.innerHTML = playlistTrackNumber + ' tracks';
    });
}

 //* Función botón next
function selectPlaylists(){
  nextBtn.addEventListener('click', ()=>{
    let tracksSeleccionadas = document.querySelectorAll('.track-active');
    let arrayTrackIds = [];
    tracksSeleccionadas.forEach(function(trackSeleccionada){
      let trackID = trackSeleccionada.id;
      arrayTrackIds.push(trackID);
    });
    let stringTrackIds = arrayTrackIds.join(",");
    console.log(stringTrackIds);
    fetchRecommendations(stringTrackIds);
  });
}


//* Cogemos info tracks x cada playlist y mostramos las tracks
function fetchPlaylistTracks(playlistID, playlistDiv) {
  const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${playlistID}&offset=0&limit=100`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5fb3ef689dmsh9c1abdd1e347a39p1edb64jsnb037f4251651',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

 fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    let tracksArray = data.items;
    // let trackList = document.querySelectorAll('.tracksList');
    let tracksList = document.createElement("ul");
    tracksList.setAttribute('class', 'tracksList');

    tracksArray.map((track) =>{
      // Seleccionamos variables del API
      let trackID = track.track.id;
      let trackName = track.track.name;
      let previewUrl = track.track.preview_url;
      let artistName = track.track.artists[0].name;
      let artistUrl = track.track.artists[0].external_urls.spotify; 
      let openSpoty = track.track.external_urls.spotify;
      
      let previewAudio = document.createElement('audio');
      previewAudio.innerHTML ='<i class="fa-solid fa-play"></i>'
      //// previewAudio.id = "player";
      //// let audioDiv = document.createElement("div");
      //// let playBtn = document.createElement("button");
      //// playBtn.onclick = document.getElementById('player').play();
      //// let pauseBtn = document.createElement("button");
      //// pauseBtn.onclick = document.getElementById('player').pause();
      //// audioDiv.append(playBtn,pauseBtn);
      previewAudio.controls = true;
      previewAudio.src = previewUrl;

      // Creamos un li para cada track
      let trackDiv = document.createElement('li');
      trackDiv.id = trackID;
      trackDiv.innerHTML = `
        <p>${trackName}</p>
        <p><a href="${artistUrl}" target="_blank">${artistName}</a></p>
        <p><a href="${openSpoty}" target="_blank">Listen on spotify  <i class="fa-brands fa-spotify"></i></a></p>
      `;
      trackDiv.appendChild(previewAudio);
      //// trackDiv.appendChild(audioDiv);

      // Activar track seleccionada
      trackDiv.addEventListener('click', ()=>{
        trackDiv.classList.toggle('track-active');
      });
      // Añadimos li / tracks a la ul
      tracksList.append(trackDiv);

    });
    playlistDiv.append(tracksList);
  });
}
//Cuando haya seleccionado suficientes tracks aparece el boton next
//Llamar a esta funcion con un click al botton next

//* Llamamos a las recomendaciones basadas en los id de las canciones seleccionadas
function fetchRecommendations(trackIDS){
  const url =`https://spotify23.p.rapidapi.com/recommendations/?limit=100&seed_tracks=${trackIDS}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5fb3ef689dmsh9c1abdd1e347a39p1edb64jsnb037f4251651',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

fetch(url, options)
  .then(response => response.json())
  .then((recommendations) =>{
    let seeds = recommendations.seeds;
    let tracksRecommended = recommendations.tracks;
    playlistContainer.setAttribute('class', 'hidden');
    let recommendationContainer = document.createElement('section');
    recommendationContainer.setAttribute('class', 'recommendationContainer');
    recommendationContainer.setAttribute('class', 'playlist-active');
    mainIndex.appendChild(recommendationContainer);
    let recommendationsList = document.createElement('ul');
    recommendationsList.setAttribute('class', 'tracksList');
    tracksRecommended.map((trackRecommended) =>{
      // Seleccionamos variables del API
      let trackID = trackRecommended.id;
      let trackName = trackRecommended.name;
      let previewUrl = trackRecommended.preview_url;
      let artistName = trackRecommended.artists[0].name;
      let artistUrl = trackRecommended.artists[0].external_urls.spotify; 
      let openSpoty = trackRecommended.external_urls.spotify;
      let previewAudio = document.createElement('audio');
      previewAudio.controls = true;
      previewAudio.src = previewUrl;
      
      let divRecommendedTrack = document.createElement('li');
      divRecommendedTrack.id = trackID;
      divRecommendedTrack.innerHTML = `
        <p>${trackName}</p>
        <p><a href="${artistUrl}" target="_blank">${artistName}</a></p>
        <p><a href="${openSpoty}" target="_blank">Listen on Spotify</a></p>
      `;
      recommendationsList.appendChild(divRecommendedTrack);
      divRecommendedTrack.appendChild(previewAudio);
      

      console.log(trackID);
      console.log(trackName);
      console.log(previewUrl);
      console.log(artistName);
      console.log(artistUrl);
      console.log(openSpoty);
    })
      recommendationContainer.appendChild(recommendationsList);
    

  })

}



/* 
? es millor buscar totes les cançons de cop per totes les playlist per reduir el num de peticions? en lloc de obrir i tancar playlists per veure els tracks?

done: queryselectorAll('.playlist-div') -> addEventListener(click) -> toggle('active')
done: queryselectorAll('.active) -> get tracks
done: fetch track for each playlist id
TODO: show tracks -> acordeon en cada playlist
TODO: queryselectorAll('.track-div') -> addEventListener(click) -> toggle('.track-active')
TODO: queryselectorAll('.track-active) -> get ids -> make an array /string
TODO: fetch recommendations based on the track ids (string separated by comas)

*/