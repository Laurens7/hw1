<?php
    require_once 'Sessione.php';
    
    $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
    
    $query_ricev = "SELECT*FROM Categorie";
    $res_dati=mysqli_query($conn, $query_ricev);

    $row = json_encode(mysqli_fetch_row($res_dati));
    mysqli_free_result($res_dati);
    mysqli_close($conn);
    
    echo $row;

    

    
    
?>