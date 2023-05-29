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
    libreria.classList.remove('libreria');
    libreria.classList.remove('Ricerca_ute');
    libreria.innerHTML="<div class='titolo_ricerca'><h1 class='risultati_ricerca'>Risultati della ricerca</h1></div>";
    
    const libreria_canale=document.createElement('section');
    libreria.appendChild(libreria_canale);
    libreria_canale.classList.add('libreria_ricerca');
    

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


//                                                 ##############################################################
//                                                 ##       Recupero tramite Db delle streams preferite        ##
//                                                 ##############################################################
const streamsData = new FormData();
streamsData.append('prefe', 'streams');
fetch('stream_prefe.php',{method: 'post', body: streamsData}).then(streamPrefeResponse).then(jsonStreamsPrefe);

function streamPrefeResponse(event){
    console.log('Risposta database streams:');
    console.log(event);
    return event.json()
}

function jsonStreamsPrefe(json){
    console.log(json);
    if(json.streams){
        const Errore=document.querySelector('div.streams_prefe');
        const span=document.createElement('span');
        span.classList.add('no_prefe');
        span.textContent=json.streams
        Errore.appendChild(span);
        return null
    }
    const length=json.length ;
 
    const contenitore=document.querySelector('section.libreria div.streams_prefe');
    for(let i=0;i<length-1;i++){
        const jso=json[i];

        const nome_gioco=jso.gioco;
        const id_canale=jso.id_canale;
        const id_stream=jso.id_stream;
        const language_streamer=jso.language;
        const nome_streamer=jso.nome_canale;
        const title_stream=jso.titolo_stream;
        const img_stream=jso.url;
        
        
     

        const cont_stream=document.createElement('div');
        cont_stream.classList.add('cont_stream');
        contenitore.appendChild(cont_stream);

        const img=document.createElement('img');
        img.classList.add('img_stream');
        img.src=img_stream;
        cont_stream.appendChild(img);

        const cont_info=document.createElement('div');
        cont_info.classList.add('cont_info');
        cont_stream.appendChild(cont_info);

        const cont_infoStream=document.createElement('div')
        cont_infoStream.classList.add('cont_infoStream');
        cont_info.appendChild(cont_infoStream);



        const titolo_stream=document.createElement('h1');
        titolo_stream.textContent=title_stream;
        cont_infoStream.appendChild(titolo_stream);

        const gioco=document.createElement('span');
        gioco.textContent=nome_gioco;
        cont_infoStream.appendChild(gioco);
        
        const cont_infoCanale=document.createElement('div');
        cont_infoCanale.classList.add('cont_infoCanale');
        cont_info.appendChild(cont_infoCanale);


        const Canale=document.createElement('span');
        Canale.classList.add('Canale');
        Canale.textContent=nome_streamer;
        cont_infoCanale.appendChild(Canale);

        const language=document.createElement('span');
        language.textContent='Language: '+language_streamer;
        cont_infoCanale.appendChild(language);

        const cuore_rosso=document.createElement('img');
        cuore_rosso.classList.add('cuore_prefe');
        cuore_rosso.src='images/cuore_rosso.png';

        const cont_img_cuore_rosso=document.createElement('div');
        cont_img_cuore_rosso.classList.add('cuore_prefe');
        cont_info.appendChild(cont_img_cuore_rosso);
        cont_img_cuore_rosso.appendChild(cuore_rosso);


        cuore_rosso.dataset.id_stream = id_stream;
        cuore_rosso.dataset.id_streamer = id_canale;
    
        cuore_rosso.addEventListener('click',togli_prefe_streams);
    }
}

function togli_prefe_streams(event){
    const cuore_rosso=event.currentTarget;

    const formData = new FormData();
    formData.append('id_canale', cuore_rosso.dataset.id_streamer );
    formData.append('togli', 'streams');

    fetch('Togli_prefe.php', {method: 'post', body: formData}).then(togliPrefeResponse).then(coloreCuoreReverse);
}

function togliPrefeResponse(event){
    console.log('Risposta togli preferito');
    console.log(event);
    return event.json()
}


