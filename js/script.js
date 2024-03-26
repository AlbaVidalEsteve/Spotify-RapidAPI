//* Seleccionamos elementos padre del DOM
let playlistContainer;
let nextBtn;
let mainIndex = document.querySelector("#index");
//Seleccionamos elementos del header
let header = document.querySelector("header");
let logIn = document.querySelector(".logIn");

//*Almacenamos en una constante la API Key
// let apiKey = "2e977a96admshece76346f9b6412p15c859jsn812de15db313";
//// let apiKey = "8537f834a1msh7926f4bd74ed48dp1f5493jsnf550fe5133bf";
// let apiKey = "205c146008msh386bb49efbaf6aep1692e8jsn2c6a0adc8ee5";
// let apiKey = "a4298e97a9mshd05ca8f7f4a206fp125be3jsn9cdcc73cfd09";
// let apiKey = "5fb3ef689dmsh9c1abdd1e347a39p1edb64jsnb037f4251651";
// let apiKey = "71c2eb0700msheaf53ea0c6cae9dp1f14f5jsn792044830265";
// let apiKey = "e469052a91mshd1b06386f5f903dp113cfejsna408402b8c5f";
// let apiKey = "00c703850dmsh3f382e5de87e1e1p124c8ajsn54b3521b1fcc";
let apiKey = "c691a7cfa0mshf57db79167e5d3cp19d4fbjsnd70ddac93bfe";

//* Sign In buscar datos usuario
document.querySelector(".envia").addEventListener("click", () => {
  userName = document.querySelector(".search").value;
  let instructions = document.querySelector(".instructions");
  instructions.setAttribute("class", "hidden");
  modal.classList.add("oculta-modal");
  logIn.classList.add("hidden");
  let profileFigure = document.createElement("figure");
  let profilePhoto = document.createElement("img");
  profileFigure.append(profilePhoto);
  header.append(profileFigure);
  const url = `https://spotify23.p.rapidapi.com/user_profile/?id=${userName}&playlistLimit=100&artistLimit=100`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c691a7cfa0mshf57db79167e5d3cp19d4fbjsnd70ddac93bfe",
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
      let sectionProfile = document.createElement("section");
      sectionProfile.setAttribute("class", "profile");
      playlistContainer = document.createElement("section");
      playlistContainer.setAttribute("class", "playlist-container");
      nextBtn = document.createElement("button");
      nextBtn.innerHTML = "Get Recommendations";
      nextBtn.setAttribute("class", "logIn");
      playlistContainer.append(nextBtn);
      mainIndex.append(sectionProfile, playlistContainer);
      let userNameDom = document.createElement("h2");
      userNameDom.setAttribute("class", "userName");
      let figure = document.createElement("figure");
      figure.setAttribute("class", "figurePhoto");
      let img = document.createElement("img");
      figure.appendChild(img);

      let playlistNumberSpan = document.createElement("p");
      playlistNumberSpan.setAttribute("class", "playlistNumber");
      let containerHeading = document.createElement("h3");
      playlistContainer.appendChild(containerHeading);
      sectionProfile.append(figure, userNameDom, playlistNumberSpan);
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
      "X-RapidAPI-Key": "c691a7cfa0mshf57db79167e5d3cp19d4fbjsnd70ddac93bfe",
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
      playlistDiv.setAttribute("class", "playlist-div");
      playlistDiv.setAttribute("id", playlistID);

      // Activar playlist seleccionada
      playlistDiv.addEventListener("click", (event) => {
        event.stopPropagation(); // Detiene la propagación del evento click

        if (!event.target.closest(".tracksList")) {
          // Verificar si el clic no proviene de un elemento dentro de tracksList
          playlistDiv.classList.toggle("playlist-active");
        }

        if (playlistDiv.classList.contains("playlist-active")) {
          let playlistID = playlistDiv.id;
          if (!loadedPlaylists[playlistID]) {
            fetchPlaylistTracks(playlistID, playlistDiv);
            loadedPlaylists[playlistID] = true; // Marcar la lista de reproducción como cargada
          }
        }
      });

      let playlistNameDom = document.createElement("h4");
      let playlistFigure = document.createElement("figure");
      let playlistImgDom = document.createElement("img");
      let playlistTrackNumberDom = document.createElement("p");
      playlistFigure.append(playlistImgDom);
      playlistDiv.append(
        playlistFigure,
        playlistNameDom,
        playlistTrackNumberDom
      );

      playlistContainer.appendChild(playlistDiv);

      // Damos contenido a los elementos del DOM
      playlistNameDom.innerHTML = playlistName;
      playlistImgDom.src = playlistImgSrc;
      playlistTrackNumberDom.innerHTML = playlistTrackNumber + " tracks";
    });
}

