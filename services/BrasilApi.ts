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
}
