import { TestBed } from '@angular/core/testing';

import { EmailValidatorService } from './email-validator.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('EmailValidatorService', () => {
  let service: EmailValidatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailValidatorService]
    });
    service = TestBed.get(EmailValidatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
