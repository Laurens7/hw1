// Javascript della pagine twich relative alle stream di una categoria scelta

//            ##############################################################
//            ##       Recupero tramite Db della categoria selezionata    ##
//            ##############################################################

fetch('stream.php').then(categorieResponse).then(jsonCategorie);

function categorieResponse(event){
    console.log('Risposta database:'+ event)
    return event.json()
}

function jsonCategorie(json){
    console.log(json);
 
    const contenitore=document.querySelector('.contenitore_cat');
    const nome_categoria=json[1];
    const url=json[2];

    const nome=document.createElement('h2');
    nome.textContent=nome_categoria;
    const img=document.createElement('img');
    img.src=url;

    contenitore.appendChild(img);
    contenitore.appendChild(nome);
    
}

//            ###########################################################
//            ##      Top 15 streams di una categorie  su Twitch       ##
//            ###########################################################

fetch('stream_get.php').then(streamResponse).then(jsonStream);

function streamResponse(event){
    console.log(event)
    return event.json()
}

function jsonStream(json){
    console.log(json);
    for(i=0;i<15;i++){
        const streams=document.querySelector('.streams');
        
        const nome_streamer=json.data[i].user_name;
        const language_streamer=json.data[i].language;
        const title_stream=json.data[i].title;
        const img_stream=json.data[i].thumbnail_url;
        const views_stream=json.data[i].viewer_count;

        const contenitore=document.createElement('div');
        contenitore.classList.add('contenitore');
        streams.appendChild(contenitore);
        
        const cont_img=document.createElement('div');
        cont_img.classList.add('img');
        const img=document.createElement('img');
        const url=img_stream.replace("-{width}x{height}","");
        img.src=url;
        contenitore.appendChild(cont_img);
        cont_img.appendChild(img);

        
        const views=document.createElement('h2');
        views.classList.add('views');
        views.textContent=views_stream + ' spettatori';
        contenitore.appendChild(views);

        const cuore_bianco=document.createElement('img');
        cuore_bianco.classList.add('cuore_bianco');
        cuore_bianco.src='images/cuore.png';

        const cont_img_cuore_bianco=document.createElement('div');
        cont_img_cuore_bianco.classList.add('cuore_bianco');
        contenitore.appendChild(cont_img_cuore_bianco);
        cont_img_cuore_bianco.appendChild(cuore_bianco);
        
        cuore_bianco.dataset.nome_streamer = json.data[i].user_name;
        cuore_bianco.dataset.nome_game = json.data[i].game_name;
        cuore_bianco.dataset.id_stream = json.data[i].id;
        cuore_bianco.dataset.img_stream = url;
        cuore_bianco.dataset.id_streamer = json.data[i].user_id;
        cuore_bianco.dataset.language=json.data[i].language;
        cuore_bianco.dataset.titolo=json.data[i].title;
        
        cuore_bianco.addEventListener('click',cuore_stream);

           
        const formData = new FormData();
        formData.append('id_canale', cuore_bianco.dataset.id_streamer );
        formData.append('check', 'streams');

        fetch('Check_cuore.php', {method: 'post', body: formData}).then(cuoreResponse).then(coloreCuore);



        const title=document.createElement('h1');
        title.textContent=title_stream;
        contenitore.appendChild(title);
        
        const cont_info=document.createElement('div');
        cont_info.classList.add('info');
        contenitore.appendChild(cont_info);




        const nome=document.createElement('span');
        nome.classList.add('nome');
        nome.textContent=nome_streamer;
        cont_info.appendChild(nome);


        const ln=document.createElement('span');
        ln.classList.add('ln');
        ln.textContent=language_streamer;
        cont_info.appendChild(ln);


    }
}

function cuore_stream(event){
    const cuore_bianco=event.currentTarget;
    
    console.log(cuore_bianco.dataset.id_stream);
    const formData = new FormData();
    formData.append('nome_streamer', cuore_bianco.dataset.nome_streamer);
    formData.append('nome_game', cuore_bianco.dataset.nome_game);
    formData.append('stream_id', cuore_bianco.dataset.id_stream);
    formData.append('img_stream', cuore_bianco.dataset.img_stream);
    formData.append('id_streamer', cuore_bianco.dataset.id_streamer);
    formData.append('language', cuore_bianco.dataset.language);
    formData.append('titolo', cuore_bianco.dataset.titolo);

    fetch("Cuore_stream.php", {method: 'post', body: formData}).then(dispatchResponse2, dispatchError2);
     
    event.stopPropagation();
}

