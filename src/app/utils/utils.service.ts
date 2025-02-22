import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private apiUrl = 'https://doorportal-001-site1.etempurl.com/v1/';

  constructor(private http: HttpClient) { }

  // Function to be used authenticate the user
  authentication(): Observable<any> {
    const payload = { "userName": "sap.dhaval@gmail.com", "password": "Tdhaval@74" }
    return this.http.post(this.apiUrl + 'Account/Authenticate', payload);
  }

  // Function to be used fot setting login user details
  setLocalStorage(userDetails: any) {
    localStorage.setItem('loginUser', JSON.stringify(userDetails));
  }

  // Function to be used getting login user details
  getLoginUser() {
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
      return JSON.parse(loginUser);
    }
  }

  // Function to be used for getting login user token
  getLoginUserToken() {
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
      const data = JSON.parse(loginUser);
      return data?.access_token
    }
  }

  // Function to be used for getting door company
  getDoorCompany() {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + 'DoorCompany/DoorCompany', { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting door types
  getTypeOfDoors() {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + 'DoorType/DoorType', { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting collections
  getDoorCollection(doorType: number, doorCompany: number) {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `DoorCollection/DoorCollectionByTypeCompanyId?DoorTypeId=${doorType}&DoorCompanyId=${doorCompany}`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting door collection family
  getDoorSubCollection(doorCollection: number) {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `DoorSubCollection/GetDoorCollectionListById?DoorCollectionId=${doorCollection}`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting door panels
  getDoorPanels(doorSubCollection: number) {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `DoorSubCollectionPanel/GetBySubCollectionId?SubCollectionId=${doorSubCollection}`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting model and based on model get color listing
  getVisualizationModel(payload: any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationModel`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting door angle
  getDoorPerforatedAngle(doorSubCollection: number) {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `DoorSubCollectionPanel/GetBySubCollectionId?SubCollectionId=${doorSubCollection}`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting window glass category
  getWindowGlassCategory(doorModel: number) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationGlazingType?DoorModelId=${doorModel}`, {}, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting window glass sub category
  getWindowGlassSubCategory(glazingTypeId: number) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationGlazingByTypeId?GlazingTypeId=${glazingTypeId}`, {}, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting window insert category
  getWindowInsertCategory(doorModel: number) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationInsertsType?DoorModelId=${doorModel}`, {}, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting window insert sub category
  getWindowInsertSubCategory(insertId: number) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationInsertsTypeId?InsulatedTypeId=${insertId}`, {}, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting sprint type
  getSpringCategoryType() {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `SpringCategoryType/SpringCategoryType`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting sprint
  getSpringCategory(springTypeId: number) {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `SpringCategory/SpringCategoryTypeId?SpringCategoryTypeId=${springTypeId}`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting sprint details
  getVisualizationSpringDetails(payload: any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationSpringDetails`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting strut categories
  getStrutCategoryTypes() {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `SturtCategoryType/StrutCategoryTypes`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting strut types
  strutType(payload: any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationSturtPrice`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Function to be used for getting seal categories
  getDoorSealType() {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `DoorSealType/DoorSealType`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }
  getDoorSealTypeCategory(payload: any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationSealCategory`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  // Track APIs
  getVisulizationTrackType(doorType: number) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationTrackType?DoorTypeId=${doorType}`, {}, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  getVisulizationTrackPrice(payload : any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationTrackPrice`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  getVisulizationUpgradeTrackPrice(payload : any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationUpgradeTrackPrice`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  getVisulizationPriceLHR(payload : any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationPriceLHR`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  getVisulizationPriceRoofPitch(payload : any) {
    const token = this.getLoginUserToken();
    return this.http.post(this.apiUrl + `DoorVisulization/GetVisulizationPriceRoofPitch`, payload, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }

  getDoorLock() {
    const token = this.getLoginUserToken();
    return this.http.get(this.apiUrl + `DoorLock/DoorLock`, { headers: { 'Accept': 'application/json', authorization: `Bearer ${token}` } });
  }
}
