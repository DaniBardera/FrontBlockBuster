import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  showId: boolean = false;

  games: Game[];

  // Definimos el servicio, para poder usar el método getGames()
  constructor(private gameService: GameService,
              private alertService: AlertService) { }

  switchId(): void {
    this.showId = !this.showId;
  }

  // Cuando se inicializa el componente, entra por el Init()
  ngOnInit(): void {
   this.refreshGames();
  }

  deleteGame(game: Game): void {
    if (confirm(`¿Está seguro que desea eliminar el juego "${game.titulo}"?`)) {
      this.gameService.deleteGame(game.idJuego).subscribe(
        response => {
          this.alertService.success(`Se ha boorado correctamente el juego "${game.titulo}" con ID: ${game.idJuego}`, {autoClose: true});
          this.refreshGames();
        }
      );
    }
  }

  private refreshGames(): void{
    this.gameService.getGames().subscribe(
      // Cuando lea el archivo introduzca el la variable juegos en el objeto creado arriba
      games => this.games = games
    );
  }
}
