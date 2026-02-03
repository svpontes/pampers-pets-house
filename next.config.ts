import type { NextConfig } from "next";


/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adicione estas linhas:
  devIndicators: {
    appIsrStatus: false, // Remove o indicador de rota estática (o botão que você mostrou)
    buildActivity: false, // Remove o ícone de atividade de compilação (se aparecer)
  },
};

export default nextConfig;