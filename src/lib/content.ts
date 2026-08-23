import { useQuery } from "@tanstack/react-query";
import { contentDefaults, type ContentKey } from "@/content/defaults";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = typeof contentDefaults;

export async function fetchContentRow<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error || !data?.value) return contentDefaults[key];
  return { ...contentDefaults[key], ...(data.value as object) } as ContentMap[K];
}

/** Reads a website content block, falling back to the built-in defaults. */
export function useContent<K extends ContentKey>(key: K): ContentMap[K] {
  const { data } = useQuery({
    queryKey: ["site_content", key],
    queryFn: () => fetchContentRow(key),
    staleTime: 60_000,
  });
  return (data ?? contentDefaults[key]) as ContentMap[K];
}

export async function saveContentRow(key: ContentKey, value: unknown) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: value as never }, { onConflict: "key" });
  if (error) throw error;
}
