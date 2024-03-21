//Almacenamos en una constante la API Key
let apiKey = "2e977a96admshece76346f9b6412p15c859jsn812de15db313";

//Eventos
document.querySelector(".envia").addEventListener("click", () => {
  userName = document.querySelector(".search").value;
//   open("profile.html", "_self");
  const url = `https://spotify23.p.rapidapi.com/user_profile/?id=${userName}&playlistLimit=100&artistLimit=100`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2e977a96admshece76346f9b6412p15c859jsn812de15db313",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((datos) => {
      console.log(datos)
      // Seleccionamos variables del API
    //   open("profile.html", "_self");
      let userName = datos.name;
      let imgSrc = datos.image_url;
      let playlistNum = datos.total_public_playlists_count;
      let playlistArray = datos.public_playlists;
      console.log(playlistArray);

      // Seleccionamos elementos del DOM
      let userNameDom = document.querySelector(".userName");
      let figure = document.querySelector(".figurePhoto");
      let img = document.createElement("img");
      figure.appendChild(img);
      let playlistNumberSpan = document.querySelector(".playlistNumber");
      let playlistContainer = document.querySelector(".playlist-container");
      let containerHeading = document.createElement("h3");
      playlistContainer.appendChild(containerHeading);

      playlistArray.map((playlist) => {
        // Selecionamos ID de las playlists
        let playlistUri = playlist.uri;
        let playlistID = playlistUri.slice(17);
        // console.log(playlistID);
        fetchPlaylistData(playlistID);
      });

      // Damos contenido a los elementos del DOM
      userNameDom.innerHTML = userName;
      img.src = imgSrc;
      img.alt = "Profile Photo";
      playlistNumberSpan.innerHTML = playlistNum + " public playlists";
      containerHeading.innerHTML = " Your Public Playlists";
    });
});

function fetchPlaylistData(playlistID) {
  const url = `https://spotify23.p.rapidapi.com/playlist/?id=${playlistID}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2e977a96admshece76346f9b6412p15c859jsn812de15db313",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((playlistData) => {
      console.log(playlistData);

      let playlistName = playlistData.name;
      let playlistImgSrc = playlistData.images[0].url;
      let playlistTrackNumber = playlistData.tracks.total;
      //   console.log(playlistName);
      //   console.log(playlistImgSrc);
      //   console.log(playlistID);
      console.log(playlistTrackNumber);

      // Seleccionamos elementos del DOM
      let playlistDiv = document.createElement("div");
      let playlistNameDom = document.createElement("h4");
      let playlistFigure = document.createElement("figure");
      let playlistImgDom = document.createElement("img");
      let playlistTrackNumberDom = document.createElement("p");
      let playlistContainer = document.querySelector(".playlist-container");
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
      playlistTrackNumberDom.innerHTML = playlistTrackNumber;
    });
}
