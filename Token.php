<?php
    #richiedo token
    
    // id client e secret key di twitch con Oauth2.0
    $client_id     =   "s6vimhfq38mcmrk5qeht4jgplulwca";
    $client_secret =   "mh21diu8h3p3tl3hxjm2vlbw5o2g9x";

    $cl=curl_init();
    curl_setopt($cl, CURLOPT_URL, 'https://id.twitch.tv/oauth2/token' );
    curl_setopt($cl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($cl, CURLOPT_POST, 1);
    curl_setopt($cl, CURLOPT_POSTFIELDS,array(
                                    'client_id' => "$client_id",
                                    'client_secret' => "$client_secret",
                                     'grant_type' => "client_credentials"));
    
    $Token=json_decode(curl_exec($cl), true);
    curl_close($cl);

?>