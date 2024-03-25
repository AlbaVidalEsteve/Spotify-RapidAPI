<?php
    $_nombre = validaDato($_POST['nombre']);
    $_correo = validaDato($_POST['correo']);
    $_mensaje = validaDato($_POST['mensaje']);

    function validaDato($_data){
        if (isset($_data) and !empty($_data)){
            return $_data;
        } else {
            return null;
        }
    }

    if ($_nombre == null or $_mensaje == null or $_correo == null){
        $_resultado = 'There has been an error in data reception.';
    } else {
        $_resultado = "Mr./Mrs. $_nombre, your report has been sent";
        // Envio del correo
        $_asunto = 'Report Input';
        $_correo = 'vidalba97@gmail.com';
        $_contenido = "\n".
            $_nombre."\n".
            $_correo."\n".
            $_resultado."\n";
        
        mail($_correo, $_asunto, $_contenido);
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MusicHub</title>
    <!-- STYLES -->
    <link rel="stylesheet" href="css/style.css">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <!-- Icons -->
    <script src="https://kit.fontawesome.com/79d8e2848d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <figure><img src="media/icon.png" alt="logo"></figure>
        <h1>MusicHub</h1>
        <button class="logIn abrir">Log In</button>
    </header>
    <!-- MAIN CONTENT -->
    <main id="index">
        <!-- MODAL -->
        <div class="modal oculta-modal" id="modal">
            <div class="modal-container">
                <div class="consulta modal-div">
                    <input type="text" name="search" class="search" placeholder="Escriba su usuario">
                    <button type="submit" href="profile.html" id="cerrar" class="envia"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
        </div>
        <section class="proceso">
            <h2><?php echo $_resultado; ?></h2>

        </section>
    </main>
    <footer>
        <ul>
            <li><a href="cookies.html">Cookies</a></li>
            <li>Contact
                <ul>
                    <li><a href="https://github.com/AlbaVidalEsteve/Spotify-RapidAPI" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/alba-vidal-esteve-07b801184/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                </ul>
            </li>
            <li><a href="politica.html">Política de privacidad</a></li>
            <li><a href="avisoLegal.html">Aviso Legal</a></li>
            <li><a href="report.html">Report Problems</a></li>
            
        </ul>
        <div>
            <p>Powered by <a href="https://rapidapi.com/Glavier/api/spotify23" target="_blank">Spotify Rapid API</a></p>
            <p>&</p>
            <p>Designed by <a href="https://github.com/AlbaVidalEsteve" target="_blank">Alba Vidal</a></p>
        </div>
    </footer>

    <!-- Script -->
    <script src="js/script.js"></script>
    <script src="js/modal.js"></script>
    
</body>
</html>