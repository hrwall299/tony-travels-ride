import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contentDefaults, type ContentKey } from "@/content/defaults";
import { supabase } from "@/integrations/supabase/client";
import { saveContentRow } from "@/lib/content";

export const MEDIA_BUCKET = "media";

/** Uploads a file to the private media bucket and returns its stored path. */
export async function uploadMedia(file: File, folder = "uploads") {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return path;
}

export async function deleteMedia(path: string) {
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw error;
}

export async function listMedia(folder = "uploads") {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list(folder, { limit: 200, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  return (data ?? [])
    .filter((f) => f.id !== null)
    .map((f) => ({ name: f.name, path: `${folder}/${f.name}` }));
}

export function useMediaLibrary() {
  return useQuery({ queryKey: ["media-library"], queryFn: () => listMedia() });
}

/** Saves a content block and refreshes every reader of that block. */
export function useSaveContent<K extends ContentKey>(key: K) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (value: (typeof contentDefaults)[K]) => saveContentRow(key, value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content", key] });
    },
  });
}

export type Enquiry = {
  id: string;
  name: string;
  mobile: string;
  trip_type: string | null;
  pickup: string | null;
  drop_location: string | null;
  travel_date: string | null;
  pickup_time: string | null;
  passengers: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export const ENQUIRY_STATUSES = [
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export function useEnquiries() {
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: async (): Promise<Enquiry[]> => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Enquiry[];
    },
  });
}

export function useUpdateEnquiryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enquiries"] }),
  });
}
