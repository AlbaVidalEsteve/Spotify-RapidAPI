//MODAL
// Get the modal
let modal = document.querySelector("#modal");
// let content = document.querySelector('.modal-content');

let modalVideo = document.querySelector("#modal-div");

// Get the button that opens the modal
// let abrir = document.querySelector('#abrir');
let abrirVentana = document.querySelector(".abrir");
// console.log(abrirVentana);

// let cardVideos = document.querySelectorAll(".card-video");

// Get the <i> element that closes the modal
let cerrar = document.querySelector("#cerrar");

//Funcion abrir modal
abrirVentana.addEventListener("click", () => {
  // console.log(cardVideos[index].src);
  // modalVideo.src = cardVideos[index].src;
  modal.classList.remove("oculta-modal");
});

//Funcion cerrar modal
cerrar.addEventListener("click", () => {
  modal.classList.add("oculta-modal");
});
//Segunda funcion cerrar modal haciendo click fuera
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.classList.add("oculta-modal");
  }
});
