import { AfterViewInit, Component } from '@angular/core';
import { WorldBankAPIService } from './services/world-bank-api.service';

import {Observable, OperatorFunction} from 'rxjs';
import { CountryDetail } from './models/countryDetail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WorldBankAPIService]
})
export class AppComponent {
  title = 'KieranTaylorBudTechTest';
  private isosearch: string;
  private shouldShowInvalidISOWarning: boolean = false;

  constructor(
    private worldBankService: WorldBankAPIService
  ) {
    this.getCountryList();
  }

  
  private countryList: CountryDetail[] = [];



  onISOsearchKeyup() {

    this.countryList = this.worldBankService.countryDetailList.filter(
      country => country.id.toLowerCase().indexOf(this.isosearch.toLowerCase()) > -1
    )

    if(this.countryList.length < 1 && this.isosearch.length > 0) {
      this.shouldShowInvalidISOWarning = true;
    } else {
      this.shouldShowInvalidISOWarning = false;
    }
  }






    
  getCountryList() {
    this.worldBankService.getWorldBankCountryList();
    }

}
