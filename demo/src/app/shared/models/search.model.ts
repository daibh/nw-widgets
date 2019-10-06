export class IParam {
    constructor(
        public page?: number,
        public size?: number,
        public q?: string,
        public sort?: any,
    ) { }
}

export interface ISearchResponse<T> {
    totalRecords: number;
    startIndex: number;
    items: T[];
    q: string;
}

export class SearchResponse<T> implements ISearchResponse<T> {
    constructor(
        public totalRecords: number,
        public startIndex: number,
        public items: T[],
        public q: string
    ) { }
}