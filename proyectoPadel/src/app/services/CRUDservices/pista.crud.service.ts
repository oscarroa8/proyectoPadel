import { Injectable } from '@angular/core';
import { SQLiteObject } from "@ionic-native/sqlite";
import { Observable } from "rxjs";
import { Pista } from "../../objects/model";

@Injectable({
    providedIn: 'root',
  })
export class PistaService{
    getAllPistas(database: SQLiteObject): Observable<Pista[]> {
        const query = 'SELECT * FROM pista';
        return new Observable<Pista[]>((observer) => {
          database
            .executeSql(query, [])
            .then((result) => {
              const pistas: Pista[] = [];
              for (let i = 0; i < result.rows.length; i++) {
                pistas.push(result.rows.item(i));
              }
              observer.next(pistas);
              observer.complete();
            })
            .catch((error) => {
              console.error('Error retrieving pistas', error);
              observer.next([]);
              observer.complete();
            });
        });
      }

      async addPista(database: SQLiteObject, pista: Pista) {
        const query = `INSERT INTO pista (nombre, material, precio, idUsuario) VALUES(?, ?, ?, 0)`;
        try {
          await database.executeSql(query, [
            pista.nombre,
            pista.material,
            pista.precio,
          ]);
        } catch (error) {
          console.error('Error adding pista', error);
        }
      }
    
      async updatePista(database: SQLiteObject, pista: Pista, idUsuario: Number | null) {
        const query =
          'UPDATE pista SET nombre = ? , material = ?, precio = ?, idUsuario = ? WHERE idPista = ?';
        try {
          if (idUsuario == null)
            await database.executeSql(query, [
              pista.nombre,
              pista.material,
              pista.precio,
              pista.idUsuario,
              pista.idPista,
            ]);
          else
            await database.executeSql(query, [
              pista.nombre,
              pista.material,
              pista.precio,
              idUsuario,
              pista.idPista,
            ]);
        } catch (error) {
          console.error('Error updating pista', error);
        }
      }
    
      async deletePista(database: SQLiteObject, idPista: Number) {
        const query = 'DELETE FROM pista WHERE idPista = ?';
        try {
          await database.executeSql(query, [idPista]);
        } catch (error) {
          console.error('Error deleting item', error);
        }
      }
}