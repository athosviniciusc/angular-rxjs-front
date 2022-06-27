import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators'
import { Acao, AcoesApi } from './modelo/acoes';
@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor( private httpClient: HttpClient) { }

  getAcoes( valor?: string ){
    const params = valor ?  new HttpParams().append('valor', valor) : undefined;

    return this.httpClient.get<AcoesApi>('http://localhost:3000/acoes', { params } ).pipe(
    pluck('payload'), //recebe um parametro string do objeto que você quer extrair, invés de utilizar 
                      // o map novamente você utiliza o pluck que é um operador proprio do rxjs
    map((acoes) => 
      acoes.sort((acaoA, acaoB) =>
      this.ordenaPorCodigo(acaoA, acaoB)
      ))
    );
  }

  private ordenaPorCodigo( acaoA: Acao, acaoB: Acao) {

    if(acaoA.codigo > acaoB.codigo) {
      return 1;
    } else if (acaoA.codigo < acaoB.codigo) {
      return -1
    } else {
      return 0;
    }
  }
}
