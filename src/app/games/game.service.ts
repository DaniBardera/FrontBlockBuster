import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from './game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class GameService {

  urlServer: string = 'http://localhost:8090/';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute) { }

  getGames(): Observable<Game[]>{
    // LLamada a la API para obtener los juegos
    return this.http.get<Game[]>(this.urlServer + 'juegos').pipe(  // Permite operacionar con el observable
      catchError(e => {
        // Mostramos el error por consola
        console.error(`getGames error: "${e.message}"`);
        // Mostramos el error al usuario
        this.alertService.error(`Error al consultar los juegos: "${e.message}"`,
                                {autoClose: true, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }

  createGame(juego: Game): Observable<Game> {
    return this.http.post<Game>(this.urlServer + 'juegos', juego, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(`create error: "${e.message}"`);
        this.alertService.error(`Error al crear el juego: "${e.message}"`);
        return throwError(e);
      })
    );
  }

  getGame(id: number): Observable<Game>{
    // LLamada a la API para obtener los juegos
    return this.http.get<Game>(`${this.urlServer}juegos/${id}`).pipe(  // Permite operacionar con el observable
      catchError(e => {
        // Mostramos el error por consola
        console.error(`getGame error: "${e.message}"`);
        // Mostramos el error al usuario
        this.alertService.error(`Error al consultar el juego: "${e.message}"`,
                                {autoClose: true, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }

  updateGame(juego: Game): Observable<Game>{
    // LLamada a la API para obtener los juegos
    return this.http.put<Game>(`${this.urlServer}juegos/${juego.idJuego}`,
    juego, {headers: this.httpHeaders}).pipe(  // Permite operacionar con el observable
      catchError(e => {
        // Mostramos el error por consola
        console.error(`updateGame error: "${e.message}"`);
        // Mostramos el error al usuario
        this.alertService.error(`Error al actualizar el juego: "${e.message}"`,
                                {autoClose: true, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }


}
