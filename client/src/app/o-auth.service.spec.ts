import { TestBed } from '@angular/core/testing';

import { OAuthService } from './o-auth.service';

describe('OAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OAuthService = TestBed.get(OAuthService);
    expect(service).toBeTruthy();
  });
});
