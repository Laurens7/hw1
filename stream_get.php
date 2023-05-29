<?php
    require_once 'Sessione.php';
    require 'Token.php';
    
    header('Content-Type: application/json');
    
    $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));

    $query="SELECT id FROM categorie";
    $res = mysqli_query($conn, $query);
    $row=mysqli_fetch_row($res);
    mysqli_close($conn);
    



    streamers();
    
    function streamers(){
        
        global $row;
        $url='https://api.twitch.tv/helix/streams?game_id='.$row[0].'&first=20';
        
        global $Token;
        global $client_id;


        $cl=curl_init();
        curl_setopt($cl,CURLOPT_URL,$url);
        curl_setopt($cl,CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cl,CURLOPT_HTTPHEADER, array("Authorization: Bearer ".$Token['access_token'],
        "Client-Id: $client_id"));
        $res=curl_exec($cl);
        curl_close($cl);
        echo $res;
    }




?>