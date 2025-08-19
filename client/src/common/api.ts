import { ApiResponse } from "@/components/dashboard/ApiResponseDisplay";


export async function fetchApi(endpoint: string, token?: string | null): Promise<ApiResponse> {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard${endpoint}`, { headers });
      const data = await res.json();
      if (!res.ok) {
        return { error: data, status: res.status || 500 };
      }
      return data;
    } catch (error) {
      console.error("API call failed:", error);
      return { error: { message: (error as Error).message || "Network error" }, status: 500 };
    }
}
