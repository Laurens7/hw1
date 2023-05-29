<?php
    require_once 'Sessione.php';


    if (!$userid = sessione()) {
        header("Location: index.php");
        exit;
    }   

    $conn = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']) or die(mysqli_error($conn));
    $userid = mysqli_real_escape_string($conn, $userid);
    $query = "SELECT username FROM Utenti WHERE id = $userid";
    $res_1 = mysqli_query($conn, $query);
    $username = mysqli_fetch_row($res_1); 

?>




<html>
    <head>
        <Title>hw1</Title>
        <link href="https://fonts.googleapis.com/css2?family=Baskervville&family=Fugaz+One&family=Khula:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="Twitch_preferiti.css"/>
        <link rel="stylesheet" href="Twitch.css"/>
        <script src="Twitch_preferiti.js" defer="true"></script>
        <script src="Twitch.js" defer="true"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <div id='footer'>
            <nav>

                <div class='titolo'>
                    <a href="index.php">
                        <div class='icona'></div>
                        <div class='twitch'></div>
                    </a>
                </div>

                <div class='ricerca'>
                    <form method="post"  enctype="multipart/form-data">
                        <input  class='ricerca' placeholder='Cerca canale' type="text" name='ricerca'>
                        <input class="submit" value='' type='submit' > 

                    </form>
                </div>
                <div class=tendina>
                    <div class='Accedi' <?php if (sessione()) {echo "id='hidden'";}?>>
                        <h1>Accedi</h1>
                    </div>
                    <div class='Iscriviti' <?php if (sessione()) {echo "id='hidden'";}?>> 
                        <h1>Iscriviti</h2> 
                    </div>
                    <?php if (sessione()) {echo "<img src='images/profilo_guestloggato.png'";}?>
                </div>
            </nav>

            <div class='profilo hidden'>
                <div class='profilo_utente '> 
                    <img src="images/profilo_guestloggato.png">
                    <span><?php echo $username[0] ?></span>
                </div>
                <div class='funzioni'> 
                    <a >
                        <div class='canale hover'><span>Canale</span></div> 
                    </a>
                    <a href="Twitch_preferiti.php">
                        <div class='preferiti hover'><span>Preferiti</span></div>
                    </a>
                </div> 

                <div class='logout hover'>
                    <img src="images/disconnetti.png">
                    <span>Disconnettiti</span>
                </div>
            </div>

            <section class='libreria'>
                <div class='canali_prefe'>
                    <h1 class='Titolo_prefe'>I tuoi canali preferiti</h1>
                </div>
                <div class='streams_prefe'>
                    <h1 class='Titolo_prefe'>Le tue stream preferite</h1>
                </div>
            </section>
        </div>    
        
        <footer>
    
          <div class="cont_footer">
            <div class='footer_twitch'>
                <img src="https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png" >
                <h1>Twitch</h1>
            </div>
          </div>
          <div class="cont_footer">
              <strong>AZIENDA</strong>
              <p>Chi siamo</p>
              <p>Lavora con noi</p>
          </div>
          <div class="cont_footer">
              <strong>CATEGORIE</strong>
              <p>Giochi</p>
              <p>Eventi</p>
              <p>Talk Show</p>
          </div>
          <div class="cont_footer">
              <strong>CREATO DA</strong>
              <p>Laurens Leon Delfo Furnò</p><br/>
              <p>Matricola: 1000015996</p>
        </div>
            


        </footer>


        
    </body>
</html>