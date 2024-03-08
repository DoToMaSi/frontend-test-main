import { Publicacao } from './publicacao.class';

export class Periodico extends Publicacao {

  private issn: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, issn: string) {
    super(titulo, autor, anoPublicacao);
    this.issn = issn || '';
  }

  getInfo(): string {
    return `${this.titulo || 'Sem Título'} (${this.issn || 'Sem ISBN'}) - ${this.autor || 'Sem Autor'}, ${this.anoPublicacao || 'Sem Ano de Publicação'}`;
  }
}
