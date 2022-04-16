import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAllUsers = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Array<User>>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch {
      showMessage({ title: "ユーザー取得に失敗しました", status: "error" });
    }
    setLoading(false);
  }, [showMessage]);

  return { getUsers, loading, users };
};
