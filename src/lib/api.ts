import { supabase } from "./supabase";

export type Method = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  target_groups: string[];
  group_sizes: string[];
  settings: string[];
  duration_min: number;
  materials: string[];
  steps: string[];
  tips: string[];
  updated_at: string;
};

export async function fetchMethods(filters: {
  category?: string;
  targetGroup?: string;
  groupSize?: string;
  setting?: string;
}) {
  let q = supabase.from("methods").select("*").order("updated_at", { ascending: false });

  if (filters.category) q = q.contains("categories", [filters.category]);
  if (filters.targetGroup) q = q.contains("target_groups", [filters.targetGroup]);
  if (filters.groupSize) q = q.contains("group_sizes", [filters.groupSize]);
  if (filters.setting) q = q.contains("settings", [filters.setting]);

  const { data, error } = await q;
  if (error) throw error;

  return (data ?? []) as Method[];
}

export async function fetchMethod(id: string) {
  const { data, error } = await supabase
    .from("methods")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Method;
}