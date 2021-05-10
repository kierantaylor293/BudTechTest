import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIDetail, CountryDetail } from '../models/countryDetail';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldBankAPIService {

  countryDetailList: CountryDetail[] = [];



  constructor(
    private http: HttpClient
  ) { }


    getWorldBankCountryList() {
      this.makeInitialCallForAPIDetails()
      .subscribe((response: [APIDetail, CountryDetail]) => {
        this.loopThroughAPIpages(response[0]);
        }, error => {
          console.log(error);
        }
        )
    }

    makeInitialCallForAPIDetails(): Observable<Object> {
      return this.http.get<Observable<Object>>("http://api.worldbank.org/v2/country/?format=json")
    }





  loopThroughAPIpages(apiDetail: APIDetail) {
    
    for(let apiPage = 1; apiPage <= apiDetail.pages; apiPage++) {
      this.applyCountryDetailPageToList(apiPage);
    }
    
  }

  applyCountryDetailPageToList(apiPage: number) {
    this.getCountryDetailPage(apiPage)
    .subscribe((response: [APIDetail, CountryDetail]) => {
      this.countryDetailList = this.countryDetailList.concat(response[1]);
    }, error => {
      console.log(error);
    }
    )
  }


  getCountryDetailPage(pageNumber: number) {
    return this.http.get("http://api.worldbank.org/v2/country/?format=json&page=" + pageNumber);
  }

}
