import { TestBed } from '@angular/core/testing';

import { MusicStyleService } from './music-style.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('MusicStyleService', () => {
  let service: MusicStyleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicStyleService]
    });
    service = TestBed.get(MusicStyleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case to check that the service method getData() returns the expected data
  it('should return expected data', () => {
    const mockData = [{idEstiloMusical: 1, estilo: 'Rock'}];

    // Call the service method
    service.getAllEstiloMusical().subscribe(data => {
      // Expect the data to be equal to the mock data
      expect(data).toEqual(mockData);
    });

    // Expect a GET request to the specified url
    const req = httpTestingController.expectOne(environment.musicStyleApiUrl+'/api/musicstyles/all');
    // Expect the request to be a GET request
    expect(req.request.method).toEqual('GET');
    // Respond to the request with the mock data
    req.flush(mockData);
    // Verify that there are no outstanding requests
    httpTestingController.verify();
  });
});
