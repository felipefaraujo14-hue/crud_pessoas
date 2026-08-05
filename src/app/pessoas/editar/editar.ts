import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {

  id!: number;
  formulario!: FormGroup;

  estados: any[] = [];
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
      dataNascimento: [''],
      uf: [''],
      municipio: ['']
    });

    // Carrega os estados
    this.carregarEstados();

    // Obtém o ID da URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Busca o cliente
    const cliente = this.pessoaService.buscarPorId(this.id);

    if (cliente) {

      // Preenche o formulário
      this.formulario.patchValue(cliente);

      // Se existir estado, carrega os municípios dele
      if (cliente.uf) {
        this.carregarMunicipios(cliente.uf);
      }

    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados().subscribe({
      next: (dados) => {
        this.estados = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar estados', erro);
      }
    });
  }

  carregarMunicipios(idUf?: number) {

    const uf = idUf ?? this.formulario.get('uf')?.value;

    if (!uf) {
      this.municipios = [];
      return;
    }

    this.pessoaService.listarMunicipios(uf).subscribe({
      next: (dados) => {
        this.municipios = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar municípios', erro);
      }
    });

  }

  salvar() {

    const clienteAtualizado = {
      id: this.id,
      ...this.formulario.value
    };

    this.pessoaService.atualizar(clienteAtualizado);

    alert('Cliente atualizado com sucesso!');
  }

}