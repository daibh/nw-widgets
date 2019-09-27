import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private httpClient: HttpClient) { }

  getIndustrysWithParams(dtParams: IParam): Observable<ISearchResponse<Industry>> {
    let totalRecords = 0;
    let startIndex = 0;
    let size = 5;
    return this.httpClient.get<Industry[]>('/assets/data/industry.json')
      .pipe(
        // filter search
        map(data => data.filter(item => {
          let isSelected = !(dtParams && dtParams.q);
          if (isSelected) {
            return isSelected;
          }
          return item.name.toLowerCase().includes((dtParams.q || '').toLowerCase());
        })),
        tap((data) => {
          totalRecords = data ? data.length : 0;
        }),
        // filter paging
        map(data => data.filter((item: Industry, index: number) => {
          const page = dtParams.page && dtParams.page > 0 ? dtParams.page : 1;
          size = dtParams.size && dtParams.size > 0 ? dtParams.size : size;
          startIndex = (page - 1) * size;
          return index >= startIndex && index < startIndex + size;
        })),
        map(data => {
          console.log('getIndustrysWithParams', dtParams, data, totalRecords);
          return new SearchResponse<Industry>(totalRecords, data.length, startIndex, data, dtParams.q);
        })
      );
  }

}

export class IParam {
  constructor(
    public page?: number,
    public size?: number,
    public filter_status?: string,
    public q?: string,
    public sort?: any,
  ) {

  }
}

export interface ISearchResponse<T> {
  totalRecords: number;
  currentRecords: number;
  startIndex: number;
  items: T[];
  q: string;
}

export class SearchResponse<T> implements ISearchResponse<T> {
  constructor(
    public totalRecords: number,
    public currentRecords: number,
    public startIndex: number,
    public items: T[],
    public q: string
  ) {

  }
}

export class Industry {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public isActive?: boolean,
    public balance?: string,
    public picture?: string,
    public company?: string,
    public email?: string,
    public phone?: string,
    public address?: string,
  ) { }
}

