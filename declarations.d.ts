export declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
  interface Document {
    documentMode: string;
  }
}
