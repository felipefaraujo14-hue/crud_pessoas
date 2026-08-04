import { Injectable } from '@angular/core';

// Diz ao Angular que essa classe é um serviço.
@Injectable({
  providedIn: 'root'
})

//amazenamento local e a comunicacao entre os componen
export class PessoaService {

  private chave = 'clientes';

  adicionar(cliente: any) {
    const clientes = this.listar();

    clientes.push(cliente);

    //salva o array atualizado no local
    localStorage.setItem(
      this.chave,
      JSON.stringify(clientes)
    );
  }

  listar(): any[] {

    const dados = localStorage.getItem(this.chave);

    
    return dados ? JSON.parse(dados) : [];
  }

  //busca o cliente pelo id
  buscarPorId(id: number) {
    const clientes = this.listar();

    return clientes.find(
      (cliente: any) => cliente.id === id
    );
  }

  atualizar(clienteAtualizado: any) {
    const clientes = this.listar();

      // Procura a posição do cliente dentro do array.
    const index = clientes.findIndex(
      (cliente: any) => cliente.id === clienteAtualizado.id
    );
  // Verifica se encontrou o cliente e o-1 caso nao encontre
    if (index !== -1) {
      clientes[index] = clienteAtualizado;

        // Salva novamente os dados atualizados no LocalStorage.
      localStorage.setItem(
        this.chave,
        JSON.stringify(clientes)
      );
    }
  }

  excluir(id: number) {
    const clientes = this.listar();

     // Cria um novo array apenas com os clientes  que possuem id diferente do que será excluído.
    const filtrados = clientes.filter(
      (cliente: any) => cliente.id !== id
    );

     // Salva o novo array sem o cliente removido.
    localStorage.setItem(
      this.chave,
      JSON.stringify(filtrados)
    );
  }
}