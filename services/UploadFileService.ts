interface UploadFileResponse {
  url: string;
}

export class UploadFileService {
  /**
   * uploadFile
   */
  public static uploadFile() {
    return new Promise<UploadFileResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({ url: "ble" });
      }, 3000);
    });
  }
}
