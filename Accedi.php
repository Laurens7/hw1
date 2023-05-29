<?php
    include 'Sessione.php';

    if (!empty($_POST["username"]) && !empty($_POST["password"]))
    {
        // Se username,email e password sono stati inviati
        // Connessione al DB
        $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn,$_POST['username']);
        
        //Username per sessione, password per controllo
        $query = "SELECT * FROM utenti WHERE username = '$username'";
        // Eseguo la query
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        $error="";
        if (mysqli_num_rows($res)>0) {
            // Ritorna una sola riga, il che ci basta perché l'utente autenticato è solo uno
            $entry = mysqli_fetch_assoc($res);

            if(password_verify($_POST['password'], $entry['password'])){
                
                // Imposto una sessione dell'utente
                $_SESSION["session_username"] = $entry['username'];
                $_SESSION["session_id"] = $entry['id'];
                mysqli_free_result($res);
                mysqli_close($conn);
                $error="true";
            }else $error = "Password errata.";
        } 
        

        // Se l'utente non è stato trovato o la password non ha passato la verifica
        if(!$error)$error = "Username e/o password errati.";
        echo json_encode($error);
        
    } else if (isset($_POST["username"]) || isset($_POST["password"])) {
        // Se solo uno dei due è impostato
        echo json_encode($error = "Inserisci username e password.");
    }
    

?>

