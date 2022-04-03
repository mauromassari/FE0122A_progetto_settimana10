import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/service/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prodottiDaStamp: Product[] | undefined;

  constructor(private prodSrv: ProductsService) { }

  ngOnInit(): void{
    this.prodSrv.get().subscribe((prodInJson) => {
      this.prodottiDaStamp = prodInJson;

      console.clear()
      console.log("PRODOTTI DISPONIBILI")
      console.table(this.prodottiDaStamp)

    }, (err) => {
      alert(err)
    })

  }

}
