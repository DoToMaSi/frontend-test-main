import { Component, OnInit } from '@angular/core';
import { Livro } from './classes/livro.class';
import { Publicacao } from './classes/publicacao.class';
import { Periodico } from './classes/periodico.class';

@Component({
  selector: 'app-a1.5-classe',
  templateUrl: './a1.5-classe.component.html',
  styleUrls: ['./a1.5-classe.component.scss']
})
export class A15ClasseComponent implements OnInit {

  livroTeste = new Livro('O Livro dos Pássaros', 'José Livro', 2024, '855502154610');
  periodicoTeste = new Periodico('O Livro dos Pássaros', 'José Periódico', 2023, '3030405');
  publicacaoTeste = new Publicacao('O Livro dos Pássaros', 'José Publicação', 2022);

  constructor() { }

  ngOnInit(): void { }
}
