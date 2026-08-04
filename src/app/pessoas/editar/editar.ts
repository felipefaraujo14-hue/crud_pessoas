import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pessoaService: PessoaService
  ) {}

  ngOnInit() {

    // Cria o formulário
    this.formulario = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
      dataNascimento: [''],
      uf: [''],
      municipio: ['']
    });

    // Pega o ID da URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Busca o cliente
    const cliente = this.pessoaService.buscarPorId(this.id);

    // Preenche o formulário
    if (cliente) {
      this.formulario.patchValue(cliente);
    }
  }

  salvar() {

    const clienteAtualizado = {
      id: this.id,
      ...this.formulario.value
    };

    this.pessoaService.atualizar(clienteAtualizado);
  }

}