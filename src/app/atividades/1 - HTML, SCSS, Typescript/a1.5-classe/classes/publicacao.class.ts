export class Publicacao {

  protected titulo: string;
  protected autor: string;
  protected anoPublicacao: number;

  constructor(titulo: string, autor: string, anoPublicacao: number) {
    this.titulo = titulo || '';
    this.autor = autor || '';
    this.anoPublicacao = anoPublicacao || 0;
  }

  getInfo(): string {
    return `${this.titulo || 'Sem Título'} - ${this.autor || 'Sem Autor'}, ${this.anoPublicacao || 'Sem Ano de Publicação'}`;
  }
}
