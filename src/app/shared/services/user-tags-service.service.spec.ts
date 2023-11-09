import { TestBed } from '@angular/core/testing';

import { UserTagsServiceService } from './user-tags-service.service';

describe('UserTagsServiceService', () => {
  let service: UserTagsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTagsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
