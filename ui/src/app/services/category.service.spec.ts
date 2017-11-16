import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [CategoryService]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
