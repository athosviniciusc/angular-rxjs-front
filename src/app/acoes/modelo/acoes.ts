export interface Acoes extends Array<Acao> {

}

export interface Acao {
    id: number;
    codigo: string;
    descrocao: string;
    preco: number;
}

export interface AcoesApi{
    payload: Acoes;
}