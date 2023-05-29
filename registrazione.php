 <?php
        require_once 'Sessione.php';


        
        if (!empty($_POST["nome"]) && !empty($_POST["cognome"]) && 
            !empty($_POST["username"]) && !empty($_POST["email"]) && 
            !empty($_POST["password"])){
            $error = array();
            $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));

        
            # USERNAME
            // Controlla che l'username rispetti il pattern specificato
            if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
                $error[0] = "Username non valido";
            } else {
                $username = mysqli_real_escape_string($conn, $_POST['username']);
                // Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
                $query = "SELECT username FROM UTENTI WHERE username = '$username'";
                // Eseguire la query
                $res = mysqli_query($conn, $query);
                if (mysqli_num_rows($res) > 0) {
                    $error[0] = "Username già utilizzato";
                }
            }
            # PASSWORD
            if (strlen($_POST["password"]) < 8) {
                $error[1] = "Caratteri password insufficienti";
            } 
            # EMAIL
            if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                $error[2] = "Email non valida";
            } else {
                $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
                $res = mysqli_query($conn, "SELECT email FROM UTENTI WHERE email = '$email'");
                if (mysqli_num_rows($res) > 0) {
                    $error[2] = "Email già utilizzata";
                }
            }
    
            # REGISTRAZIONE NEL DATABASE
            if (count($error) == 0) {
                $nome = mysqli_real_escape_string($conn, $_POST['nome']);
                $cognome = mysqli_real_escape_string($conn, $_POST['cognome']);
                
    
                $password = mysqli_real_escape_string($conn, $_POST['password']);
                $password = password_hash($password, PASSWORD_BCRYPT);
    
                $query = "INSERT INTO UTENTI(nome, cognome, username, email, password) VALUES('$nome', '$cognome', '$username', '$email', '$password')";
                
                if (mysqli_query($conn, $query)) {
                    $_SESSION["session_username"] = $_POST["username"];
                    $_SESSION["Session_id"] = mysqli_insert_id($conn);
                } else {
                    $error[2] = "Errore di connessione al Database";
                }
                
            }echo json_encode($error);
    
            mysqli_close($conn);
        }

?> 