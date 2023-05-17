import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClick]);
}

export default function ClickOutside({ children, onClick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClick);

  return <div ref={wrapperRef}>{children}</div>;
}
