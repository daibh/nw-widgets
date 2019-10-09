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

  getPerson(id: any): Observable<IPerson> {
    return this.httpClient.get<IPerson>(`http://${environment.demoAPI}/persons/${id}`);
  }

  getPersonByNameAndEmail(param: {
    id: string
    name?: string,
    email?: string,
  }): Observable<IPerson[]> {
    let params = new HttpParams();
    Object.keys(param).forEach(key => params = params.set(key, param[key]));
    return this.httpClient.get<IPerson[]>(`http://${environment.demoAPI}/persons/unique/check`, { params });
  }

  createPerson(person: IPerson): Observable<any> {
    return this.httpClient.post<SearchResponse<IPerson>>(`http://${environment.demoAPI}/persons`, person);
  }

  updatePerson(person: IPerson): Observable<any> {
    return this.httpClient.put<SearchResponse<IPerson>>(`http://${environment.demoAPI}/persons`, person);
  }

}
