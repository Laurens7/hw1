<?php

    require_once 'Sessione.php';
   
    cliccato();
    function cliccato(){
        global $db;

        $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
        
        $id = mysqli_real_escape_string($conn, $_POST['id']);
        $title = mysqli_real_escape_string($conn, $_POST['title']);
        $url_img = mysqli_real_escape_string($conn, $_POST['url']);
        
        $query_delete="DELETE FROM CATEGORIE";
        mysqli_query($conn,$query_delete);
        $query_insert = "INSERT INTO Categorie(id,title,url) VALUES('$id','$title','$url_img')";
        if(mysqli_query($conn, $query_insert)){
            mysqli_close($conn);
            echo json_encode(array('ok' => true));
        }else echo json_encode(array('ok' => false));
        
    }


?>