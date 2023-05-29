<?php

    require_once 'Sessione.php';
    
    
    if (!$userid= sessione()){
        echo json_encode($error="Devi fare l'acceso per mettere la stream nei preferiti");
        exit;
    }
    cuore_stream();
    function cuore_stream(){
        global $db,$userid; 

        $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
        
        $id_streamer = mysqli_real_escape_string($conn, $_POST['id_streamer']);
        $nome_streamer = mysqli_real_escape_string($conn, $_POST['nome_streamer']);
        $stream_id = mysqli_real_escape_string($conn, $_POST['stream_id']);
        $titolo_stream = mysqli_real_escape_string($conn, $_POST['titolo']);
        $nome_game = mysqli_real_escape_string($conn, $_POST['nome_game']);
        $img_stream = mysqli_real_escape_string($conn, $_POST['img_stream']);
        $language = mysqli_real_escape_string($conn, $_POST['language']);
        
        $query_select="SELECT*FROM streams where id_utente='$userid' AND id_canale='$id_streamer'";

        $res=mysqli_query($conn, $query_select) or die(mysqli_error($conn));

        if(mysqli_num_rows($res) > 0){
            $query_delete="DELETE FROM streames WHERE id_utente='$userid' AND id_canale='$id_streamer'";

            if(!mysqli_query($conn, $query_delete)){
                echo json_encode($error="Errore nell'inserimento della stream nei preferiti");
            }
            
        }
        
         
        
        $query_insert = "INSERT INTO Streams(id_utente,id_canale,nome_canale,id_stream,titolo_stream,gioco,url,language) VALUES('$userid','$id_streamer','$nome_streamer','$stream_id','$titolo_stream','$nome_game','$img_stream','$language')";
        if(mysqli_query($conn, $query_insert)){
            mysqli_close($conn);
            echo json_encode(array('id_canale' => $id_streamer));
        }else echo json_encode($error="Errore nell'inserimento della stream nei preferiti");
        
    }


?>