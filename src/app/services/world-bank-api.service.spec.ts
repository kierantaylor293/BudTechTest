import { TestBed } from '@angular/core/testing';
import {  HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { WorldBankAPIService } from './world-bank-api.service';
import { WorldBankCountryAPI } from '../models/countryDetail';

describe('WorldBankAPIService', () => {



  let service: WorldBankAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientModule],
          providers: [WorldBankAPIService,HttpTestingController]
      });
      service = TestBed.get(WorldBankAPIService);
      httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    const service: WorldBankAPIService = TestBed.get(WorldBankAPIService);
    expect(service).toBeTruthy();
  });
  

  it('should return a WorldBankCountryAPI with correct details', (done) => {

    const rootURL = "http://api.worldbank.org/v2/country/?format=json"
    service.makeInitialCallForAPIDetails().subscribe((apiDetails: WorldBankCountryAPI) => {
        
        expect(apiDetails[0].total).toBeGreaterThanOrEqual(200);
        expect(apiDetails[1].length).toEqual(50);
        done();
    });
    });


    it('should return page 5 of Country list', (done) => {

      const rootURL = "http://api.worldbank.org/v2/country/?format=json"
      service.getCountryDetailPage(5).subscribe((apiDetails: WorldBankCountryAPI) => {
          
          expect(apiDetails[0].page).toEqual(5);
          expect(apiDetails[1].length).toEqual(50);
          done();
      });
    });



  
});
