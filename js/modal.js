//MODAL
// Get the modal
let modal = document.querySelector("#modal");

let modalVideo = document.querySelector("#modal-div");

// Get the button that opens the modal
let abrirVentana = document.querySelectorAll(".abrir");

//Funcion abrir modal
abrirVentana.forEach((boton)=>{
  boton.addEventListener("click", () => {
    modal.classList.remove("oculta-modal");
  });
});

//Segunda funcion cerrar modal haciendo click fuera
window.addEventListener("click", (e) => {
  if (e.target.classList == "modal-container") {
    modal.classList.add("oculta-modal");
  }
});
