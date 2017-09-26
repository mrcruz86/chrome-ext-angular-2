/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PendoService } from './pendo.service';

describe('PendoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PendoService]
    });
  });

  it('should ...', inject([PendoService], (service: PendoService) => {
    expect(service).toBeTruthy();
  }));
});
