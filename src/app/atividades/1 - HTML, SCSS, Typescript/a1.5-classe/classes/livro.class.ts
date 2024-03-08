import { Publicacao } from './publicacao.class';

export class Livro extends Publicacao {

  private isbn: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, isbn: string) {
    super(titulo, autor, anoPublicacao);
    this.isbn = isbn || '';
  }

  getInfo(): string {
    return `${this.titulo || 'Sem Título'} (${this.isbn || 'Sem ISBN'}) - ${this.autor || 'Sem Autor'}, ${this.anoPublicacao || 'Sem Ano de Publicação'}`;
  }
}
