export class ErrorHandler {
  /**
   * Cria um log toda vez que o Axios encontrar um erro ao fazer um POST.
   */
  public static logAxiosPostError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que o Axios encontrar um erro ao fazer um GET.
   */
  public static logAxiosGetError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que o Axios encontrar um erro ao fazer um PUT.
   */
  public static logAxiosPutError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que o Axios encontrar um erro ao fazer um PATCH.
   */
  public static logAxiosPatchError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que o Axios encontrar um erro ao fazer um DELETE.
   */
  public static logAxiosDeleteError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que alguma requisição à Brasil API encontrar um erro.
   */
  public static logBrasilApiError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que alguma requisição de sigIn no Supabase encontrar um erro.
   */
  public static logSigInSupabaseError(error: any) {
    console.log({ error });
  }

  /**
   * Cria um log toda vez que alguma requisição de resetPassword no Supabase encontrar um erro.
   */
  public static logResetPasswordSupabaseError(error: any) {
    console.log({ error });
  }
}
