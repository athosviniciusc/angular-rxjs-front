import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from '../acoes/modelo/acoes'
import { AcoesService } from '../acoes/acoes.service'
import { merge, Subscription } from 'rxjs';
import { debounceTime, tap, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  load = this.acoesService.getAcoes();
  filtroDigitado = this.acoesInput.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.lenght >= 3 || !valorDigitado.lenght),
    distinctUntilChanged(), //verifica se o ultimo valor digitado é o mesmo, isso é interessante pq evita duplicidade de requisição
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  )
  acoes$  =  merge(this.load, this.filtroDigitado);

  constructor(private acoesService: AcoesService) {}

}
