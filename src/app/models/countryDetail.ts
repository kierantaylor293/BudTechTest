export interface WorldBankCountryAPI {
    apiDetail: APIDetail
    countryDetailArray: CountryDetail[]
}

export interface APIDetail {
    page: number
    pages: number
    per_page: string
    total: number
}


export interface CountryDetail {
    id: string
    name: string
    region: string
    adminregion: string
    incomeLevel: string
    lendingType: string
    capitalCity: string
    longitude: string
    latitude: string
}