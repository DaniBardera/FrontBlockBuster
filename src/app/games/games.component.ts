import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  showId: boolean = false;

  games: Game[];

  // Definimos el servicio, para poder usar el método getGames()
  constructor(private gameService: GameService) { }

  switchId(): void {
    this.showId = !this.showId;
  }

  // Cuando se inicializa el componente, entra por el Init()
  ngOnInit(): void {
    this.gameService.getGames().subscribe(
      // Cuando lea el archivo introduzca el la variable juegos en el objeto creado arriba
      games => this.games = games
    );
  }

}
