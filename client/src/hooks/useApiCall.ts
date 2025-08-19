import { useState, useCallback } from "react";
import type { ApiResponse } from "@/components/dashboard/ApiResponseDisplay";

export function useApiCall(apiFn: () => Promise<ApiResponse>) {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useCallback(async () => {
    setIsLoading(true);
    setResponse(null);
    const res = await apiFn();
    setResponse(res);
    setIsLoading(false);
  }, [apiFn]);

  return { trigger, response, isLoading };
} 