import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header class="container-fluid bg-dark pt-md-2 pb-md-2 shadow">
     <app-inventory-nav-ui></app-inventory-nav-ui>
    </header>
    <main class="p-3">
        <router-outlet></router-outlet>,
    </main>
`,
  styles:[`

  `],
})
export class AppComponent {
  title = 'cavea-front';
}
