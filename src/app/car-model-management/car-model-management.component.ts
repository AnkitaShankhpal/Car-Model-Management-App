import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarModelManagementService } from '../services/car-model-management.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-car-model-management',
  templateUrl: './car-model-management.component.html',
  styleUrls: ['./car-model-management.component.css']
})
export class CarModelManagementComponent implements OnInit {
  carModelForm!: FormGroup;
  carModels: any[] = [];
  brands = ['Audi', 'Jaguar', 'Land Rover', 'Renault'];
  classes = ['A-Class', 'B-Class', 'C-Class'];
  imageFile!: File; // Store the image file

  constructor(
    private fb: FormBuilder,
    private carModelService: CarModelManagementService,
    private notificationService: NotificationService
  ) {
    this.carModelForm = this.fb.group({
      brand: ['', Validators.required],
      class: ['', Validators.required],
      modelName: ['', Validators.required],
      modelCode: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,10}$')]], 
      description: ['', Validators.required],
      features: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      dateOfManufacturing: ['', Validators.required],
      active: [false],
      sortOrder: ['', Validators.required],
      images: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCarModels();
  }

  loadCarModels(): void {
    this.carModelService.getCarModels().subscribe(
      (data: any) => {
        this.carModels = data;
      },
      (error: any) => {
        this.notificationService.showError('Failed to load car models');
      }
    );
  }

  onSubmit(): void {
    if (this.carModelForm.valid && this.imageFile) {
      const formData = new FormData();
      formData.append('image', this.imageFile); // Add the image file to the FormData
      formData.append('brand', this.carModelForm.value.brand);
      formData.append('class', this.carModelForm.value.class);
      formData.append('modelName', this.carModelForm.value.modelName);
      formData.append('modelCode', this.carModelForm.value.modelCode);
      formData.append('description', this.carModelForm.value.description);
      formData.append('features', this.carModelForm.value.features);
      formData.append('price', this.carModelForm.value.price);
      formData.append('dateOfManufacturing', this.carModelForm.value.dateOfManufacturing);
      formData.append('active', this.carModelForm.value.active);
      formData.append('sortOrder', this.carModelForm.value.sortOrder);

      this.carModelService.addCarModel(formData).subscribe(
        (data: any) => {
          this.notificationService.showSuccess('Car model added successfully!');
          this.loadCarModels();
          this.carModelForm.reset();
        },
        (error: any) => {
          this.notificationService.showError('Failed to add car model');
        }
      );
    } else {
      this.notificationService.showError('Please fill out the form and upload an image!');
    }
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0]; // Store the file for uploading
      this.carModelForm.get('images')?.setValue(this.imageFile); // Update the form control
    }
  }

  getImageUrl(base64ImageData: string): string {
    if (!base64ImageData) {
      return './assets/default-image.png'; // fallback image if no image is provided
    }
    
    // Assuming the base64 image data is a valid image (e.g., png or jpeg)
    return `data:image/jpeg;base64,${base64ImageData}`;
  }
  

}
