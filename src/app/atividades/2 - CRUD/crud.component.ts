import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { FormularioComponent } from './formulario/formulario.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Pessoa } from './models/pessoa.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {

  @ViewChild('tablePessoas') tablePessoas: MatTable<any>;

  filtro = new FormControl()

  displayedColumns: string[] = ['actions', 'nome', 'email', 'senha', 'cep', 'logradouro'];

  dataSource: MatTableDataSource<Pessoa> = new MatTableDataSource([
    new Pessoa('Teste1', 'teste@email1.com', '1234', '80250104', 'Rua teste')
  ]);

  constructor(private dialog: MatDialog, public zone: NgZone, public changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.filtro.valueChanges.pipe(debounceTime(200)).subscribe(valor => {
      this.filtrar(valor);
    })
  }

  filtrar(arg: string) {
    const searchVal = arg.trim();
    this.dataSource.filter = searchVal;
  }

  adicionar() {
    this.dialog.open(FormularioComponent).afterClosed().subscribe((value: Pessoa) => {
      this.dataSource.data.push(value);
      this.updateTable();
    });;
  }

  editar(pessoa: Pessoa, index: number) {
    this.dialog.open(FormularioComponent, {
      data: pessoa
    }).afterClosed().subscribe((value: Pessoa) => {
      if (value) {
        this.dataSource.data[index] = value;
        this.updateTable();
      }
    });
  }

  remover(pessoa: Pessoa, index: number) {
    if (!confirm(`Deseja remover a pessoa ${pessoa.nome}?`)) return;

    this.dataSource.data.splice(index, 1);
    alert("removido com sucesso!");
    this.updateTable();
  }

  updateTable() {
    if (this.tablePessoas) {
      this.tablePessoas.renderRows();
    }
  }
}