//* Función botón next
function selectPlaylists() {
  nextBtn.addEventListener("click", () => {
    let tracksSeleccionadas = document.querySelectorAll(".track-active");
    let arrayTrackIds = [];
    tracksSeleccionadas.forEach(function (trackSeleccionada) {
      let trackID = trackSeleccionada.id;
      arrayTrackIds.push(trackID);
    });
    let stringTrackIds = arrayTrackIds.join(",");
    fetchRecommendations(stringTrackIds);
  });
}

//* Cogemos info tracks x cada playlist y mostramos las tracks
function fetchPlaylistTracks(playlistID, playlistDiv) {
  const url = `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${playlistID}&offset=0&limit=100`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c691a7cfa0mshf57db79167e5d3cp19d4fbjsnd70ddac93bfe",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      let tracksArray = data.items;
      let tracksList = document.createElement("ul");
      tracksList.setAttribute("class", "tracksList");

      tracksArray.map((track) => {
        // Seleccionamos variables del API
        let trackID = track.track.id;
        let trackName = track.track.name;
        let previewUrl = track.track.preview_url;
        let artistName = track.track.artists[0].name;
        let artistUrl = track.track.artists[0].external_urls.spotify;
        let openSpoty = track.track.external_urls.spotify;

        let previewAudio = document.createElement("audio");
        previewAudio.innerHTML = '<i class="fa-solid fa-play"></i>';
        previewAudio.controls = true;
        previewAudio.src = previewUrl;

        // Creamos un li para cada track
        let trackDiv = document.createElement("li");
        trackDiv.setAttribute("class", "track");
        trackDiv.id = trackID;
        trackDiv.innerHTML = `
        <p>${trackName}</p>
        <p><a href="${artistUrl}" target="_blank">${artistName}</a></p>
        <audio controls="true" src="${previewUrl}"><i class="fa-solid fa-play" aria-hidden="true"></i></audio>
        <p class="spoty"><a href="${openSpoty}" target="_blank">Listen on spotify  <i class="fa-brands fa-spotify"></i></a></p>
      `;

        // Activar track seleccionada
        trackDiv.addEventListener("click", () => {
          trackDiv.classList.toggle("track-active");
        });
        // Añadimos li / tracks a la ul
        tracksList.append(trackDiv);
      });
      playlistDiv.append(tracksList);
    });
}

//* Llamamos a las recomendaciones basadas en los id de las canciones seleccionadas
function fetchRecommendations(trackIDS) {
  const url = `https://spotify23.p.rapidapi.com/recommendations/?limit=100&seed_tracks=${trackIDS}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c691a7cfa0mshf57db79167e5d3cp19d4fbjsnd70ddac93bfe",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((recommendations) => {
      let seeds = recommendations.seeds;
      let tracksRecommended = recommendations.tracks;
      playlistContainer.setAttribute("class", "hidden");
      let recommendationContainer = document.createElement("section");
      recommendationContainer.setAttribute("class", "recommendationContainer");
      recommendationContainer.setAttribute("class", "playlist-div");
      let heading = document.createElement("h3");
      heading.innerHTML = "Here are your recommendations";
      recommendationContainer.append(heading);
      mainIndex.appendChild(recommendationContainer);
      let recommendationsList = document.createElement("ul");
      tracksRecommended.map((trackRecommended) => {
        // Seleccionamos variables del API
        let trackID = trackRecommended.id;
        let trackName = trackRecommended.name;
        let previewUrl = trackRecommended.preview_url;
        let artistName = trackRecommended.artists[0].name;
        let artistUrl = trackRecommended.artists[0].external_urls.spotify;
        let openSpoty = trackRecommended.external_urls.spotify;
        let previewAudio = document.createElement("audio");
        previewAudio.src = previewUrl;

        previewAudio = document.createElement("audio");
        previewAudio.innerHTML = '<i class="fa-solid fa-play"></i>';
        previewAudio.controls = true;
        previewAudio.src = previewUrl;

        // Creamos un li para cada track
        let divRecommendedTrack = document.createElement("li");
        divRecommendedTrack.setAttribute("class", "track");
        divRecommendedTrack.id = trackID;
        divRecommendedTrack.innerHTML = `
        <p>${trackName}</p>
        <p><a href="${artistUrl}" target="_blank">${artistName}</a></p>
        <audio controls="true" src="${previewUrl}"><i class="fa-solid fa-play" aria-hidden="true"></i></audio>
        <p  class="spoty"><a href="${openSpoty}" target="_blank">Listen on Spotify  <i class="fa-brands fa-spotify"></i></a></p>
      `;
        recommendationsList.appendChild(divRecommendedTrack);
        // divRecommendedTrack.appendChild(previewAudio);
      });
      recommendationContainer.append(recommendationsList);
    });
}
