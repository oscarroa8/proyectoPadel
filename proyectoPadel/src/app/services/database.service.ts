import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Pista, Usuario } from '../objects/model';
import { Observable } from 'rxjs';
import { PistaService } from './CRUDservices/pista.crud.service';
import { UsuarioService } from './CRUDservices/usuario.crud.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject;
  private pistaService: PistaService;
  private usuarioService: UsuarioService;

  constructor(
    private sqlite: SQLite,
    private http: HttpClient,
    database: SQLiteObject,
    pistaService: PistaService,
    usuarioService: UsuarioService
  ) {
    this.database = database;
    this.pistaService = pistaService;
    this.usuarioService = usuarioService;
  }

  async loadScriptsSQL(): Promise<string> {
    try {
      return await this.http
        .get('assets/scripts/scripts.sql', { responseType: 'text' })
        .toPromise();
    } catch (error) {
      console.error('Error loading scripts.sql', error);
      return '';
    }
  }

  async createDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'mydb.db',
        location: 'default',
      });
      await this.createTable();
    } catch (error) {
      console.error('Error opening database', error);
    }
  }

  async createTable() {
    try {
      const createTablesQuery = await this.loadScriptsSQL();
      for (const query of createTablesQuery) {
        await this.database.executeSql(query, []);
      }
    } catch (error) {
      console.error('Error creating table', error);
    }
  }

  //CRUD operations for Entity Pista
  getPistas() {
    this.pistaService.getAllPistas(this.database).subscribe(
      (pistas) => {
        return pistas;
      },
      (error) => {
        console.error(`Error: ${error}`);
      }
    );
  }

  createPista(pista: Pista) {
    this.pistaService.addPista(this.database, pista);
  }

  modifiePista(pista: Pista, idUsuario: Number | null) {
    this.pistaService.updatePista(this.database, pista, idUsuario);
  }

  deletePista(idPista: Number) {
    this.pistaService.deletePista(this.database, idPista);
  }

  //CRUD operations for Entity Usuario
  getUsuarios(users: Usuario[]) {
    this.usuarioService.getAllUsuarios(this.database).subscribe(
      (usuarios) => {
        users = usuarios;
      },
      (error) => {
        console.error(`Error: ${error}`);
      }
    );
  }
  createUsuario(usuario: Usuario) {
    this.usuarioService.addUsuario(this.database, usuario);
  }

  modifieUsuario(usuario: Usuario) {
    this.usuarioService.updateUsuario(this.database, usuario);
  }

  deleteUsuario(idUsuario: Number) {
    this.usuarioService.deleteUsuario(this.database, idUsuario);
  }

}
