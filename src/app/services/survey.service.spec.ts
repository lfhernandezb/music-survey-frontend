import { TestBed } from '@angular/core/testing';

import { SurveyService } from './survey.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyService]
    });
    service = TestBed.inject(SurveyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    // Test case to check that the service method getData() returns the expected data
    it('should return expected data', () => {
      const mockData = {idEncuesta: 1, correo: 'a@b.cl', idEstiloMusical: 2};

      // Call the service method
      service.getByEmail('a@b.cl').subscribe(data => {
        // Expect the data to be equal to the mock data
        expect(data).toEqual(mockData);
      });

      // Expect a GET request to the specified url
      const req = httpTestingController.expectOne(environment.surveyApiUrl+'/api/surveys/param?email=a@b.cl');
      // Expect the request to be a GET request
      expect(req.request.method).toEqual('GET');
      // Respond to the request with the mock data
      req.flush(mockData);
      // Verify that there are no outstanding requests
      httpTestingController.verify();
    });

});
