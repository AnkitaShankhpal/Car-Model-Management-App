import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarModelManagementService {
  private apiUrl = 'https://localhost:7207'; // Backend API URL

  constructor(private http: HttpClient) {}

  getCarModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/CarModel/GetCarModels`); 
  }

  addCarModel(carModel: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/CarModel/AddCarModel`, carModel).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  // constructor() {}

  // // Mock data representing car models
  // private mockCarModels = [
  //   {
  //     id: 1,
  //     brand: 'Audi',
  //     class: 'A-Class',
  //     modelName: 'A3',
  //     modelCode: 'A3XYZ1234',
  //     description: 'A luxury compact car',
  //     features: 'Automatic, Sunroof, Leather seats',
  //     price: 30000,
  //     dateOfManufacturing: '2023-05-01',
  //     active: true,
  //     sortOrder: 1,
  //     imageName: 'audi.png',
  //   },
  //   {
  //     id: 2,
  //     brand: 'Jaguar',
  //     class: 'B-Class',
  //     modelName: 'XF',
  //     modelCode: 'XF1234ABCD',
  //     description: 'A luxury mid-size sedan',
  //     features: 'Turbo engine, Premium sound system',
  //     price: 50000,
  //     dateOfManufacturing: '2022-08-12',
  //     active: true,
  //     sortOrder: 2,
  //     imageName: 'jaguar.png',
  //   }
  // ];

  // // Fake service method to fetch car models
  // getCarModels(): Observable<any[]> {
  //   return of(this.mockCarModels);
  // }

  // // Fake service method to create a new car model
  // addCarModel(carModel: any): Observable<any> {
  //   // Push the new model to mock data (simulate creation)
  //   this.mockCarModels.push({
  //     ...carModel,
  //     id: this.mockCarModels.length + 1, // Simulate auto-incremented ID
  //     images: ['default.jpg'] // Add a default image for simplicity
  //   });

  //   return of({ success: true });
  // }


}
