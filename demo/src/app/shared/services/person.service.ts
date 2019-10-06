import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IPerson } from '../models/person.model';
import { SearchResponse, IParam, ISearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) { }

  getPersons(dtParams: IParam): Observable<ISearchResponse<IPerson>> {
    let params = new HttpParams();
    Object.keys(dtParams).forEach(key => params = params.set(key, dtParams[key]));
    return this.httpClient.get<SearchResponse<IPerson>>(`http://${environment.demoAPI}/persons`, { params });
  }

}
