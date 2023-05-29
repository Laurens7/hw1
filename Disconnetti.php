<?php
    include 'Dbconfigurazione.php';

    // Distruggo la sessione esistente
    session_start();
    session_destroy();
    echo json_encode(array('ok' => true));
?>