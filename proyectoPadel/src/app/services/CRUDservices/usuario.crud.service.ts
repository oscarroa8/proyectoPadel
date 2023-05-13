import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Pista, Usuario } from "../../objects/model";
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
    providedIn: 'root',
  })
export class UsuarioService{
    getAllUsuarios(database: SQLiteObject): Observable<Usuario[]> {
        const query = 'SELECT * FROM usuario';
        return new Observable<Usuario[]>((observer) => {
          database
            .executeSql(query, [])
            .then((result) => {
              const usuarios: Usuario[] = [];
              for (let i = 0; i < result.rows.length; i++) {
                usuarios.push(result.rows.item(i));
              }
              observer.next(usuarios);
              observer.complete();
            })
            .catch((error) => {
              console.error('Error retrieving users', error);
              observer.next([]);
              observer.complete();
            });
        });
      }

      async addUsuario(database: SQLiteObject, usuario: Usuario) {
        const query = `INSERT INTO usuario (nombre, apellido1, apellido2, email, pwd) VALUES(?, ?, ?, ?, ?)`;
        try {
          await database.executeSql(query, [
            usuario.nombre,
            usuario.apellido1,
            usuario.apellido2,
            usuario.email,
            usuario.pwd
          ]);
        } catch (error) {
          console.error('Error adding usuario', error);
        }
      }
    
      async updateUsuario(database: SQLiteObject, usuario: Usuario) {
        const query =
          'UPDATE usuario SET nombre = ? , apellido1 = ?, apellido2 = ?, email = ?, pwd = ? WHERE idUsuario = ?';
        try {
            await database.executeSql(query, [
                usuario.nombre,
                usuario.apellido1,
                usuario.apellido2,
                usuario.email,
                usuario.pwd,
                usuario.idUsuario,
            ]);
        } catch (error) {
          console.error('Error updating usuario', error);
        }
      }
    
      async deleteUsuario(database: SQLiteObject, idUsuario: Number) {
        const query = 'DELETE FROM usuario WHERE idUsuario = ?';
        try {
          await database.executeSql(query, [idUsuario]);
        } catch (error) {
          console.error('Error deleting item', error);
        }
      }
}