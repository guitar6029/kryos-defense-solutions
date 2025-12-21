import { useQuery } from "#imports";
export const useKryosFleet = () => {
  return useQuery({
    queryKey: ["fleet"],
    queryFn: () => $fetch('/api/fleet'),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
