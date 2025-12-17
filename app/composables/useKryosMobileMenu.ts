import { ref, onMounted, onBeforeUnmount } from "vue";

export function useKryosMobileMenu(minWidth: number) {
  const isMobile = ref(false);
  const sideMenuDisplaying = ref(false);

  const closeMenu = () => {
    sideMenuDisplaying.value = false;
  };

  const toggleMenu = () => {
    sideMenuDisplaying.value = !sideMenuDisplaying.value;
  };

  const handleResize = () => {
    // always close when resizing
    closeMenu();
    isMobile.value = window.innerWidth <= minWidth;
  };

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    isMobile,
    sideMenuDisplaying,
    toggleMenu,
    closeMenu,
  };
}
