/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IP_INFO_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
