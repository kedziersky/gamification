import { getDocs, Query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCollectionOnce = (query: Query<unknown>) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<QuerySnapshot<unknown>>();
  const [error, setError] = useState();

  useEffect(() => {
    const getActivites = async () => {
      setLoading(true);
      try {
        const response = await getDocs(query);

        setValue(response);
      } catch (e) {
        setError(e as any);
      } finally {
        setLoading(false);
      }
    };
    getActivites();
  }, []);
  return { loading, value, error };
};
