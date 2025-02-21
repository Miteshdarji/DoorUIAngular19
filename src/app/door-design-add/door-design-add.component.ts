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

  visualizationSelection: any = {
    visualize_backSelectedColor: "",
    visualize_backSelectedImage: "",
    visualize_backRepeatImage: "",
    visualize_noOfSections: "",
    visualize_row: "",
    visualize_column: "",
    visualize_backGlassImage: "",
    visualize_backWindowInsertImage: ""
  }

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
     bgColor: string = '--';
     bgImage: string = '--';
     isBGImage: boolean = false;
     bgWindowInsertImage:string = '';
     bgGlassImage = '';
     checkboxSelectedCount: number = 0;
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

  // Select the sub collection
  selectSubCollection(item: any) {
    this.doorSubCollection = item.doorSubCollectionId;
    this.getDoorPanels(item.doorSubCollectionId);

    console.log("Click to Collection and family", item);
    console.log("visualizationSelection", this.visualizationSelection);
  }

  // Select the panel
  selectPanel(item: any) {
    this.doorPanel = item?.doorPanelId;
    this.visualizationSelection['visualize_backRepeatImage'] = item?.repeatfilePath;
    this.getVisualizationModel();
    console.log("Click to Panel", item);
    console.log("visualizationSelection", this.visualizationSelection);
  }

  // Select the model
  selectModel(item: any) {
    this.doorModel = item?.doorModelId;
    this.doorColorList = item?.lstDoorColor;

    this.doorColor = this.doorColorList[0]?.doorColorId;
    this.visualizationSelection['visualize_noOfSections'] = this.doorColorList[0]?.noOfSectionDetail;
    this.visualizationSelection['visualize_row'] = this.doorColorList[0]?.noOfSectionDetail?.length;
    this.visualizationSelection['visualize_column'] = item?.widthSection;
    if (this.doorColorList[0]?.colorCode?.length < 6) {
      this.generateImageWoodenColorImage(this.doorColorList[0]);
    } else {
      this.visualizationSelection['visualize_backSelectedColor'] = this.doorColorList[0]?.colorCode;
      this.visualizationSelection['visualize_backSelectedImage'] = "--";
    }

    this.getWindowGlassCategory(item?.doorModelId);
    this.getWindowInsertCategory(item?.doorModelId);
    this.getSpringCategoryType();
    this.getStrutCategoryTypes();
    this.getDoorSealType();

    console.log("Click to Model", item);
    console.log("visualizationSelection", this.visualizationSelection);
  }

  selectColor(item: any) {
    this.doorColor = item?.doorColorId;
    this.visualizationSelection['visualize_noOfSections'] = item?.noOfSectionDetail;
    this.visualizationSelection['visualize_row'] = item?.noOfSectionDetail?.length;
    if (item?.colorCode?.length < 6) {
      this.visualizationSelection['visualize_backSelectedColor'] = "--";
      this.generateImageWoodenColorImage(item);
    } else {
      this.visualizationSelection['visualize_backSelectedColor'] = item?.colorCode;
      this.visualizationSelection['visualize_backSelectedImage'] = "--";
    }
    console.log("Click to Color", item);
    console.log("this.visualizationSelection", this.visualizationSelection);
  }

  generateImageWoodenColorImage(colorItem: any) {
    let selected_color_id = colorItem?.doorColorId
    let panelID = this.doorPanel;
    let repeatedImage: any;

    let modernWoodgrain = 13;
    let classicWoodgrain = 12; // 25
    let walnut = 14;
    let mahogany = 15;
    let driftWood = 16;
    let ceder = 17;
    let darkOak = 18;
    let carbon = 20;
    let darkWalnut = 40;
    let weatheredGrey = 41;
    // safeway color
    let oak = 28;
    let roosewood = 29;


    if (panelID == 1) {
      // raised short
      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/short/modern_woodgrain_raisedshort.jpg" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/short/Classic_Woodgrain_raisedshort.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/short/Walnut_Raised_Short.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/short/Mahogany_Raised_Short.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/short/Driftwood_Raised_Short.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/short/Cedar_Raised_Short.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/short/Dark_Oak_Raised_Short.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/short/Carbon_Raised_Short.png" : '';
    }

    else if (panelID == 2) {
      // raised long
      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/modern_woodgrain_raised_long_repeat.png" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/classic_woodgrain_raised_long_repeat.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/long/Walnut_Raised_Long.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/long/Mahogany_Raised_Long.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Driftwood_Raised_Long.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/long/Cedar_Raised_Long.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/long/Dark_Oak_Raised_Long.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/long/Carbon_Raised_Long.png" : '';
    }
    else if (panelID == 3) {
      // stampped carrige house short

      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/short/modern_woodgrain_SCH_short.png" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/short/classic_woodgrain_SCH_short.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/short/walnut_SCH_short.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/short/mahogany_SCH_short.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/short/driftwood_SCH_short.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/short/dakoak_SCH_short.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/short/ceder_SCH_short.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/short/carban_oak_SCH_short.png" : '';
    }
    else if (panelID == 4) {
      // stampped carrige house long
      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/Modern_Woodgrain_SCH_Long_Image.png" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/Classic_Woodgrain_SCH_Long_Image.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/long/Walnut_SCH_Long.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/long/Mahogany_SCH_Long.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Driftwood_SCH_Long.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/long/Dark_Oak_SCH_Long.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/long/Cedar_SCH_Long.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/long/Carbon_SCH_Long.png" : '';
    }
    else if (panelID == 5) {
      // stampped shaker shaker
      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/Modern_Woodgrain_Shaker.png" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/Classic_Woodgrain_Shaker.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/long/Walnut_Shaker_Long.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/long/Mahogany_Shaker_Long.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Driftwood_Shaker_Long.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/long/Dark_Oak_Shaker_Long.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/long/Cedar_Shaker_Long.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/long/Carbon_Shaker_Long.png" : '';
    }
    else if (panelID == 7) {
      // planks no or short window
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/short/Walnut_Planks_Short.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/short/Mahogany_Planks_Short.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/short/Driftwood_Planks_Short.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/short/Dark_Oak_Planks_Short.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/short/Cedar_Planks_Short.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/short/Carbon_Planks_Short.png" : '';
    }
    else if (panelID == 8 || panelID == 9) {
      // planks long window and planks oversized window
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/long/Walnut_Planks_Long.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/long/Mahogany_Planks_Long.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Driftwood_Planks_Long.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/long/Cedar_Planks_Long.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/long/Dark_Oak_Planks_Long.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/long/Carbon_Planks_Long.png" : '';
    }
    else if (panelID == 10) {
      // skyline flush short
      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/short/sf_modern_woodgrain_short.png" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/short/sf_classic_woodgrain_short.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/short/Walnut_SF_Short.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/short/Mahogany_SF_Short.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/short/Driftwood_SF_Short.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/short/Cedar_SF_Short.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/short/Dark_Oak_SF_Short.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/short/Carbon_SF_Short.png" : '';
    }
    else if (panelID == 11 || panelID == 12) {
      // skyline flush long and oversized window
      (selected_color_id == modernWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/sf_modern_woodgrain_long.png" : '';
      (selected_color_id == classicWoodgrain) ? repeatedImage = "assets/images/woodenimg/long/sf_classic_woodgrain_long.png" : '';
      (selected_color_id == walnut) ? repeatedImage = "assets/images/woodenimg/long/Walnut_SF_Long.png" : '';
      (selected_color_id == mahogany) ? repeatedImage = "assets/images/woodenimg/long/Mahogany_SF_Long.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Driftwood_SF_Long.png" : '';
      (selected_color_id == ceder) ? repeatedImage = "assets/images/woodenimg/long/Cedar_SF_Long.png" : '';
      (selected_color_id == darkOak) ? repeatedImage = "assets/images/woodenimg/long/Dark_Oak_SF_Long.png" : '';
      (selected_color_id == carbon) ? repeatedImage = "assets/images/woodenimg/long/Carbon_SF_Long.png" : '';
    }

    // safeway
    else if (panelID == 28 || panelID == 47) {
      (selected_color_id == oak) ? repeatedImage = "assets/images/woodenimg/short/Safeway_oak.png" : '';
      (selected_color_id == roosewood) ? repeatedImage = "assets/images/woodenimg/short/Safeway_Rose_Short_Panel.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/short/Safeway_driftwood_Short_Panel.png" : '';
    }
    else if (panelID == 29 || panelID == 48) {
      (selected_color_id == oak) ? repeatedImage = "assets/images/woodenimg/long/Safeway_Oak_Long_Panel.png" : '';
      (selected_color_id == roosewood) ? repeatedImage = "assets/images/woodenimg/long/Safeway_Rose_Long_Panel.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Safeway_driftwood_Long_Panel.png" : '';
    }
    else if (panelID == 30 || panelID == 49) {
      (selected_color_id == oak) ? repeatedImage = "assets/images/woodenimg/short/Safeway_SCH_Oak_Short_Panel.png" : '';
      (selected_color_id == roosewood) ? repeatedImage = "assets/images/woodenimg/short/Safeway_SCH_Rose_Short_Panel.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/short/Safeway_SCH_driftwood_Short_Panel.png" : '';
    }
    else if (panelID == 31 || panelID == 50) {
      (selected_color_id == oak) ? repeatedImage = "assets/images/woodenimg/long/Safeway_SCH_Oak_Long_Panel.png" : '';
      (selected_color_id == roosewood) ? repeatedImage = "assets/images/woodenimg/long/Safeway_SCH_Rose_Long_Panel.png" : '';
      (selected_color_id == driftWood) ? repeatedImage = "assets/images/woodenimg/long/Safeway_SCH_driftwood_Long_Panel.png" : '';
    }
    else if (panelID == 66) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey_Long.png" : '';
    }
    else if (panelID == 76) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_Flush_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey__Flush_Long.png" : '';
    } else if (panelID == 65 || panelID == 81 || panelID == 105) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/short/Dark_Walnut.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/short/Weathered_Grey_Short.png" : '';
    }
    else if (panelID == 90 || panelID == 114 || panelID == 74) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/Dark_Walnut_Moderno_Eco_Slim.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/Weathered_Grey__Moderno_Eco_Slim.png" : '';
    }
    else if (panelID == 82 || panelID == 106) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey_Long.png" : '';
    } else if (panelID == 83 || panelID == 107 || panelID == 67) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/short/Dark_Walnut_CS_Short.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/short/Weathered_Grey_CS_Short.png" : '';
    } else if (panelID == 84 || panelID == 108 || panelID == 68) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_CS_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey_CS_Long.png" : '';
    } else if (panelID == 85 || panelID == 109 || panelID == 69) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/Dark_Walnut_Xsmall.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/Weathered_Grey_Xsmall.png" : '';
    } else if (panelID == 86 || panelID == 110 || panelID == 70) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/short/Dark_Walnut_Flat_Short.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/short/Weathered_Grey__Flat_Short.png" : '';
    } else if (panelID == 87 || panelID == 111 || panelID == 71) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_Flat_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey__Flat_Long.png" : '';
    } else if (panelID == 88 || panelID == 112 || panelID == 72) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/short/Dark_Walnut_Moderno_Eco_Short.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/short/Weathered_Grey__Moderno_Eco_Short.png" : '';
    } else if (panelID == 89 || panelID == 113 || panelID == 73) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_Moderno_Eco_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey__Moderno_Eco_Long.png" : '';
    } else if (panelID == 94 || panelID == 118 || panelID == 78) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/Dark_Walnut_Slat_Two.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/Weathered_Grey_Slat_Two.png" : '';
    } else if (panelID == 95 || panelID == 119 || panelID == 79) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/Dark_Walnut_Slat_Four.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/Weathered_Grey_Slat_Four.png" : '';
    } else if (panelID == 91 || panelID == 115 || panelID == 75) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/short/Dark_Walnut_Flush_Short.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/short/Weathered_Grey__Flush_Short.png" : '';
    } else if (panelID == 92 || panelID == 116) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/long/Dark_Walnut_Flush_Long.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/long/Weathered_Grey__Flat_Long.png" : '';
    } else if (panelID == 93 || panelID == 117 || panelID == 77) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/Dark_Walnut_Flush_Slim.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/Weathered_Grey__Flush_Slim.png" : '';
    } else if (panelID == 96 || panelID == 120 || panelID == 80) {
      (selected_color_id == darkWalnut) ? repeatedImage = "assets/images/woodenimg/garga/Dark_Walnut_Vog.png" : '';
      (selected_color_id == weatheredGrey) ? repeatedImage = "assets/images/woodenimg/garga/Weathered_Grey_Vog.png" : '';
    }
    this.visualizationSelection['visualize_backSelectedImage'] = repeatedImage;
    // return repeatedImage;
  }

  generateWindowImagePath() {
    let color = this.doorColor;
    let windowType = this.doorWindowInsertSubCategory

    let white = [1, 'White'];
    let almond = [2, 'Almond'];
    let sandstone = [3, 'Sandstone'];
    let brown = [4, 'Brown'];
    let black = [5, 'Black'];
    let grey = [6, 'Gray'];
    let bronze = [7, 'Bronze'];
    let graphite = [8, 'Graphite'];
    let desertTan = [9, 'Desert Tan'];
    let evergreen = [10, 'Evergreen'];
    let modernWoodgrain = [13, 'modernWoodgrain'];
    let walnut = [14, 'walnut'];
    let mahogany = [15, 'mahogany'];
    let driftWood = [16, 'driftWood'];
    let ceder = [17, 'cedar'];
    let darkOak = [18, 'dark_Oak'];
    let carbon = [20, 'carbon'];
    let classicWoodgrain = [25, 'classicWoodgrain'];
    let gargaWhite = [32, '_White'];
    let gargaAlmond = [33, '_Almond'];
    let gargaSahara = [34, '_Sahara'];
    let gargaSandstone = [35, '_Sandstone'];
    let gargaTerrastone = [36, '_Terrastone'];
    let gargaBrown = [37, '_Brown'];
    let gargaBlackIce = [38, '_Black_Ice'];
    let gargaCharcoal = [39, '_Charcoal'];
    let gargaDarkWalnut = [40, '_Dark_Walnut'];
    let gargaWeatheredGrey = [41, '_Weathered_Grey'];

    // window type
    let plain = [1, 8, 17, 21, 22, 29, 66];
    let cascade = [2, 9, 23, 30, 38,];
    let stocktone = [3, 10, 24, 31, 39, 43, 54, 61];
    let prairai = [4, 11, 25, 32, 52, 58];
    let watertone = [5, 12, 26, 33, 55, 62];
    let Sherwood = [6, 13, 27, 34, 60];
    let Cathedral = [7, 28];
    let arched_stockton = [14, 35, 41];
    let LP_madison = [15, 36, 40, 44];
    let arched_madison = [16, 37, 42];
    let gargaCascade = [51, 57];
    let gargaplain = [50, 56];
    let gargaRichmond = [53, 59];
    let gargaDoubleStocktonArch = [63];
    let gargaRichmondArch = [64];

    let windowsizeType = Number(this.doorWindowInsertCategory);
    let windowurl;
    let window_type_name;

    // this is for short window
    let window_type_foldername;

    ([1, 6, 13, 32].includes(windowsizeType)) ? window_type_foldername = 'short' : '';
    ([2, 3, 7, 8, 9, 10, 14].includes(windowsizeType)) ? window_type_foldername = 'long' : '';
    ([15].includes(windowsizeType)) ? window_type_foldername = 'slim' : '';

    let windowTypeNumber = Number(windowType);

    (plain.includes(windowTypeNumber)) ? window_type_name = '_plain' : '';
    (cascade.includes(windowTypeNumber)) ? window_type_name = '_Casecade' : '';
    (stocktone.includes(windowTypeNumber)) ? window_type_name = '_Stockton' : '';
    (prairai.includes(windowTypeNumber)) ? window_type_name = '_Prairie' : '';
    (watertone.includes(windowTypeNumber)) ? window_type_name = '_Waterton' : '';
    (Sherwood.includes(windowTypeNumber)) ? window_type_name = '_Sherwood' : '';
    (Cathedral.includes(windowTypeNumber)) ? window_type_name = '_Cathedral' : '';
    (arched_stockton.includes(windowTypeNumber)) ? window_type_name = '_arched_stockton' : '';
    (LP_madison.includes(windowTypeNumber)) ? window_type_name = '_madison' : '';
    (arched_madison.includes(windowTypeNumber)) ? window_type_name = '_arched_madison' : '';
    (gargaCascade.includes(windowTypeNumber)) ? window_type_name = '_Casecades' : '';
    (gargaplain.includes(windowTypeNumber)) ? window_type_name = '_Plain' : '';
    (gargaRichmond.includes(windowTypeNumber)) ? window_type_name = '_Richmond' : '';
    (gargaDoubleStocktonArch.includes(windowTypeNumber)) ? window_type_name = '_Double_Stockton_Arch' : '';
    (gargaRichmondArch.includes(windowTypeNumber)) ? window_type_name = '_Richmond_Arch' : '';

    // this is commercial

    if (windowsizeType == 5 || windowsizeType == 4) {
      window_type_foldername = 'commercial';
      let comercialsize = this.doorWindowGlassCategory;
      (comercialsize == 7) ? window_type_name = '_24x6' : '';
      (comercialsize == 8) ? window_type_name = '_24x12' : '';
      (comercialsize == 9) ? window_type_name = '_34x16' : '';
    }

    let pannel;

    if (window_type_foldername === "short") {
      pannel = 'Short'
    } else if (window_type_foldername === "long") {
      pannel = 'Long'
    } else if (window_type_foldername === "slim") {
      window_type_name = ''
      pannel = 'Slim'
    }

    (color == white[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + white[1] + window_type_name + '.png' : '';
    (color == almond[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + almond[1] + window_type_name + '.png' : '';
    (color == sandstone[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + sandstone[1] + window_type_name + '.png' : '';
    (color == brown[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + brown[1] + window_type_name + '.png' : '';
    (color == black[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + black[1] + window_type_name + '.png' : '';
    (color == grey[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + grey[1] + window_type_name + '.png' : '';
    (color == bronze[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + bronze[1] + window_type_name + '.png' : '';
    (color == graphite[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + graphite[1] + window_type_name + '.png' : '';
    (color == desertTan[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + desertTan[1] + window_type_name + '.png' : '';
    (color == evergreen[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + evergreen[1] + window_type_name + '.png' : '';
    (color == modernWoodgrain[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + modernWoodgrain[1] + window_type_name + '.png' : '';
    (color == walnut[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + walnut[1] + window_type_name + '.png' : '';
    (color == mahogany[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + mahogany[1] + window_type_name + '.png' : '';
    (color == driftWood[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + driftWood[1] + window_type_name + '.png' : '';
    (color == ceder[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + ceder[1] + window_type_name + '.png' : '';
    (color == darkOak[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + darkOak[1] + window_type_name + '.png' : '';
    (color == carbon[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + carbon[1] + window_type_name + '.png' : '';
    (color == classicWoodgrain[0]) ? windowurl = 'assets/images/window/' + window_type_foldername + '/' + classicWoodgrain[1] + window_type_name + '.png' : '';
    (color == gargaWhite[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaWhite[1] + '.png' : '';
    (color == gargaAlmond[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaAlmond[1] + '.png' : '';
    (color == gargaSahara[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaSahara[1] + '.png' : '';
    (color == gargaSandstone[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaSandstone[1] + '.png' : '';
    (color == gargaTerrastone[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaTerrastone[1] + '.png' : '';
    (color == gargaBrown[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaBrown[1] + '.png' : '';
    (color == gargaBlackIce[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaBlackIce[1] + '.png' : '';
    (color == gargaCharcoal[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaCharcoal[1] + '.png' : '';
    (color == gargaDarkWalnut[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaDarkWalnut[1] + '.png' : '';
    (color == gargaWeatheredGrey[0]) ? windowurl = 'assets/images/window/garga/' + window_type_foldername + '/' + 'GA_' + pannel + window_type_name + gargaWeatheredGrey[1] + '.png' : '';

    let selectedFamily = this.doorSubCollection;

    if (selectedFamily == 10 || selectedFamily == 12) {
      return null;
    } else {
      return windowurl;
    }
  }

  // Select the window glass category
  selectWindowGlassCategory(item: any) {
    this.doorWindowGlassCategory = item?.factoryGlazeTypeId;
    this.getWindowGlassSubCategory(this.doorWindowGlassCategory);
  }

  // Select the window glass sub category
  selectWindowGlassSubCategory(item: any) {
    this.doorWindowGlassSubCategory = item?.factoryGlazeSizeId;
    this.visualizationSelection['visualize_backGlassImage'] = item?.fileRawPath;
    console.log("Click to glass", item);
    console.log("visualizationSelection", this.visualizationSelection);
    this.setVisualizeArrayValues();
  }

  // Select the window insert category
  selectWindowInsertCategory(item: any) {
    this.doorWindowInsertCategory = item?.doorInsulatedTypeId;
    this.getWindowInsertSubCategory(this.doorWindowInsertCategory);
  }

  // Select the window insert category
  selectWindowInsertSubCategory(item: any) {
    this.doorWindowInsertSubCategory = item?.doorInsulatedId;
    this.visualizationSelection['visualize_backWindowInsertImage'] = this.generateWindowImagePath();
    console.log("Click to insert", item);
    console.log("Select insert visualizationSelection", this.visualizationSelection);
    this.setVisualizeArrayValues();
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
      console.log('** Row ', this.doorModelList[0]?.lstDoorColor[0]?.noOfSectionDetail[0]);



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
  changeSpringCategory(event: any) {
    console.log("event.target.value", event.target.value)
    this.doorSpringCategory = event.target.value;
    this.getVisualizationSpringDetails();
  }

  doorStrutCategoryTypeList: any[] = [];
  doorStrutCategoryType!: number;
  // Get strut category listing
  getStrutCategoryTypes() {
    this.utilsService.getStrutCategoryTypes().subscribe((data: any) => {
      this.doorStrutCategoryTypeList = data?.payload;
      this.doorStrutCategoryType = this.doorStrutCategoryTypeList[0]?.sturtCategoryTypeId;
      this.strutType();
    }, (error) => {
      console.error('Error During door getStrutCategoryTypes :', error);
    })
  }

  // Click to struct category
  selectStrutCategoryType(item: any) {
    this.doorStrutCategoryType = item?.sturtCategoryTypeId;
    this.strutType();
  }

  selectStrutType(item : any) {
    this.doorStrutsType = item?.sturtCategoryId;
  }

  doorStrutsTypeList: any[] = [];
  doorStrutsType!: number;
  // Function to get strut details;
  strutType() {
    const payload = {
      sturtCategoryTypeId: this.doorStrutCategoryType,
      modelId: this.doorModel,
      doorHeight: String(this.doorHeightFt) + '.0',
      doorWidth: String(this.doorWidthFt) + '.0'
    }
    this.utilsService.strutType(payload).subscribe((data: any) => {
      this.doorStrutsTypeList = data?.payload;
      this.doorStrutsType = this.doorStrutsTypeList[0]?.sturtCategoryId;
    }, (error) => {
      console.error('Error During door strutType :', error);
    })
  }

  doorSealCategoryTypeList: any[] = [];
  doorSealCategoryType!: number;
  // Get strut category listing
  getDoorSealType() {
    this.utilsService.getDoorSealType().subscribe((data: any) => {
      this.doorSealCategoryTypeList = data?.payload;
      // this.doorSealCategoryType = this.doorStrutCategoryTypeList[0]?.sturtCategoryTypeId;
      this.strutType();
    }, (error) => {
      console.error('Error During door getDoorSealType :', error);
    })
  }

  // Function to be used for selection seal category
  selectSealCategoryType(item: any) {
    this.doorSealCategoryType = item?.doorSealTypeId;
    this.getDoorSealTypeCategory();
  }

  doorSealTypeCategoryList: any[] = [];
  doorSealTypeCategory: any;
  selectedSealCategory: any;

  getDoorSealTypeCategory() {
    const payload = {
      doorSealTypeId: this.doorSealCategoryType,
      doorHeight: String(this.doorHeightFt) + '.0',
      doorWidth: String(this.doorWidthFt) + '.0'
    }
    this.utilsService.getDoorSealTypeCategory(payload).subscribe((data: any) => {
      this.doorStrutsTypeList = data?.payload;
      this.doorStrutsType = this.doorStrutsTypeList[0]?.sturtCategoryId;
    }, (error) => {
      console.error('Error During door getDoorSealTypeCategory :', error);
    })
  }

  // Mitesh Code Start
   // ====== Dynamic Window Binding ( Row and Column )===== 

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
  //console.log('Col: ' + row + ' Row: ' + col + 'isChecked: ' + isChecked);
  this.getSelectedCheckboxCount();
  console.log('Count',this.getSelectedCheckboxCount())
}
getSelectedCheckboxCount(): number {
  this.checkboxSelectedCount = this.selectedBoxes.flat().filter(isChecked => isChecked).length;
  return this.checkboxSelectedCount;
}
updateGrid() {
  this.initializeGrid(); // Reinitialize grid when row/column values change
}

// To select all checkbox logic
toggleColumnSelection(col: number) {
  const allChecked = this.selectedBoxes.every(row => row[col]);
  this.selectedBoxes.forEach(row => row[col] = !allChecked);
  this.getSelectedCheckboxCount();
}

getBackgroundStyle() {
  if(this.bgColor === '--'){
    return { 'background-image': `url(${this.bgImage}) !important` }
  }
  else
  {
    return { 'background-color': this.bgColor }
  }
}

setVisualizeArrayValues(){
  
  if (this.visualizationSelection['visualize_row']){
    this.rowSize = this.visualizationSelection['visualize_row'];
  }
  if (this.visualizationSelection['visualize_column']){
    this.colSize = this.visualizationSelection['visualize_column'];
  }
  if (this.visualizationSelection['visualize_backSelectedColor']){
    if(this.visualizationSelection['visualize_backSelectedColor'] == '--'){
      this.bgImage = this.visualizationSelection['visualize_backSelectedImage'];
      this.bgColor = '--';
      // console.log('Mitesh IF Condition :::');
      // console.log(this.bgImage);
      // console.log(this.bgColor);
     }
    else{
      this.bgColor = this.visualizationSelection['visualize_backSelectedColor'];
      this.bgImage = '--';
    }

  }
  if (this.visualizationSelection['visualize_backSelectedImage']){
  }
  if (this.visualizationSelection['visualize_backRepeatImage']){
    this.repeatfilePath = this.visualizationSelection['visualize_backRepeatImage'].toLowerCase();
  }
  if (this.visualizationSelection['visualize_noOfSections']){

  }
  if (this.visualizationSelection['visualize_backGlassImage']){
    this.bgGlassImage = this.visualizationSelection['visualize_backGlassImage'].toLowerCase();
  }
  if (this.visualizationSelection['visualize_backWindowInsertImage']){
    this.bgWindowInsertImage = this.visualizationSelection['visualize_backWindowInsertImage'].toLowerCase();
  }
  
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
  console.log('bgWindowInsertImage', this.bgWindowInsertImage);
  console.log('repeatfilePath', this.repeatfilePath);
  // console.log('%%%%%%%%%%%%%%');
  // console.log(this.rowSize);
  // console.log(this.colSize);
  // console.log(this.bgColor);
  // console.log(this.repeatfilePath);

   this.initializeGrid();
  // console.log(this.bgColor == '--')
  // console.log('Final Image:',this.getBackgroundStyle());
 }
  // Mitesh Code End

}
