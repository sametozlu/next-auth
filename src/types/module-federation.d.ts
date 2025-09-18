declare global {
  interface Window {
    cart?: {
      get: (expose: string) => Promise<any>;
    };
  }
}
export {};


