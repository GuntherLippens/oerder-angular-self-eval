import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Item } from '../classes/item-class';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private itemsUrl = 'http://localhost:9000';
  /** GET itemes from the server */
  getItems(): Observable<Item[]> {
    const url = `${this.itemsUrl}/items`;
    return this.http.get<Item[]>(url)
      .pipe(
        tap(_ => this.log('fetched items')),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: string): Observable<Item> {
    const url = `${this.itemsUrl}/items/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }
  /* GET itemes whose name contains search term */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty item array.
      return of([]);
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/items/search/?name=${term}`)
      .pipe(
      tap(x => x.length ?
        this.log(`found items matching "${term}"`) :
        this.log(`no items matching "${term}"`)),
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }
  /** POST: add a new item to the server */
  addItem(item: Item): Observable<Item> {
    const postUrl = `${this.itemsUrl}/items`;
    return this.http.post<Item>(postUrl, item, this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`added item w/ id=${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }
  /** PUT: update the item on the server */
  updateItem(item: Item): Observable<any> {
    const putUrl = `${this.itemsUrl}/items/${item.id}`;
    return this.http.put(putUrl, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  /** DELETE: delete the item from the server */
  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
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
  /** Log a ItemService message with the MessageService */
  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
