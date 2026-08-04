import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from './pessoa.service';


@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pessoas.html',
  styleUrl: './pessoas.css'
})
export class Pessoas {
  
  // Guarda o formulário inteiro.
  formulario: FormGroup;

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

  salvar() {
    if (this.formulario.valid) {
      const cliente = {
        id: Date.now(),
        ...this.formulario.value
      };

      this.pessoaService.adicionar(cliente);
      console.log('Cliente salvo:', cliente);
      this.formulario.reset();
    } else {
      console.log('Formulário inválido');
    }
  }
}