import { Component, OnDestroy, OnInit } from "@angular/core";
import { Usuario } from "src/app/objects/model";
import { DatabaseService } from "src/app/services/database.service";

@Component({
    selector:'login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy{
    usuario:Usuario;
    usuarios!: Usuario[];

    database: DatabaseService;

    email: String = "oscarroales@gmail.com";

    constructor(
        database: DatabaseService,
        usuario: Usuario
    ){
        this.database = database;
        this.usuario = usuario;
    }

    ngOnInit(): void {
        //lo primero que se ejecuta despues del constructor
        this.database.getUsuarios(this.usuarios);
        this.usuario = this.getUserByEmail(this.email);
    }

    private getUserByEmail(email: String): Usuario{
        const userAux:Usuario | undefined = this.usuarios.find(u => u.email === email);
    
        if(userAux)
            return userAux;
        else{
            throw new Error("User not found")
        }
    }

    ngOnDestroy(): void {//lo ultimo que se ejecuta al terminar
        throw new Error("Method not implemented.");
    }
    
}