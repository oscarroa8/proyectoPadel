drop table if EXISTS pista;

drop table if EXISTS usuario;

drop table if EXISTS cliente;

drop table if EXISTS cliente_pista;

create table pista(
    idPista integer primary key AUTOINCREMENT not null,
    nombre text,
    material text,
    precio real,
    idUsuario integer,
    FOREIGN KEY(idUsuario) REFERENCES usuario(idUsuario)
);

create table usuario(
    idUsuario integer primary key AUTOINCREMENT not null,
    nombre text,
    apellido1 text,
    apellido2 text,
    email text,
    contrasena text
);

create table cliente(
    idCliente integer primary key AUTOINCREMENT not null,
    nombre text,
    apellido1 text,
    apellido2 text,
    -- email text,
    -- contrasena text
);

create table cliente_pista(
    idPista integer,
    idCliente integer,
    fecha text,
    horainicio text,
    horafin text,
    preciototal real,
    PRIMARY key (idPista, idCliente)
);