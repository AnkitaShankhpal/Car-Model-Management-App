import { TestBed } from '@angular/core/testing';

import { CarModelManagementService } from './car-model-management.service';

describe('CarModelManagementService', () => {
  let service: CarModelManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarModelManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
