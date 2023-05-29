<?php

    require_once 'Sessione.php';
    
    
    if (!$userid= sessione()){
        echo json_encode(array('error' =>"Devi fare l'acceso per mettere il canale nei preferiti"));
        exit;
    }
    cuore_canale();
    function cuore_canale(){
        global $db,$userid; 

        $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
        
        $id_canale = mysqli_real_escape_string($conn, $_POST['id_canale']);
        $nome_canale = mysqli_real_escape_string($conn, $_POST['nome_canale']);
  
        $url_img = mysqli_real_escape_string($conn, $_POST['url']);
        $language = mysqli_real_escape_string($conn, $_POST['language']);
        
        
        $query_insert = "INSERT INTO Canali(id_utente,id_canale,nome_canale,url,language) VALUES('$userid','$id_canale','$nome_canale','$url_img','$language')";
        if(mysqli_query($conn, $query_insert)){
            mysqli_close($conn);
            echo json_encode(array('id_canale' => $id_canale));
        }else echo json_encode($error='Errore');
        
    }


?>