import { useState } from "react";
import api from "../../api/axios";

export const useAuthForm = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post(endpoint, data);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Błąd autoryzacji");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
