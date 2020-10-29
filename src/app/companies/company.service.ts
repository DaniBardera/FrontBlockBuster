import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { Company } from './company';

@Injectable()
export class CompanyService {

  urlServer: string = 'http://localhost:8090/';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private alertService: AlertService) { }

  getCompanies(): Observable<Company[]>{
    // LLamada a la API para obtener los juegos
    return this.http.get<Company[]>(this.urlServer + 'companies').pipe(  // Permite operacionar con el observable
      catchError(e => {
        // Mostramos el error por consola
        console.error(`getCompanies error: "${e.message}"`);
        // Mostramos el error al usuario
        this.alertService.error(`Error al consultar los juegos: "${e.message}"`,
                                {autoClose: true, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }
}
