import { useEffect, useState } from "react";

export type PageId = "overview" | "crew" | "ai" | "reports" | "routine" | "risks" | "profile";

export interface Route {
  page: PageId;
  params: URLSearchParams;
}

const PATHS: Record<string, PageId> = {
  "": "overview",
  crew: "crew",
  ai: "ai",
  reports: "reports",
  routine: "routine",
  risks: "risks",
  profile: "profile",
};

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [path, query] = h.split("?");
  return { page: PATHS[path] ?? "overview", params: new URLSearchParams(query ?? "") };
}

export function useRoute(): Route {
  const [r, setR] = useState(parse);
  useEffect(() => {
    const on = () => setR(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return r;
}

export function navigate(to: string) {
  const target = to.startsWith("#") ? to : `#${to}`;
  if (window.location.hash === target) window.dispatchEvent(new HashChangeEvent("hashchange"));
  else window.location.hash = target;
}
