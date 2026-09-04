import { useState } from "react";

export default function useExpandableVideo() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const isExpanded = (id: string) => expandedId === id;

  return { isExpanded, toggle };
}