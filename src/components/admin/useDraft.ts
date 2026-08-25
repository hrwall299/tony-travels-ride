import { useEffect, useState } from "react";
import type { ContentKey, contentDefaults } from "@/content/defaults";
import { useContent } from "@/lib/content";
import { useSaveContent } from "@/lib/admin";

type Map = typeof contentDefaults;

/** Local editable copy of a content block plus its save action. */
export function useDraft<K extends ContentKey>(key: K) {
  const current = useContent(key);
  const [draft, setDraft] = useState<Map[K]>(current);
  const [touched, setTouched] = useState(false);
  const save = useSaveContent(key);

  useEffect(() => {
    if (!touched) setDraft(current);
  }, [current, touched]);

  const update = (patch: Partial<Map[K]>) => {
    setTouched(true);
    setDraft((d) => ({ ...d, ...patch }));
  };

  return {
    draft,
    update,
    setDraft: (v: Map[K]) => {
      setTouched(true);
      setDraft(v);
    },
    save: () => save.mutate(draft),
    saving: save.isPending,
    saved: save.isSuccess,
    error: save.error ? (save.error as Error).message : null,
  };
}
