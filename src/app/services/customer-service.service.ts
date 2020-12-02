import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Customer} from '../classes/customer-class';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private customersUrl = 'http://localhost:9000';
  /** GET customeres from the server */
  getCustomers(): Observable<Customer[]> {
    const url = `${this.customersUrl}/customers`;
    return this.http.get<Customer[]>(url)
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
  }

  /** GET customer by id. Will 404 if id not found */
  getCustomer(id: string): Observable<Customer> {
    const url = `${this.customersUrl}/customers/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }
  /* GET customeres whose name contains search term */
  searchCustomers(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      // if not search term, return empty customer array.
      return of([]);
    }
    return this.http.get<Customer[]>(`${this.customersUrl}/customers/search/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found customers matching "${term}"`) :
          this.log(`no customers matching "${term}"`)),
        catchError(this.handleError<Customer[]>('searchCustomers', []))
      );
  }
  /** POST: add a new customer to the server */
  addCustomer(customer: Customer): Observable<Customer> {
    const postUrl = `${this.customersUrl}/customers`;
    return this.http.post<Customer>(postUrl, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }
  /** PUT: update the customer on the server */
  updateCustomer(customer: Customer): Observable<any> {
    const putUrl = `${this.customersUrl}/customers/${customer.id}`;
    return this.http.put(putUrl, customer, this.httpOptions).pipe(
      tap(_ => this.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }
  /** DELETE: delete the customer from the server */
  deleteCustomer(customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a CustomerService message with the MessageService */
  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
