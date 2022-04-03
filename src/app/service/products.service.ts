import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

import { Subject, throwError } from 'rxjs'; //throw emette errori
import { catchError } from 'rxjs/operators'; //operatore che interecetta errori

import { NgForm } from '@angular/forms';

//import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = 'http://localhost:4201/';
  baseUrlProduct = 'http://localhost:4201/products/'

  //baseUrlProduct1 = `${this.baseUrl}/products` e `${this.baseUrl}/products/${id}`-> NON FUNZIONA NEL GET

    //per chiamare l'elenco prodotti : ${this.baseUrl}/products
    //per chiamare il dettaglio prodotto : ${this.baseUrl}/products/${id}
  //

  public productsInCart: Product[] = []


  //PER GESTIRE IL NUMERO DEI PRODOTTI NEL CARRELLO PRESENTE NELLA NAVBAR
  sub = new Subject<number>();
    // emette un  num che gestirà il counter
    // subjet è l'observable che fa il multitasking

  counter = 0; // num dei mi piace delle foto favorite


  constructor(private http: HttpClient) { }


  // CHIAMATA FAKE API
  get(){
    return this.http.get<Product[]>(this.baseUrlProduct).pipe(catchError(err => {
      return throwError(this.getErrorMess(err.status));
    }))
  }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrlProduct + id).pipe(catchError(err => {
      return throwError(this.getErrorMess(err.status));
    }))
  }


  // GESTIONE COMPONENT CARRELLO
  getProductsInCart(){
    return this.productsInCart
  }

  addProdInCart(prod: Product){
    this.productsInCart.push(prod)
  }

  removeProdToCart(idProd: number){
    this.productsInCart.splice(idProd,1)
    this.contaMeno()
  }


  // CONTATORE (subject) CARRELLO NAVBAR
  conta(){
    this.counter++;
    this.sub.next(this.counter);
  }

  contaMeno(){
    this.counter--;
    this.sub.next(this.counter);
  }

  azzerraConta(){
    this.counter = 0;
    this.sub.next(this.counter);
  }


  // FORM
  submit(form: NgForm){
    this.azzerraConta()

    console.log(`Grazie per il tuo ordine, ${form.value.nome} ${form.value.cognome}`)
    console.log(form.value);

  }


  //GESTIONE ERRORI
  private getErrorMess(status:number){
    let mess = '';
    switch (status){
      case 404:
        mess = 'Risorsa non trovata';
        break;
        case 500:
          mess = 'Errore interno del server';
          break;
          default:
            mess = 'Qualcosa non va';
            break;
          }
          return mess
        }

        /*
        addPerson(product:Product): Observable<any> {
          const headers = { 'content-type': 'application/json'}
          //const body=JSON.stringify(product);
          console.log(headers)
          return this.http.post(this.baseUrlProduct, headers,{'headers':headers}).pipe(catchError(err => {
            return throwError(this.getErrorMess(err.status));
          }))
        }

        addProd(prod: Product){
          return this.http.post(this.baseUrlProduct,prod).pipe(catchError(err => {
            return throwError(this.getErrorMess(err.status));
          }))
        }

        */
}
