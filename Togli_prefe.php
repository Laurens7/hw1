<?php
    require_once 'Sessione.php';
    
    if (!$userid= sessione())echo json_encode($error='Errore'); 
    check();
    function check(){
        global $db,$userid; 

        $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
        
        $id_canale = mysqli_real_escape_string($conn, $_POST['id_canale']);
        $togli=mysqli_real_escape_string($conn, $_POST['togli']);

        $query_delete = "DELETE FROM $togli WHERE id_utente='$userid' AND id_canale='$id_canale'";
        
        if(mysqli_query($conn,$query_delete)){
            echo json_encode(array('togli' => 'true'.$togli,'id_canale' => $id_canale));
        }else{
        echo json_encode(array('togli' => 'false'.$togli,'id_canale' => $id_canale));}
            
        mysqli_close($conn);
        
    }
    



?>