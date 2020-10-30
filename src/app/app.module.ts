import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GamesComponent } from './games/games.component';
import { GameService } from './games/game.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { FormComponent as GamesFormComponent} from './games/form.component';
import { FormsModule } from '@angular/forms';
import { CompanyService } from './companies/company.service';
import { LoginComponent } from './login/login.component';

// Creamos las rutas
const ROUTES: Routes = [
  {path: 'games', component: GamesComponent},
  {path: 'games/form', component: GamesFormComponent},
  {path: 'games/form/:id', component: GamesFormComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/games', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    GamesComponent,
    AlertComponent,
    CompaniesComponent,
    GamesFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [
    GameService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
