const BOTON = document.querySelector('#icono i');
const ENLACES = document.querySelector('#enlaces');

BOTON.addEventListener('click', ()=>{
    ENLACES.classList.toggle('open');
    setTimeout(() =>{
        BOTON.classList.toggle('fa-xmark');
    }, 600);
});