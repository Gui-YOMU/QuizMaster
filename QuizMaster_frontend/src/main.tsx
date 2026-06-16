import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes avant qu'une donnée soit "périmée"
      gcTime: 1000 * 60 * 30, // 30 minutes avant le garbage collection
      retry: 3, // 3 tentatives en cas d'échec
      refetchOnWindowFocus: true, // Refetch quand l'utilisateur revient sur l'onglet
      refetchOnReconnect: true, // Refetch après une reconnexion réseau
    },
    mutations: {
      retry: 1, // 1 seule tentative pour les mutations
    },
  },
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
