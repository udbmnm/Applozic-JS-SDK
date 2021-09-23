import { useQuery } from "react-query";

function useGetApplicationId(initialData?: string) {
  return useQuery(["application_id"], {
    initialData,
  }).data;
}

export default useGetApplicationId;
