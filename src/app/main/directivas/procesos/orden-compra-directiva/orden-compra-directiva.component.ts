import { AdItem } from '../../ad-item';
import { AdComponent } from '../../ad.component';
import { DirectivaDirective } from './directiva.directive';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-orden-compra-directiva',
  /*styles: [`
    div {
      margin-bottom:2px;
      background-color: aqua;
  }
  `],
  template :`<div appDirectiva> </div>`*/
  templateUrl: './orden-compra-directiva.component.html',
  styleUrls: ['./orden-compra-directiva.component.scss']
})

export class OrdenCompraDirectivaComponent implements OnInit {

  @Input() ads: AdItem[] = [];
  //@Input() compraTemplate:TemplateRef<Object>
  @ViewChild(DirectivaDirective, {static: true}) appDirectiva!: DirectivaDirective;

  constructor() { }
 
  ngOnInit(): void {
    this.loadComponent();
  }
  
  loadComponent() {
    const viewContainerRef = this.appDirectiva.viewContainerRef;
    for (let index = 0; index < this.ads.length; index++) {
      const adItem = this.ads[index];
      const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
      componentRef.instance.data = adItem.data;
    }
  }
}
