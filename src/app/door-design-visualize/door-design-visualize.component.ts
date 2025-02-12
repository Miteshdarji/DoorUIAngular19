import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // for checkbox added this 

@Component({
  selector: 'app-door-design-visualize',
  imports: [CommonModule,FormsModule],
  templateUrl: './door-design-visualize.component.html',
  styleUrl: './door-design-visualize.component.css'
})


export class DoorDesignVisualizeComponent {
  
  rowSize = 8; // Default number of rows
  colSize = 4; // Default number of columns
  grid: string[][] = [];
  selectedBoxes: boolean[][] = [];

  constructor() {
    
    this.initializeGrid();
  }

  initializeGrid() {
    this.grid = [];
    this.selectedBoxes = [];

    for (let i = 0; i < this.colSize; i++) {
      this.grid[i] = [];
      this.selectedBoxes[i] = [];
      for (let j = 0; j < this.rowSize; j++) {
        this.grid[i][j] = `Row ${i + 1} Col ${j + 1}`;
        this.selectedBoxes[i][j] = false; // Default unchecked
      }
    }
  }

  onCheckboxChange(row: number, col: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedBoxes[row][col] = isChecked; // Update the checkbox state immediately
    console.log('Col: ' + row + ' Row: ' + col + 'isChecked: ' + isChecked);
  }

  updateGrid() {
    this.initializeGrid(); // Reinitialize grid when row/column values change
  }

  // To select all checkbox logic
  toggleColumnSelection(col: number) {
    const allChecked = this.selectedBoxes.every(row => row[col]);
    this.selectedBoxes.forEach(row => row[col] = !allChecked);
  }
}
