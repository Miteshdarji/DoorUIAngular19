import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoorSize } from '../../config/size.constant';
import { DoorDesignVisualizeComponent } from '../door-design-visualize/door-design-visualize.component';
@Component({
  selector: 'app-door-design-add',
  imports: [
    CommonModule,
    FormsModule,
    DoorDesignVisualizeComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './door-design-add.component.html',
  styleUrl: './door-design-add.component.css',
})
export class DoorDesignAddComponent implements OnInit {
  DoorSizeList = DoorSize;
  doorQuantity: number = 1;
  doorWidthFt: number = 8;
  doorWidthInch: number = 0;
  doorHeightFt: number = 7;
  doorHeightInch: number = 0;

  doorCompanyList: any[] = [];
  doorCompany!: number;

  typeOfDoorsList: any[] = [];
  doorType!: number;

  doorCollectionList: any[] = [];
  doorCollection!: number;

  doorSubCollectionList: any[] = [];
  doorSubCollection!: number;

  doorPanelList : any[] = [];
  doorPanel!: number;

  doorModelList: any[] = [];
  doorModel!: number;

  doorColorList: any[] = [];
  doorColor!: number;

  // ===  Visualize UI [Start] ===== 
  rowArray: string[] = [];
  column: number = 0;
  rowSize = 0; // Default number of rows
  colSize = 0; // Default number of columns
  grid: string[][] = [];
  selectedBoxes: boolean[][] = [];
  fileBackImage: string = '';
  repeatfilePath: string = '';
  dynamicLeftBackImageUrl: string = '';
  bgColor: string = '';
  // ===  Visualize UI [Start] ===== 

  constructor(private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.authentication();
    setTimeout(() => {
      this.getDoorCompany();
      this.getTypeOfDoors();
    }, 1000);
    setTimeout(() => {
      this.getDoorCollection();
    }, 3000);
  }

  changeDoorSize(widthFt: number, heightFt: number, widthInch: number = 0, heightInch: number = 0): void {
    this.doorWidthFt = widthFt;
    this.doorWidthInch = widthInch;
    this.doorHeightFt = heightFt;
    this.doorHeightInch = heightInch;
  }

  selectSubCollection(item: any) {
    this.doorSubCollection = item.doorSubCollectionId;
    this.getDoorPanels(item.doorSubCollectionId);
  }

  selectPanel(item: any) {
    this.doorPanel = item?.doorPanelId;
    this.getVisualizationModel();
  }

  selectModel(item:any) {
    this.doorModel = item?.doorModelId;
    this.doorColorList = item?.lstDoorColor;
  }

  // API Calling
  // Function to be used for authentication
  authentication() {
    this.utilsService.authentication().subscribe((data) => {
      this.utilsService.setLocalStorage(data?.payload);
    }, (error) => {
      console.error('Error During Authentication :', error);
    }
    );
  }

  // Function to be used for getting get door company
  getDoorCompany() {
    this.utilsService.getDoorCompany().subscribe((data: any) => {
      this.doorCompanyList = data?.payload;
      this.doorCompany = this.doorCompanyList[0]?.doorCompanyId;
    }, (error) => {
      console.error('Error During door company :', error);
    })
  }

  getTypeOfDoors() {
    this.utilsService.getTypeOfDoors().subscribe((data: any) => {
      this.typeOfDoorsList = data?.payload;
      this.doorType = this.typeOfDoorsList[0]?.doorTypeId;
    }, (error) => {
      console.error('Error During door typeOfDoorsList :', error);
    })
  }

  getDoorCollection() {
    this.utilsService.getDoorCollection(this.doorType, this.doorCompany).subscribe((data: any) => {
      this.doorCollectionList = data?.payload;
      this.doorCollection = this.doorCollectionList[0]?.doorCollectionId;
      this.getDoorSubCollection(this.doorCollection);
    }, (error) => {
      console.error('Error During door typeOfDoorsList :', error);
    })
  }

  getDoorSubCollection(doorCollection: number) {
    this.utilsService.getDoorSubCollection(doorCollection).subscribe((data: any) => {
      this.doorSubCollectionList = data?.payload;
    }, (error) => {
      console.error('Error During door typeOfDoorsList :', error);
    })
  }

  getDoorPanels(doorSubCollection: number) {
    this.utilsService.getDoorPanels(doorSubCollection).subscribe((data: any) => {
      this.doorPanelList = data?.payload;
      console.log('Background Image: ', this.doorPanelList);
      console.log('Background Image: ', this.doorPanelList[0].repeatfilePath);
      
      this.repeatfilePath = this.doorPanelList[0].repeatfilePath;
      //this.bgColor = this.doorModelList[0]?.lstDoorColor[1]?.colorCode;
      //this.dynamicLeftBackImageUrl = this.doorPanelList[0].repeatfilePath;
       console.log('@@@@@@@@@@');
       console.log(this.bgColor);

    }, (error) => {
      console.error('Error During door typeOfDoorsList :', error);
    })
  }

  getVisualizationModel() {
    const payload = {
      doorHeight: String(this.doorHeightFt) + '.0',
      doorWidth: String(this.doorWidthFt) + '.0',
      doorTypeId: this.doorType,
      doorCompanyId: this.doorCompany,
      doorPanelId: this.doorPanel,
      doorOrSectional : "SECTION_DOOR"
    }
    this.utilsService.getVisualizationModel(payload).subscribe((data: any) => {
      this.doorModelList = data?.payload;
      console.log('****** Array: ', this.doorModelList[0]?.lstDoorColor[0]?.noOfSection)
      console.log('****** Row ' , this.doorModelList[0]?.lstDoorColor[0]?.noOfSectionDetail)
      console.log('****** Final Row ' , this.doorModelList[0]?.lstDoorColor[0]?.noOfSectionDetail.length)
      console.log('****** Final Column  ', this.doorModelList[0]?.widthSection);   
      this.rowSize = this.doorModelList[0]?.lstDoorColor[0]?.noOfSectionDetail.length;
      this.colSize = this.doorModelList[0]?.widthSection;
      this.bgColor = this.doorModelList[0]?.lstDoorColor[0]?.colorCode;
      //this.fileBackImage = this.doorModelList[0]?.lstDoorColor[0]?.fileBackPath;
      console.log('****** Back Image :  ', this.repeatfilePath);   
      this.initializeGrid();

//       console.log('Data:', this.doorModelList[0]?.noOfSection);
// console.log('Type:', typeof this.doorModelList[0]?.noOfSection);
// console.log('Is Array:', Array.isArray(this.doorModelList[0]?.noOfSection));
const dataArray: string[] = this.doorModelList[0]?.noOfSection.values.split(',');
console.log(dataArray); // ['21', '21', '21', '21']

      console.log('****** Back Image ' + this.doorModelList[0]?.lstDoorColor[0]?.fileBackPath);
      
    }, (error) => {
      console.error('Error During door typeOfDoorsList :', error);
    })
  }


// ====== Dynamic Window Binding ( Row and Column )===== 

initializeGrid() {
  this.grid = [];
  this.selectedBoxes = [];

  for (let i = 0; i < this.colSize; i++) {
    this.grid[i] = [];
    this.selectedBoxes[i] = [];
    for (let j = 0; j < this.rowSize; j++) {
      this.grid[i][j] = `Row ${i + 1} Col ${j + 1}`;
      this.selectedBoxes[i][j] = true; // Default unchecked
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
