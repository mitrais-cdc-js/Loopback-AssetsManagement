import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DataService } from './data.services';

describe('Data Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ DataService ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should has CRUD methods - we just say its CGUD',  inject([DataService], (service: DataService) => {
    expect(service.createAsset).toBeDefined();
    expect(service.getAsset).toBeDefined();
    expect(service.updateAsset).toBeDefined();
    expect(service.deleteAsset).toBeDefined();
  }));

  it('should return one asset object if it exist', inject([DataService], (service: DataService) => {
      expect(service.updateAsset(null)).toThrowError(TypeError);
  }));

});
