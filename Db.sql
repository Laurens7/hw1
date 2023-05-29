create database hw1;
use hw1;

create table UTENTI(
id integer not null primary key auto_increment,
nome varchar(100) not null,
cognome varchar(100) not null,
username varchar(100) not null unique,
email varchar(100) not null unique,
password varchar(255) not null
)Engine = InnoDB;

create table CATEGORIE(
    id integer primary key not null,
    title varchar(150) not null,
    url   text
)Engine = InnoDB;

create table Canali(
	id_utente integer  not null,
    id_canale integer not null ,
    nome_canale varchar(100) not null,
    url text,
    language varchar(10),
    primary key (id_utente,id_canale)
)Engine =InnoDB;

create table streams(
	id_utente integer not null,
    id_canale integer not null,
    nome_canale varchar(100) not null,
    id_stream bigint not null,
    titolo_stream varchar(150) not null,
    gioco varchar(100) not null,
    url text,
    language varchar(10) ,
    primary key (id_utente,id_canale)
)