function dispatchResponse2(response) {
    console.log('Risposta cuore streams:')
    console.log(response);
    return response.json().then(databaseResponse2); 
}

function databaseResponse2(json) {
    console.log('Json cuore streams:')
    console.log(json)
    if(json.id_canale){
        const cuore_rosso=document.querySelectorAll('div.cuore_bianco img.cuore_bianco');
        for(i=0;i<cuore_rosso.length;i++){
            if(cuore_rosso[i].dataset.id_streamer==json.id_canale)
            cuore_rosso[i].src='images/cuore_rosso.png';
        }
        ;
    }else dispatchError()

}

function dispatchError2() { 
    console.log("Errore");
}

//            ######################################################
//            ##             Ricerca canale twitch                ##
//            ######################################################

document.querySelector(".ricerca form").addEventListener("submit", cerca);

function cerca(event){

    const form_data = new FormData(document.querySelector(".ricerca form"));
    
    fetch("cerca_canale.php?query="+encodeURIComponent(form_data.get('ricerca'))).then(ricercaResponse).then(jsonCanali);
    
    event.preventDefault();
} 
function ricercaResponse(event){
    console.log('Risposta ricerca canale: '+ event);
    return event.json()
}

function jsonCanali(json){
    console.log('Dati ricerca canale: ' +json);
        //Svuoto la libreria esistente
    const libreria=document.querySelector('section.libreria');
    libreria.innerHTML="<h1 class='canali'>Canali live</h1>";
    
    const libreria_canale=document.createElement('section');
    libreria.appendChild(libreria_canale);
    libreria_canale.classList.add('libreria_ricerca');

        //cambio il titolo 
    const titolo_h1=document.querySelector('h1.canali');
    titolo_h1.innerHTML="Risultati della ricerca";
    titolo_h1.classList.remove('canali');
    titolo_h1.classList.add('titolo_ricerca');
    

    for(i=0;i<15;i++){
        const nome_streamer=json.data[i].display_name;
        const language_streamer=json.data[i].broadcaster_language;
        const img_canale=json.data[i].thumbnail_url;
        const is_live=json.data[i].is_live;
        

        const contenitore=document.createElement('div');
        contenitore.classList.add('contenitore');
        libreria_canale.appendChild(contenitore);

        const cont_img=document.createElement('div');
        cont_img.classList.add('img_canale');
        const img=document.createElement('img');
        img.src=img_canale;
        contenitore.appendChild(cont_img);
        cont_img.appendChild(img);

        const cont_dati=document.createElement('div');
        cont_dati.classList.add('dati_canale');
        contenitore.appendChild(cont_dati);

        const cont_titolo=document.createElement('div');
        cont_titolo.classList.add('titolo_canale');
        cont_dati.appendChild(cont_titolo);

        const title=document.createElement('h1');
        title.textContent=nome_streamer;
        cont_titolo.appendChild(title);

        const cont_info=document.createElement('div');
        cont_info.classList.add('info_canale');
        cont_dati.appendChild(cont_info)

        const ln=document.createElement('span');
        ln.classList.add('ln');
        ln.textContent='Language: ' +language_streamer;
        cont_info.appendChild(ln);

        const live=document.createElement('span');
        live.classList.add('live');
        live.textContent='Live: ' +is_live;
        cont_info.appendChild(live);


        const cont_preferiti=document.createElement('div')
        cont_preferiti.classList.add('cuore');
        cont_dati.appendChild(cont_preferiti);
        
        const preferiti=document.createElement('div')
        cont_preferiti.appendChild(preferiti);

        const img_preferiti=document.createElement('img');
        img_preferiti.src='images/cuore_nero.png';
        preferiti.appendChild(img_preferiti);

        cont_preferiti.dataset.name = json.data[i].display_name;
        cont_preferiti.dataset.id = json.data[i].id;
        cont_preferiti.dataset.url_img = img_canale;
        cont_preferiti.dataset.language=json.data[i].broadcaster_language;
        cont_preferiti.dataset.live=json.data[i].is_live;

        img_preferiti.addEventListener('click',cuore);

        const formData = new FormData();
        formData.append('id_canale', cont_preferiti.dataset.id);
        formData.append('check', 'canali');

        fetch('Check_cuore.php', {method: 'post', body: formData}).then(cuoreResponse).then(coloreCuore);

    }
}