function coloreCuoreReverse(json){
    console.log('Json togli preferito');
    console.log(json);

    if(json.togli=='truestreams'){
        const cont_stream=document.querySelectorAll('div.cont_stream');
        const cuore=document.querySelectorAll('div.cont_stream img.cuore_prefe');
        console.log(cont_stream);
        console.log(cuore);
        for(i=0;i<cont_stream.length;i++){
            if(cuore[i].dataset.id_streamer==json.id_canale){
                cont_stream[i].innerHTML="";
                cont_stream[i].classList.remove('cont_stream');
                cuore[i].classList.remove('cuore_prefe');
                console.log(json.id_canale);
            }
        }
        if(cont_stream.length==1){
            const Errore=document.querySelector('div.streams_prefe');
            const span=document.createElement('span');
            span.classList.add('no_prefe');
            span.textContent='Non ci sono streams che ti piacciono';
            Errore.appendChild(span);
        }
    }

    if(json.togli=='truecanali'){
        const const_canali=document.querySelectorAll('section.libreria_ricerca div.contenitore');
        const cuore=document.querySelectorAll('div.cuore div img');
        console.log(const_canali);
        console.log(cuore);
        for(i=0;i<const_canali.length;i++){
            if(cuore[i].dataset.id==json.id_canale){
                const_canali[i].innerHTML="";
                const_canali[i].classList.remove('contenitore');
                console.log(json.id_canale);
            }
        }
        if(const_canali.length==1){
            const Errore1=document.querySelector('div.canali_prefe');
            const span1=document.createElement('span');
            span1.classList.add('no_prefe');
            span1.textContent='Non ci sono canali che ti piacciono';
            Errore1.appendChild(span1);
        }
    }
    
    
   

}

//                                   ##############################################################
//                                   ##       Recupero tramite Db dei Canali preferiti           ##
//                                   ##############################################################
const CanaliData = new FormData();
CanaliData.append('prefe', 'canali');
fetch('stream_prefe.php',{method: 'post', body: CanaliData}).then(canaliPrefeResponse).then(jsoncanaliPrefe);

function canaliPrefeResponse(event){
    console.log('Risposta database canali:');
    console.log(event);
    return event.json()
}

function jsoncanaliPrefe(json){
    console.log(json);
    if(json.canali){
        const Errore=document.querySelector('div.canali_prefe');
        const span=document.createElement('span');
        span.classList.add('no_prefe');
        span.textContent=json.canali;
        Errore.appendChild(span);
        return null
    }
    const length=json.length ;
 
    const contenitore=document.querySelector('section.libreria div.canali_prefe');        
    const libreria_canale=document.createElement('section');
    contenitore.appendChild(libreria_canale);
    libreria_canale.classList.add('libreria_ricerca');

    for(let i=0;i<length-1;i++){
        const jso=json[i];

        const id_canale=jso.id_canale;
        const language_canale=jso.language;
        const nome_canale=jso.nome_canale;
        const img_canale=jso.url;
        
        const cont_canale=document.createElement('div');
        cont_canale.classList.add('contenitore');
        libreria_canale.appendChild(cont_canale);

        const cont_img=document.createElement('div');
        cont_img.classList.add('img_canale');
        const img=document.createElement('img');
        img.src=img_canale;
        cont_canale.appendChild(cont_img);
        cont_img.appendChild(img);

        const cont_dati=document.createElement('div');
        cont_dati.classList.add('dati_canale');
        cont_canale.appendChild(cont_dati);

        const cont_nome=document.createElement('div');
        cont_nome.classList.add('titolo_canale');
        cont_dati.appendChild(cont_nome);

        const nome=document.createElement('h1');
        nome.textContent=nome_canale;
        cont_nome.appendChild(nome);

        const cont_info=document.createElement('div');
        cont_info.classList.add('info_canale');
        cont_dati.appendChild(cont_info)

        const ln=document.createElement('span');
        ln.classList.add('ln');
        ln.textContent='Language: ' +language_canale;
        cont_info.appendChild(ln);

        
        const cont_preferiti=document.createElement('div')
        cont_preferiti.classList.add('cuore');
        cont_dati.appendChild(cont_preferiti);
        
        const preferiti=document.createElement('div')
        cont_preferiti.appendChild(preferiti);

        const cuore_rosso=document.createElement('img');
        cuore_rosso.src='images/cuore_rosso.png';
        preferiti.appendChild(cuore_rosso);

        cuore_rosso.dataset.name = nome_canale;
        cuore_rosso.dataset.id = id_canale;
        cuore_rosso.dataset.url_img = img_canale;
        cuore_rosso.dataset.language=language_canale;
        

        cuore_rosso.addEventListener('click',togli_prefe_canale);
    }
}

function togli_prefe_canale(event){
    const cuore_rosso=event.currentTarget;

    const formData = new FormData();
    formData.append('id_canale', cuore_rosso.dataset.id );
    formData.append('togli', 'canali');

    fetch('Togli_prefe.php', {method: 'post', body: formData}).then(togliPrefeResponse).then(coloreCuoreReverse);
}

