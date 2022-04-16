import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const login = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await axios.get<User>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (response.data) {
          const isAdmin = response.data.id === 10 ? true : false;
          setLoginUser({ ...response.data, isAdmin });
          showMessage({ title: "ログインしました", status: "success" });
          history.push("/home");
        } else {
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
        }
      } catch {
        showMessage({
          title: "ログインできません",
          status: "error",
        });
      }
      setLoading(false);
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
