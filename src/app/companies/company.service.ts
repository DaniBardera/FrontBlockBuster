import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { Company } from './company';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class CompanyService {

  urlServer: string = 'http://localhost:8090/';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private router: Router,
              private loginService: LoginService) { }

  getCompanies(): Observable<Company[]>{
    // LLamada a la API para obtener los juegos
    return this.http.get<Company[]>(this.urlServer + 'companies',
    {headers: this.loginService.getAuthHeaders()}).pipe(  // Permite operacionar con el observable
      catchError(e => {
        // Mostramos el error por consola
        console.error(`getCompanies error: "${e.message}"`);
        if (e.status == 401) {
          // Si no estamos autorizados, llevanos al login
          this.router.navigate(['/login']);
        } else {
          this.alertService.error(`Error al crear el juego: "${e.message}"`);
        }
        return throwError(e);
      })
    );
  }
}
