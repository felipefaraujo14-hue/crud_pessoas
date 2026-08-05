import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Diz ao Angular que essa classe é um serviço.
@Injectable({
  providedIn: 'root'
})

// Armazenamento local e comunicação entre os componentes
export class PessoaService {

  private chave = 'clientes';

  // URL da API do IBGE
  private apiIBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  // ===========================
  // LOCAL STORAGE
  // ===========================

  adicionar(cliente: any) {
    const clientes = this.listar();

    clientes.push(cliente);

    localStorage.setItem(
      this.chave,
      JSON.stringify(clientes)
    );
  }

  listar(): any[] {
    const dados = localStorage.getItem(this.chave);
    return dados ? JSON.parse(dados) : [];
  }

  buscarPorId(id: number) {
    const clientes = this.listar();

    return clientes.find(
      (cliente: any) => cliente.id === id
    );
  }

  atualizar(clienteAtualizado: any) {
    const clientes = this.listar();

    const index = clientes.findIndex(
      (cliente: any) => cliente.id === clienteAtualizado.id
    );

    if (index !== -1) {
      clientes[index] = clienteAtualizado;

      localStorage.setItem(
        this.chave,
        JSON.stringify(clientes)
      );
    }
  }

  excluir(id: number) {
    const clientes = this.listar();

    const filtrados = clientes.filter(
      (cliente: any) => cliente.id !== id
    );

    localStorage.setItem(
      this.chave,
      JSON.stringify(filtrados)
    );
  }


//Api do ibge
  // Lista todos os estados
  listarEstados(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiIBGE}/estados?orderBy=nome`
    );
  }

  // Lista municípios de um estado
  listarMunicipios(uf: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiIBGE}/estados/${uf}/municipios`
    );
  }
}