<?php

    require_once 'Dbconfigurazione.php';
    session_start();

    function sessione(){
        if (isset($_SESSION['session_id'])){
            return $_SESSION['session_id'];}
        else return 0;
    }

?>
