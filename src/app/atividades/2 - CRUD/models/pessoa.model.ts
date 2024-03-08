export class Pessoa {
  nome: string;
  email: string;
  senha: string;
  cep: string;
  logradouro: string;

  constructor(nome: string, email: string, senha: string, cep: string, logradouro: string) {
    this.nome = nome || '';
    this.email = email || '';
    this.senha = senha || '';
    this.cep = cep || '';
    this.logradouro = logradouro || '';
  }
}
