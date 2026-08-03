import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css'
})
export class Consulta {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  pesquisa = '';

  constructor(private pessoaService: PessoaService) {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientes = this.pessoaService.listar();
    this.clientesFiltrados = this.clientes;
  }

  pesquisar() {
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
    );
  }

  editar(id: number) {
    console.log('Editar:', id);
  }

  excluir(id: number) {
    this.pessoaService.excluir(id);
    this.carregarClientes();
  }
}