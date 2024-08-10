/* eslint-disable react-hooks/exhaustive-deps */
import { localStorageUtils } from "@/utils/local-storage-utils";
import { atom, useAtom } from "jotai";

type Theme = "light" | "dark";
const atomTheme = atom<Theme>("light");
export const useTheme = () => {
  const [theme, setTheme] = useAtom(atomTheme);

  const initTheme = () => {
    const storageTheme = localStorageUtils.get("theme") as Theme;
    setGlobalTheme(storageTheme);
  };

  const onSwitchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorageUtils.set("theme", newTheme);
    setGlobalTheme(newTheme);
  };

  const setGlobalTheme = (t: Theme) => {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
      setTheme(t);
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return {
    theme,
    setTheme,
    initTheme,
    onSwitchTheme,
  };
};
