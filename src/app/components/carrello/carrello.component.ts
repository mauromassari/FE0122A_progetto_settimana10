import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/service/products.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {

  productsInCarrello!: Product[]
  totaleCarrello: number = 0
  prodottoRimosso!: Product

  constructor( private prodSrv: ProductsService) {
    this.productsInCarrello = this.prodSrv.getProductsInCart()
  }

  ngOnInit(): void {

    var carrello = this.productsInCarrello

    //carrello.forEach((prodotto)=>{
    //  this.totaleCarrelo += prodotto.price})

    var total = 0;
    for (var i=0; i < this.productsInCarrello.length; i++){
    total += this.productsInCarrello[i].price;}
    this.totaleCarrello = total

    console.clear()
    console.log("IL TUO CARRELLO:")
    console.table(carrello)

  }

  rimuoviProd(id: number){
    this.prodSrv.removeProdToCart(id)

    this.productsInCarrello.find(prodRemoved =>{
      prodRemoved.id == id
      return this.prodottoRimosso = prodRemoved
    })

    var total = 0;
    for (var i=0; i < this.productsInCarrello.length; i++){
    total += this.productsInCarrello[i].price;}
    this.totaleCarrello = total

    console.clear()
    console.log("IL TUO CARRELLO AGGIORNATO:")
    console.table(this.productsInCarrello)
  }

  /*
  submit(form: NgForm){
    this.productsInCarrello = []

    console.log(`Grazie per il tuo ordine, ${form.value.nome} ${form.value.cognome}`)
    console.log(form.value);

    form.resetForm()
  }
  */

  logIn(form: NgForm){
    this.productsInCarrello = []
    this.totaleCarrello = 0
    this.prodSrv.submit(form)
    form.resetForm()
  }

}


