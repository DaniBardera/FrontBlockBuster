import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.html']
})

export class FooterComponent {
    person: any = {name: 'Dani', lastname: 'Bardera'};
}
