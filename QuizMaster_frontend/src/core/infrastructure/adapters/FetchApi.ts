import { tokenStore } from "./TokenStore.ts";

const API_URL = import.meta.env.VITE_API_URL

export default async function fetchApi(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const token = tokenStore.getToken();
  const userId = tokenStore.getUserId();
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (response.status === 401) {
      const refreshResponse = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (!refreshResponse.ok) {
        tokenStore.clear();
        window.location.href = "/login";
        throw new Error("Session expirée.");
      }
      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.accessToken;
      tokenStore.set(newAccessToken, userId ? userId : "0");
      const newResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });
      return newResponse;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
