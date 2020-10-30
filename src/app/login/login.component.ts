import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  crendentials: any = {};

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.crendentials = {username: '', password: ''};
  }

  login(): void{
    console.log(this.crendentials);
    // Guardamos las credenciales que nos pasan en el login
    this.loginService.save(this.crendentials);
    this.router.navigate(['/companies']);
  }
}
