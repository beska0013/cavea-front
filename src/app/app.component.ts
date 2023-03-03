import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p class="h1">app works</p>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>Item Name</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Item 1</td>
      <td>2</td>
      <td>$10.00</td>
    </tr>
    <tr>
      <td>Item 2</td>
      <td>1</td>
      <td>$5.00</td>
    </tr>
    <tr>
      <td>Item 3</td>
      <td>3</td>
      <td>$15.00</td>
    </tr>
    </tbody>
  </table>
  <router-outlet></router-outlet>`,

})
export class AppComponent {
  title = 'cavea-front';
}
