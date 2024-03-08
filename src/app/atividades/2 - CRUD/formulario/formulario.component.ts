import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pessoa,
    private matDialog: MatDialogRef<FormularioComponent>,
    private http: HttpClient) { }

  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required
    ]),
    cep: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    logradouro: new FormControl({
      value: '',
      disabled: true
    }, [
      Validators.required
    ]),
  })

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
      if (this.data.logradouro.length > 0) {
        this.form.get('logradouro').enable();
      }
    }

    this.form.get('cep')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((val: string) => {
      this.buscarCep(val);
    })
  }

  buscarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json`;
    this.http.get(url).subscribe((res: any) => {
      if (res) {
        this.form.get('logradouro')?.enable();
        this.form.get('logradouro')?.setValue(res?.logradouro);
      }
    }, (error) => {
      this.form.get('logradouro')?.setValue('');
      this.form.get('logradouro')?.disable();
    });
  }

  submitForm() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const pessoa = this.form.value as Pessoa;
      this.matDialog.close(pessoa);
    } else {
      alert('O formulário está com dados inválidos ou não preenchidos. Por favor, verifique');
    }
  }
}
