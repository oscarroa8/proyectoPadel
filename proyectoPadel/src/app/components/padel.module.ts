//Contiene la informacion de los modulos que voy a usar

import { NgModule } from "@angular/core";
import { LoginComponent } from "./login-component/login.component";

@NgModule({
    imports:[],
    declarations:[LoginComponent],
    exports:[LoginComponent]
})
export class PadelModule{}