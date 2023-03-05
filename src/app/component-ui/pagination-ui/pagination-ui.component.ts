import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-ui.component.html',
  styleUrls: ['./pagination-ui.component.scss']
})
export class PaginationUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
