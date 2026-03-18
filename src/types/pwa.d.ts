declare module "virtual:pwa-register" {
  export interface RegisterSWOptions {
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    immediate?: boolean;
  }

  export function registerSW(options?: RegisterSWOptions): () => void;
}
