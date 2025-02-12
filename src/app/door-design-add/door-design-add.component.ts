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

  doorPanelList: any[] = [];
  doorPanel!: number;

  doorModelList: any[] = [];
  doorModel!: number;

  doorColorList: any[] = [];
  doorColor!: number;

  // Door glass
  doorWindowGlassCategoryList: any[] = [];
  doorWindowGlassCategory!: number;
  doorWindowGlassSubCategoryList: any[] = [];
  doorWindowGlassSubCategory!: number;

  // Door insert
  doorWindowInsertCategoryList: any[] = [];
  doorWindowInsertCategory!: number;
  doorWindowInsertSubCategoryList: any[] = [];
  doorWindowInsertSubCategory!: number;

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

  // Select the sub collection
  selectSubCollection(item: any) {
    this.doorSubCollection = item.doorSubCollectionId;
    this.getDoorPanels(item.doorSubCollectionId);
  }

  // Select the panel
  selectPanel(item: any) {
    this.doorPanel = item?.doorPanelId;
    this.getVisualizationModel();
  }

  // Select the model
  selectModel(item: any) {
    this.doorModel = item?.doorModelId;
    this.doorColorList = item?.lstDoorColor;
    this.getWindowGlassCategory(item?.doorModelId);
    this.getWindowInsertCategory(item?.doorModelId);
    this.getSpringCategoryType();
  }

  // Select the window glass category
  selectWindowGlassCategory(item: any) {
    this.doorWindowGlassCategory = item?.factoryGlazeTypeId;
    this.getWindowGlassSubCategory(this.doorWindowGlassCategory);
  }

  // Select the window glass sub category
  selectWindowGlassSubCategory(item: any) {
    this.doorWindowGlassSubCategory = item?.factoryGlazeSizeId;
  }

  // Select the window insert category
  selectWindowInsertCategory(item: any) {
    this.doorWindowInsertCategory = item?.doorInsulatedTypeId;
    this.getWindowInsertSubCategory(this.doorWindowInsertCategory);
  }

  // Select the window insert category
  selectWindowInsertSubCategory(item: any) {
    this.doorWindowInsertSubCategory = item?.doorInsulatedId;
  }

  // Select spring category type
  selectSpringCategoryType(item: any) {
    this.doorSpringCategoryType = item?.springCategoryTypeId;
    this.getSpringCategory(this.doorSpringCategoryType);
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
      doorOrSectional: "SECTION_DOOR"
    }
    this.utilsService.getVisualizationModel(payload).subscribe((data: any) => {
      this.doorModelList = data?.payload;
    }, (error) => {
      console.error('Error During door getVisualizationModel :', error);
    });
  }

  getWindowGlassCategory(doorModel: number) {
    this.utilsService.getWindowGlassCategory(doorModel).subscribe((data: any) => {
      this.doorWindowGlassCategoryList = data?.payload;
      this.doorWindowGlassCategory = this.doorWindowGlassCategoryList[0]?.factoryGlazeTypeId;
      this.getWindowGlassSubCategory(this.doorWindowGlassCategory);
    }, (error) => {
      console.error('Error During door getWindowGlassCategory :', error);
    })
  }

  getWindowGlassSubCategory(doorModel: number) {
    this.utilsService.getWindowGlassSubCategory(doorModel).subscribe((data: any) => {
      this.doorWindowGlassSubCategoryList = data?.payload;
      // this.doorWindowGlass = this.doorWindowGlassCategoryList[0]?.factoryGlazeTypeId;
    }, (error) => {
      console.error('Error During door getWindowGlassCategory :', error);
    })
  }

  getWindowInsertCategory(doorModel: number) {
    this.utilsService.getWindowInsertCategory(doorModel).subscribe((data: any) => {
      this.doorWindowInsertCategoryList = data?.payload;
      this.doorWindowInsertCategory = this.doorWindowInsertCategoryList[0]?.doorInsulatedTypeId;
      this.getWindowInsertSubCategory(this.doorWindowInsertCategory);
    }, (error) => {
      console.error('Error During door getWindowInsertCategory :', error);
    })
  }

  getWindowInsertSubCategory(doorModel: number) {
    this.utilsService.getWindowInsertSubCategory(doorModel).subscribe((data: any) => {
      this.doorWindowInsertSubCategoryList = data?.payload;
    }, (error) => {
      console.error('Error During door getWindowInsertSubCategory :', error);
    })
  }

  doorSpringCategoryTypeList: any[] = [];
  doorSpringCategoryType!: number;
  // Get spring category type list
  getSpringCategoryType() {
    this.utilsService.getSpringCategoryType().subscribe((data: any) => {
      this.doorSpringCategoryTypeList = data?.payload;
      this.doorSpringCategoryType = this.doorSpringCategoryTypeList[0]?.springCategoryTypeId;
      this.getSpringCategory(this.doorSpringCategoryType);
    }, (error) => {
      console.error('Error During door getSpringCategoryType :', error);
    })
  }

  doorSpringCategoryList: any[] = [];
  doorSpringCategory!: number;
  // get Spring Category by spring type
  getSpringCategory(doorSpringCategoryType: number) {
    this.utilsService.getSpringCategory(doorSpringCategoryType).subscribe((data: any) => {
      this.doorSpringCategoryList = data?.payload;
      this.doorSpringCategory = this.doorSpringCategoryList[0]?.springCategoryId;
      this.getVisualizationSpringDetails();
    }, (error) => {
      console.error('Error During door getSpringCategory :', error);
    })
  }

  visualizationSpringDetails: any;

  getVisualizationSpringDetails() {
    const payload = {
      springCategoryId: this.doorSpringCategory,
      doorModelId: this.doorModel,
      doorHeight: String(this.doorHeightFt) + '.0',
      doorWidth: String(this.doorWidthFt) + '.0'
    }
    this.utilsService.getVisualizationSpringDetails(payload).subscribe((data: any) => {
      this.visualizationSpringDetails = data?.payload?.length > 0 ? data?.payload[0] : null;
    }, (error) => {
      console.error('Error During door getVisualizationSpringDetails :', error);
    })
  }

  // When change the spring category
  changeSpringCategory(event : any) {
    console.log("event.target.value", event.target.value)
    this.doorSpringCategory = event.target.value;
    this.getVisualizationSpringDetails();
  }
}
