import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unknown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
  <section class="container d-flex align-items-center justify-content-center h-100 w-100">
    <h1 class="display-1">404</h1>
  </section>

  `

})
export class UnknownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
