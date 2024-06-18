import { Component, EventEmitter, Output } from '@angular/core';
import { MedicineService } from '../_servicies/medicine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-search',
  standalone: true,
  imports: [],
  templateUrl: './medicine-search.component.html',
  styleUrl: './medicine-search.component.css'
})
export class MedicineSearchComponent {
  query: string = '';
  @Output() searchResults = new EventEmitter<any>();

  constructor(private medicineService: MedicineService, private router: Router,) { }

  search(): void {
    this.medicineService.searchMedicine(this.query)
      .subscribe(data => {
        this.searchResults.emit(data); // Send search results to parent component
      });
  }
}
