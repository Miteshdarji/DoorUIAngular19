import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoorSize } from '../../config/size.constant';

@Component({
  selector: 'app-door-design-add',
  imports: [
    CommonModule,
    FormsModule
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
}
