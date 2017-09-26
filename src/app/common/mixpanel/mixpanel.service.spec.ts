/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MixpanelService } from './mixpanel.service';

describe('MixpanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MixpanelService]
    });
  });

  it('should ...', inject([MixpanelService], (service: MixpanelService) => {
    expect(service).toBeTruthy();
  }));
});
