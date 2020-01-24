import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Provider } from '../models/provider';
import { Product } from '../models/Product';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    protected UrlServiceV1: string = "https://localhost:5001/api/";

    getAll(): Observable<Product[]> {
        return this.http
            .get<Product[]>(this.UrlServiceV1 + "products")
            .pipe(
                catchError(this.serviceError));
    }

    registerAlternativeProduct(product: FormData): Observable<Product> {

        return this.http
            .post(this.UrlServiceV1 + 'products/add', product, this.GetHeaderFormData())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    registerProduct(product: Product): Observable<Product> {

        return this.http
            .post(this.UrlServiceV1 + 'products', product, this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    getProviders(): Observable<Provider[]> {
        return this.http
            .get<Provider[]>(this.UrlServiceV1 + 'providers')
            .pipe(
                catchError(this.serviceError)
            );
    }

    protected GetHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="product"'
            })
        };
    }

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {

            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(error);
        return throwError(error);
    }

}