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
}
