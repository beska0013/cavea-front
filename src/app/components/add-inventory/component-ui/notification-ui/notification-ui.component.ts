import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-ui',
  standalone: true,
  imports: [CommonModule],
  template:`
    <div class="alert"
         [class]="{'alert-primary': status === 'success', 'alert-danger': status === 'error'}"
         role="alert">
     {{statuMessage}}
    </div>
  `,

})
export class NotificationUiComponent implements OnInit {

  constructor() { }

  @Input() statuMessage!: string
  @Input() status: 'success' | 'error' = 'error';
  ngOnInit(): void {}

}
