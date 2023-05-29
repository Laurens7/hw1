<?php

    require 'Sessione.php';
    require 'Token.php';
    header('Content-Type: application/json');
    
    cerca();

    function cerca(){
        $query=urlencode($_GET['query']);
        $url="https://api.twitch.tv/helix/search/channels?query=".$query;
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