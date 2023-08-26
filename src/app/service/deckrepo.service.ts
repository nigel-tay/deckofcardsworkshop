import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckrepoService {
  deckUrl: string = "https://www.deckofcardsapi.com/api/deck/new/shuffle/";

  constructor(private httpClient: HttpClient) { }

  getNumberOfDecks(decknumber: number): Observable<Response>{
    let queryParams = new HttpParams()
      .set("deck_count", decknumber);

    return this.httpClient.get<Response>(this.deckUrl, { params: queryParams })
  }

  getCards(deckId: string, count: number): Observable<any> {
    let queryParams = new HttpParams()
      .set("count", count);
    let urlString = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/`;
    return this.httpClient.get<any>(urlString, { params: queryParams })
  }
}
