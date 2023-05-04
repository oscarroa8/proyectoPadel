import { Time } from "@angular/common";

export interface Usuario{
  nombre:String;
  apellido1:String;
  apellido2:String;
  email:String;
  pwd:String;  
}

export interface Cliente{
    nombre:String;
    apellido1:String;
    apellido2:String;
    // email:string;
    // pwd:string;  
  }
  export interface Pista{
    nombre: String;
    material:String;
    precio:Number;
    idUsuario:Number;
  }
  export interface ClientePista{
    idPista:Number;
    idCliente:Number;
    fecha:Date;
    horainicio:Time;
    horafin:Time;
    precioTotal:Number;
  }