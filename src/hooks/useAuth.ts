import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";

export const useAuth = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const login = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (response.data) {
          history.push("/home");
        } else {
          alert("ユーザーが見つかりません");
        }
      } catch {
        alert("ログインできません");
      }
      setLoading(false);
    },
    [history]
  );
  return { login, loading };
};
