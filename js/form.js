const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let terms = document.querySelector('input[name="terms"]:checked');

    let name = document.querySelector('#nombre').value;
    let mail = document.querySelector('#correo').value;
    let message = document.querySelector('#mensaje').value;
    console.log(message)
    let total = name.length * message.length * mail.length;
    console.log(total)

    if (total === 0){
        alert('Fill every input in order to submit');
    } else {
        if (!terms){
            alert('Check the terms and conditions')
        } else {
            formulario.submit();
        }
    }
})