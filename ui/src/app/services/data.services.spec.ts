import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DataService } from './data.services';
import { ServiceError, ServiceResultCode } from './serviceResult';
import { Asset } from './../asset/asset';

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

  it('should has CRUD methods - we just say its CGUDP',  inject([DataService], (service: DataService) => {
    expect(service.createAsset).toBeDefined();
    expect(service.getAsset).toBeDefined();
    expect(service.updateAsset).toBeDefined();
    expect(service.deleteAsset).toBeDefined();
    expect(service.patchAsset).toBeDefined();
  }));

  it('should throw exception if create asset called and asset is NULL or undefined', inject([DataService], (service: DataService) => {
    expect(function() { service.createAsset(null); }).toThrowError(ServiceError);
    expect(function() { service.createAsset(undefined); }).toThrowError(ServiceError);
  }));

  it('should throw exception if update asset called and asset is NULL or undefined', inject([DataService], (service: DataService) => {
      expect(function() { service.updateAsset(null); }).toThrowError(ServiceError);
      expect(function() { service.updateAsset(undefined); }).toThrowError(ServiceError);
  }));

  it('should throw exception if delete asset called and asset is NULL or undefined', inject([DataService], (service: DataService) => {
    expect(function() { service.deleteAsset(null); }).toThrowError(ServiceError);
    expect(function() { service.deleteAsset(undefined); }).toThrowError(ServiceError);
  }));

  it('should throw exception if patch asset called and asset is NULL or undefined', inject([DataService], (service: DataService) => {
    expect(function() { service.patchAsset(null); }).toThrowError(ServiceError);
    expect(function() { service.patchAsset(undefined); }).toThrowError(ServiceError);
  }));

  it('should throw ...', inject([DataService], (service: DataService) => {
    const ass: Asset = new Asset('test', '12345677', '12345678', '11/11/1111', '', '');

    expect(function() { service.patchAsset(null); }).toThrowError(ServiceError);
    expect(function() { service.patchAsset(undefined); }).toThrowError(ServiceError);
  }));


});
