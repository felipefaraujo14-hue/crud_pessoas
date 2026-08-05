import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css'
})

export class Pessoas implements OnInit {

  formulario: FormGroup;

  estados: any[] = [];
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {

    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      uf: ['', Validators.required],
      municipio: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.carregarEstados();
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

  carregarMunicipios() {
    const uf = this.formulario.get('uf')?.value;

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
    if (this.formulario.valid) {

      const cliente = {
        id: Date.now(),
        ...this.formulario.value
      };

      this.pessoaService.adicionar(cliente);

      console.log('Cliente salvo:', cliente);

      this.formulario.reset();

      this.municipios = [];

    } else {
      console.log('Formulário inválido');
    }
  }

}