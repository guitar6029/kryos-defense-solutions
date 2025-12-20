export const getKryosFleet = async () => {
  console.log(
    "getKryosFleet called. client?",
    import.meta.client,
    "server?",
    import.meta.server
  );
  return await $fetch("/api/fleet");
};
