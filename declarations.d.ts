export declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
  interface Document {
    documentMode: string;
  }

  interface Window {
    isFirefox: boolean;
    isSafari: boolean;
    isEdge: boolean;
  }
}
