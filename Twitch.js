// css condiviso 

//            ######################################################
//            ##                 Accesso  dell'utente             ##
//            ######################################################


document.querySelector('div.tendina div.Accedi').addEventListener('click',mostra_accedi);

function mostra_accedi(){
    const main=document.querySelector('main.Accedi');
    main.classList.remove('hidden');
}

if(document.querySelector("main.Accedi form")){
document.querySelector("main.Accedi form").addEventListener("submit", accedi);}

function accedi(event){
    const formData = new FormData(event.currentTarget);
    formData.append('username', formData.get('username'));
    formData.append('password', formData.get('password'));
        
    fetch("Accedi.php", {method: 'post', body: formData}).then(erroriResponse).then(jsonErrori);
        
    event.preventDefault();
}

function erroriResponse(event){
    console.log('json accesso:');
    console.log(event);
    return event.json()
}

function jsonErrori(json){
    console.log('Errori :');
    console.log(json);
    if(json!="true"){
        const errore=document.querySelector('main.Accedi form span');
        errore.textContent=json;
    }else{
    const main=document.querySelector('main');
    main.classList.add('hidden');
    location.reload();
    }
}



//            ######################################################
//            ##               Iscrizione  dell'utente            ##
//            ######################################################

//  controlli

document.querySelector('div.tendina div.Iscriviti').addEventListener('click',mostra_Iscriviti);

function mostra_Iscriviti(){
    const main=document.querySelector('main.Iscriviti');
    main.classList.remove('hidden');
}

if(document.querySelector("main.Iscriviti form")){
document.querySelector("main.Iscriviti form").addEventListener("submit", iscriviti);}

function iscriviti(event){
    const formData = new FormData(event.currentTarget);
    formData.append('nome', formData.get('nome'));
    formData.append('cognome', formData.get('cognome'));
    formData.append('username', formData.get('username'));
    formData.append('email', formData.get('email'));
    formData.append('password', formData.get('password'));
        
    fetch("registrazione.php", {method: 'post', body: formData}).then(erroriResponse1).then(jsonErrori1);
        
    event.preventDefault();
}

function erroriResponse1(event){
    console.log('json Iscrizione:');
    console.log(event);
    return event.json()
}

function jsonErrori1(json){
    console.log('Errori :');
    console.log(json);
    if(json.length>0){
        document.querySelector('main.Iscriviti form .user').textContent=json[0];
        document.querySelector('main.Iscriviti form .password').textContent=json[1];
        document.querySelector('main.Iscriviti form .email').textContent=json[2];
    }else{
    const iscriviti=document.querySelector('main.iscriviti');
    iscriviti.classList.add('hidden');
    const accedi=document.querySelector('main.Accedi');
    accedi.classList.remove('hidden');
    }
}

//            ############################################################
//            ##   Cambio  form se si clicca su accedi o iscriviti      ##
//            ############################################################
if(document.querySelector("main.Accedi form p span")){
document.querySelector('main.Accedi form p span').addEventListener('click',vai_iscriviti);
document.querySelector('main.Iscriviti form p span').addEventListener('click',vai_accedi);}

function vai_iscriviti(){
    const accedi=document.querySelector('main.Accedi');
    accedi.classList.add('hidden');
    const iscriviti=document.querySelector('main.Iscriviti');
    iscriviti.classList.remove('hidden');
}

function vai_accedi(){
    const accedi=document.querySelector('main.Accedi');
    accedi.classList.remove('hidden');
    const iscriviti=document.querySelector('main.Iscriviti');
    iscriviti.classList.add('hidden');
}

//            ######################################################
//            ##   Togliere il form se si clicca la di fuori      ##
//            ######################################################

if(document.querySelector("main.Accedi")){
document.querySelector('main.Accedi').addEventListener('click',togli_main);
document.querySelector('main.Iscriviti').addEventListener('click',togli_main);
document.querySelector('main.Accedi form').addEventListener('click',propagazione);
document.querySelector('main.Iscriviti form').addEventListener('click',propagazione);}
function togli_main(event){
    event.currentTarget.classList.add('hidden');
}
function propagazione(event){
    event.stopPropagation();
}


//            ######################################################
//            ##       Menù a tendina cliccando sull'img profilo  ##
//            ######################################################


if(document.querySelector('div.tendina img')){
    document.querySelector('div.tendina img').addEventListener('click',profilo);
}
function profilo(){
    const contenitore=document.querySelector('div.profilo');
    if(!contenitore.classList.contains('hidden')){
        contenitore.classList.add('hidden')
    }else{
        contenitore.classList.remove('hidden')
    }
}

//            #############################################
//            ##         Disconnessione dall'accout      ##
//            #############################################


document.querySelector('div.profilo div.logout').addEventListener('click',disconnetti);

function disconnetti(){
    fetch('Disconnetti.php').then(dispatchResponse, dispatchError);
    
    location.reload();
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

//                                #############################################
//                                ##       Mettere nei preferiti un canale   ##
//                                #############################################

function cuore(event){

    const contenitore=event.currentTarget.parentNode.parentNode;
    
    const formData = new FormData();
    formData.append('id_canale', contenitore.dataset.id);
    formData.append('nome_canale', contenitore.dataset.name);
    formData.append('url', contenitore.dataset.url_img);
    formData.append('language', contenitore.dataset.language);    
    
     
    fetch("Cuore_canale.php", {method: 'post', body: formData}).then(dispatchResponse1, dispatchError1);
     
    event.stopPropagation();
 }

 function dispatchResponse1(response) {
    console.log('Risposta cuore canale:')
    console.log(response);
    return response.json().then(databaseResponse1); 
}

function databaseResponse1(json) {
    console.log('Json cuore canale:');
    
    if(json.error){
        console.log(json.error);
        const errore=document.createElement('span');
        errore.textContent=json.error;
        errore.classList.add('errore_nonloggato');

        const cont=document.querySelector('.libreria_ricerca');
        cont.appendChild(errore);

        return null
    }else{
        console.log(json);
    }
    if(json.id_canale){
        const cuore_rosso=document.querySelectorAll('div.dati_canale div.cuore div img');
        const cont_id=document.querySelectorAll('div.dati_canale div.cuore');
        for(i=0;i<cont_id.length;i++){
            
            if(cont_id[i].dataset.id==json.id_canale)
            cuore_rosso[i].src='images/cuore_rosso.png';
        }
        ;
    }

   
}

function dispatchError1() { 
    console.log("Errore");
}

//            #############################################
//            ##           Controllo Cuori               ##
//            #############################################

function cuoreResponse(response) {

    return response.json(); 
}
let m=0;
let n=0;
function coloreCuore(json) {
    console.log('Json controllo cuore');
    console.log(json);
    
    if(json.exists=='truecanali'){
        const cuore_rosso=document.querySelectorAll('div.contenitore div.dati_canale div.cuore img');
        console.log(cuore_rosso);
        console.log(m);
        cuore_rosso[m].src='images/cuore_rosso.png';
        cuore_rosso[m].removeEventListener('click',cuore);
        m++;
    } 
    if(json.exists=='falsecanali')m++;

    if(json.exists=='truestreams'){
        const cuore_rosso1=document.querySelectorAll('img.cuore_bianco');
        cuore_rosso1[n].src='images/cuore_rosso.png';
        console.log(cuore_rosso1);
        console.log(n);
        cuore_rosso1[n].removeEventListener('click',cuore);
        n++;
    } 
    if(json.exists=='falsestreams')n++;

    
}

