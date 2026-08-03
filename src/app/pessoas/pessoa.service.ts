import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  clientes: any[] = [];


  adicionar(cliente: any) {

    this.clientes.push(cliente);

  }


  listar() {

    return this.clientes;

  }


  excluir(id: number) {

    this.clientes = this.clientes.filter(
      cliente => cliente.id !== id
    );

  }

}
