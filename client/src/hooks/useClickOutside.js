import { useEffect } from "react";

export default function useClickOutside(ref, fn) {
  useEffect(() => {
    let handler = function (e) {
      let path = e.path || e.composedPath();

      if (!path.includes(ref.current)) {
        fn(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, fn]);
}
