import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../utils/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-door-master-quote',
  imports: [
    CommonModule,
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './door-master-quote.component.html',
  styleUrl: './door-master-quote.component.css'
})
export class DoorMasterQuoteComponent implements OnInit {
  token!: string;
  id: string | null = null;
  quotationData: any;
  doorQuoteListingData: any[] = [];
  sectionListingData: any[] = [];
  partsListingData: any[] = [];

  constructor(
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.queryParamMap.get('quoteId'); // Get 'id' from query params
    console.log(this.id);
  }

  ngOnInit(): void {
    this.resellerDetailedQuotationAllByQuotationId();
  }
  resellerDetailedQuotationAllByQuotationId() {
    this.utilsService.resellerDetailedQuotationAllByQuotationId(this.id).subscribe((data: any) => {
      const productDetails: any = [];

      if (data?.payload?.length > 0) {
        if (data?.payload?.length > 1) {
          data?.payload?.map((details: any) => {
            // laborCost = Number(laborCost) + Number(details?.itemLabour);
            const product = details?.lstQuotationItemDetails;
            product?.map((productData: any) => {
              productDetails.push(productData);
            });
          });

          data.payload[0].lstQuotationItemDetails = productDetails;
        }
      }

      this.quotationData = data.payload[0];
      this.doorQuoteListingData = data.payload[0].lstQuotationItemDetails?.filter((data: any) => data?.quotationFor == 'SECTION_DOOR');
      this.sectionListingData = data.payload[0].lstQuotationItemDetails?.filter((data: any) => data?.quotationFor == 'SECTION_ONLY');
      this.partsListingData = data.payload[0].lstQuotationItemDetails?.filter((data: any) => data?.quotationFor == 'MISCELLANEOUSPARTS');

      console.log("this.quotationListingData", this.quotationData, this.doorQuoteListingData);
    })
  }

  generateSealData(inputString: any, qty: any) {
    // const sealDescription = setSealData(item?.first_row, item?.qty);
    const dividedString = inputString.split(":");
    const firstString = dividedString[0];
    const heightWidthString = dividedString[1]?.split(",");

    let generatedString: any;
    let quantity = 0;
    heightWidthString?.map((value: any, index: any) => {
      if (index == 0) {
        generatedString = firstString + value + ' x ' + String(qty);
      } else {
        generatedString = generatedString + firstString + value + ' x ' + String(qty);
      }
      if (heightWidthString[index + 1]) {
        generatedString = generatedString + ",";
      }
      const valueQuantity = value?.split("-");
      quantity = quantity + Number(valueQuantity[1]?.split("'")[0]);
    });
    return { generatedString, quantity };
  }
}
