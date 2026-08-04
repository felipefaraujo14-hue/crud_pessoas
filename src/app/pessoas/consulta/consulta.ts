import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css'
})
export class Consulta {
    // Array que guarda todos os clientes carregados.
  clientes: any[] = [];
    // Array que guarda apenas os clientes filtrados pela pesquisa.
  clientesFiltrados: any[] = [];
  pesquisa = '';

  constructor(private pessoaService: PessoaService, private router: Router){
      // carrega os clientes salvos.
    this.carregarClientes();
  }

  carregarClientes() {
      // Pega os dados que estão no LocalStorage através do PessoaService.
    this.clientes = this.pessoaService.listar();
    //ira mostra os todos os clientes e dps mudara mudara pela pesquisa
    this.clientesFiltrados = this.clientes;
  }

  pesquisar() {
     // Cria uma nova lista contendo apenas os clientes que possuem o texto pesquisado no nome.
    this.clientesFiltrados = this.clientes.filter(cliente =>
       // Converte o nome do cliente para letras minúsculas e verifica se contém o texto pesquisado.
      cliente.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
    );
  }

  editar(id: number) {
   this.router.navigate(['/editar', id]);
  }

  excluir(id: number) {
    this.pessoaService.excluir(id);
     // Atualiza a lista da tela depois da exclusão.
    this.carregarClientes();
  }
}