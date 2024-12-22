/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IP_INFO_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
