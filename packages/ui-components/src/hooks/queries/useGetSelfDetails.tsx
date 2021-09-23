import { User } from "@applozic/core-sdk";
import { useQuery } from "react-query";

function useGetSelfDetails() {
  return useQuery<User | undefined | null>(["self"]).data;
}

export default useGetSelfDetails;
