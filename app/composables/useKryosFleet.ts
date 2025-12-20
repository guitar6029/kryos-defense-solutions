import { useQuery } from "#imports";
import { getKryosFleet } from "~/utils/api/fleet";

export const useKryosFleet = () => {
  console.log("useKryosFleet invoked");
  console.trace();

  return useQuery({
    queryKey: ["fleet"],
    queryFn: getKryosFleet,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
