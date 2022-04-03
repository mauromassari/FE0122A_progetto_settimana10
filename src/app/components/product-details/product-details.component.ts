import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/service/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  productSelected! : Product | any

  idProductSelectd!: number


  arrayCar!: Product[]


  constructor(private prodSrv: ProductsService, private router: ActivatedRoute) {
    this.arrayCar = this.prodSrv.getProductsInCart()
  }

  ngOnInit(): void {


    this.router.params.subscribe(params =>{
      const id = +params['id'];
      this.idProductSelectd = id
    })

    console.clear()
    console.log("STAI GUARDANDO I DETTAGLI DEL SEGUENTE PRODOTTO:")

    this.prodSrv.getProduct(this.idProductSelectd).subscribe((prodottoSelezionato) => {
      this.productSelected  = prodottoSelezionato;
      console.log(this.productSelected)
    }, (err) => {
      alert(err)
    })



  }

  aggiungiProdottoAlCarrello(){
    this.prodSrv.addProdInCart(this.productSelected)
    this.contatoriProdottiCarrello()

    console.clear()
    console.log("Hai appena aggiunto il seguente prodotto al carrello")
    console.log(this.productSelected)
  }

  contatoriProdottiCarrello(){
    this.prodSrv.conta();
  }


}


  /*
  aggiungi(){

    this.prodSrv.addPerson(this.productSelected).subscribe((prodottoSelezionato) => {
      this.productSelected  = prodottoSelezionato;
      console.log(this.productSelected)

    }, (err) => {
      alert(err)
    })

  }
  */



