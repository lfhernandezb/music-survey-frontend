import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('ScoreService', () => {
  let service: ScoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScoreService]
    });
    service = TestBed.inject(ScoreService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    // Test case to check that the service method getData() returns the expected data
    it('should return expected data', () => {
      const mockData = [{musicStyle: 'Rock', score: 100}];

      // Call the service method
      service.getScore().subscribe(data => {
        // Expect the data to be equal to the mock data
        expect(data).toEqual(mockData);
      });

      // Expect a GET request to the specified url
      const req = httpTestingController.expectOne(environment.scoreStyleApiUrl+'/api/scores/all');
      // Expect the request to be a GET request
      expect(req.request.method).toEqual('GET');
      // Respond to the request with the mock data
      req.flush(mockData);
      // Verify that there are no outstanding requests
      httpTestingController.verify();
    });

});
