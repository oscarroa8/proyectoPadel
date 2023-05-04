import { Component, OnDestroy, OnInit } from "@angular/core";
import { Usuario } from "src/app/objects/model";

@Component({
    selector:'login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{
    usuario!:Usuario;

    ngOnInit(): void {//lo primero que se ejecuta despues del constructor
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {//lo ultimo que se ejecuta al terminar
        throw new Error("Method not implemented.");
    }
    
}