import { Component } from '@angular/core';
import { MedicineSearchComponent } from "../medicine-search/medicine-search.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MedicineSearchComponent, NgIf, NgFor],
})
export class DashboardComponent {
  medicines: any[] = [];

  constructor() { }

  handleSearchResults(results: any): void {
    this.medicines = results;
  }
}
