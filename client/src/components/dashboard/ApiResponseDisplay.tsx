import React from "react";

export interface ApiResponse {
  message?: string;
  clerk_payload?: any;
  error?: { message: string; details?: any };
  status?: number;
  [key: string]: any;
}

export interface ApiResponseDisplayProps {
  response: ApiResponse | null;
  defaultToError?: boolean;
}

export default function ApiResponseDisplay({ response, defaultToError = false }: ApiResponseDisplayProps) {
  if (!response) return null;

  const isError = defaultToError || !!response.error;
  const displayData = response.error ? { status: response.status, ...response.error } : response;

  return (
    <div className={`mt-4 p-3.5 rounded-lg text-xs border shadow-sm
      ${isError
        ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-600'
        : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-600'
      }`}
    >
      <h3 className="font-semibold mb-1.5 text-sm">
        {isError ? `Error (Status: ${response.status || 'N/A'})` : 'Success Response:'}
      </h3>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
        {JSON.stringify(displayData, null, 2)}
      </pre>
    </div>
  );
} 