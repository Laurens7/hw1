// Javascript della pagina con le migliori categorie per spettatori di twitch

//            ###########################################################
//            ##         Top 16 categorie di streams su Twitch         ##
//            ###########################################################


fetch("categorie.php").then(categoriaResponse).then(jsonCategoria);

function categoriaResponse(event){
    console.log(event)
    return event.json()
}

function jsonCategoria(json){
    console.log(json);
    const categorie=document.querySelector('.categoria');
    

    for(i=0;i<16;i++){
        const nome_categoria=json.data[i].name;
        const url=json.data[i].box_art_url;


        const nome=document.createElement('h2');
        nome.textContent=nome_categoria;
        const img=document.createElement('img');
        const url1=url.replace("-{width}x{height}","");
        img.src=url1;
        const contenitore=document.createElement('div');

        contenitore.dataset.name = json.data[i].name;
        contenitore.dataset.id = json.data[i].id;
        contenitore.dataset.url_img = url1;
       
        contenitore.addEventListener('click',cliccato);


        const cont_img=document.createElement('div'); 
        cont_img.classList.add("img");

        const cont_titolo=document.createElement('div');
        contenitore.classList.add("contenitore");

        
        const a_link=document.createElement('a');
        a_link.classList.add('link');
        const linkclic='Twitch_stream.php';
        a_link.setAttribute("href",linkclic);

        categorie.appendChild(a_link);
        a_link.appendChild(contenitore);
        contenitore.appendChild(cont_img);
        contenitore.appendChild(cont_titolo);
        cont_img.appendChild(img);
        cont_titolo.appendChild(nome);



        
    }
}

function cliccato(event){
    const contenitore=event.currentTarget;
    const formData = new FormData();
        
    formData.append('id', contenitore.dataset.id);
    formData.append('title', contenitore.dataset.name);
    formData.append('url', contenitore.dataset.url_img);
        
    fetch("categoria_select.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
        
    event.stopPropagation();
}

function dispatchError(error) { 
    console.log("Errore");
}

function dispatchResponse(response) {

    console.log(response);
    return response.json().then(databaseResponse); 
}

function databaseResponse(json) {
    if (!json.ok) {
        dispatchError();
        return null;
    }
}

//                             ######################################################
//                             ##             Ricerca canale twitch                ##
//                             ######################################################

document.querySelector("nav form").addEventListener("submit", cerca);

function cerca(event){

    const form_data = new FormData(document.querySelector("nav form"));
    
    fetch("cerca_canale.php?query="+encodeURIComponent(form_data.get('ricerca'))).then(ricercaResponse).then(jsonCanali);
    
    event.preventDefault();
}   

function ricercaResponse(event){
    console.log('Risposta ricerca canale: ');
    console.log(event);
    return event.json()
}

function jsonCanali(json){
    console.log('Dati ricerca canale: ');
    console.log(json);
        //Svuoto la libreria esistente
    const libreria=document.querySelector('#risultati');
    libreria.innerHTML="";
    libreria.classList.add('libreria_ricerca');
    libreria.classList.remove('categoria');
        //cambio il titolo 
    const titolo_h1=document.querySelector('h1.titolo');
    if(titolo_h1){
        titolo_h1.innerHTML="Risultati della ricerca:";
        titolo_h1.classList.add('titolo_ricerca');
    }

    for(i=0;i<16;i++){
        const nome_streamer=json.data[i].display_name;
        const language_streamer=json.data[i].broadcaster_language;
        const img_canale=json.data[i].thumbnail_url;
        const is_live=json.data[i].is_live;
        

        const contenitore=document.createElement('div');
        contenitore.classList.add('contenitore');
        libreria.appendChild(contenitore);

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
        ln.textContent='Language: '+language_streamer;
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
