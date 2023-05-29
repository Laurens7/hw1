<?php
    require_once 'Sessione.php';
    
    if (!$userid= sessione()){
        echo json_encode($error="Bisogna Effettuare l'accesso");
        exit;}

    check();
    function check(){
        global $db,$userid; 

        $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
        
        $id_canale = mysqli_real_escape_string($conn, $_POST['id_canale']);
        $check=mysqli_real_escape_string($conn, $_POST['check']);

        $query_select = "SELECT*FROM $check WHERE id_utente='$userid' AND id_canale='$id_canale'";
        
        $res = mysqli_query($conn,$query_select) or die(mysqli_error($conn));
        
        if(mysqli_num_rows($res) > 0){
            echo json_encode(array('exists' => 'true'.$check));
        }else{
        echo json_encode(array('exists' => 'false'.$check));}
    
        mysqli_close($conn);
        
    }
    



?>