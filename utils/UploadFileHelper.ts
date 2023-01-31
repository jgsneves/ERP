export class UploadFileHelper {
  /**
   * Substitui todos os espaços em branco por um hífen. Além de remover letras maiúsculas
   */
  public static formatFileName(name: string): string {
    return name.trim().replaceAll(" ", "-").toLocaleLowerCase();
  }
}
