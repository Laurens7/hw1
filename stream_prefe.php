<?php
    require_once 'Sessione.php';

    if (!$userid= sessione())echo json_encode($error="Devi fare l'acceso per visualizzare i preferiti");
    
    $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));

    $Tipo = mysqli_real_escape_string($conn, $_POST['prefe']);
    
    $query_ricev = "SELECT*FROM $Tipo where id_utente='$userid'";
    $res_dati=mysqli_query($conn, $query_ricev);
    if (mysqli_num_rows($res_dati) > 0) {
        // Ritorna una sola riga, il che ci basta
        $row=[];
        $i=0;
        while($row[$i]=mysqli_fetch_assoc($res_dati))$i=$i+1;
        echo json_encode($row);
    }else echo json_encode(array($Tipo => 'Non ci sono '.$Tipo.' che ti piacciono'));
    mysqli_free_result($res_dati);
    mysqli_close($conn);
    
    

    

    
    
?>