interface UploadFileResponse {
  url: string;
}

export class UploadFileService {
  /**
   * uploadFile
   */
  public static uploadFile(file: File) {
    return new Promise<UploadFileResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({ url: "http://www.google.com" });
      }, 3000);
    });
  }
}
