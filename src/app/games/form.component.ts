import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../companies/company';
import { CompanyService } from '../companies/company.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  game: Game = new Game();
  companies: Company[];

  title: string;
  categorias: any[] = [{title: 'Shoter', value: 'SHOOTER'},
                        {title: 'MOBA', value: 'MOBA'},
                        {title: 'RPG', value: 'RPG'},
                        {title: 'MMORPG', value: 'MMORPG'},
                        {title: 'Roguelike', value: 'ROGUELIKE'},
                        {title: 'Metroidvania', value: 'METROIDVANIA'}];

  constructor(private gameService: GameService,
              private router: Router,
              private companyService: CompanyService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      listCompanies => this.companies = listCompanies
    );
    this.loadGame();
  }

  create(): void{
    this.gameService.createGame(this.game).subscribe(
      // Usamos el enrutador para navegar al listado de juegos al finalizar
      response => this.router.navigate(['/games'])
    );
  }

  public update(): void {
    this.gameService.updateGame(this.game).subscribe(
      response => this.router.navigate(['/games'])
    );
  }

  loadCompanies(): void{
    this.companyService.getCompanies().subscribe(
      companies => this.companies = companies
    );
  }

  loadGame(): void{
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;

      if (id){
        this.title = 'Editar Juego';
        this.gameService.getGame(id).subscribe(
          game => this.game = game
        );
      }else{
        this.title = 'Crear Juego';
      }
    });
  }

  compareCompany(companyToCompare: Company, companySelected: Company) {
    if (!companyToCompare || !companySelected) {
      return false;
    }
    return companyToCompare.idCompany === companySelected.idCompany;
  }
}
