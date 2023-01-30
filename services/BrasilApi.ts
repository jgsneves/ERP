import axios from "axios";

interface Endereco {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

interface CNPJ {
  razao_social: string;
  capital_social: number;
  natureza_juridica: string;
}

interface Banco {
  ispb: string;
  name: string;
  code: number;
  fullName: string;
}

export class BrasilApi {
  static baseUrl: string = "https://brasilapi.com.br/api";
  /**
   * Retorna o endereço completo referente a um CEP.
   *
   * referência: https://brasilapi.com.br/docs#tag/CEP
   */
  public static getCep(cep: number) {
    return axios.get<Endereco>(`${this.baseUrl}/cep/v1/${cep}`);
  }

  /**
   * Retorna informações sobre o CNPJ fornecido.
   *
   * referência: https://brasilapi.com.br/docs#tag/CNPJ
   */
  public static getCNPJ(cnpj: number) {
    return axios.get<CNPJ>(`${this.baseUrl}/cnpj/v1/${cnpj}`);
  }

  /**
   * Retorna informações de um banco por meio de seu código bancário
   */
  public static getBank(codigo: number) {
    return axios.get<Banco>(`${this.baseUrl}/banks/v1/${codigo}`);
  }
}
