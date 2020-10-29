import { Company } from '../companies/company';

export class Game {
    idJuego: number;
    titulo: string;
    fechaLanzamiento: string;
    precio: number;
    pegi: number;
    categoria: string;
    companies: Company[];
}
