const API_BASE_URL = "/api/posts";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(API_BASE_URL + url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = "Erro na requisição";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return response.json();
}

export function get<T>(url: string) {
  return request<T>(url, { method: "GET" });
}

export function post<T>(url: string, body: any) {
  return request<T>(url, { method: "POST", body: JSON.stringify(body) });
}

export function put<T>(url: string, body: any) {
  return request<T>(url, { method: "PUT", body: JSON.stringify(body) });
}

export function del<T>(url: string) {
  return request<T>(url, { method: "DELETE" });
}
