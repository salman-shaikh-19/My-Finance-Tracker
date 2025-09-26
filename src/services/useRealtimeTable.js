import { useEffect } from "react";
import supabase from "./supabaseClient";

export function useRealtimeTable(table, filter, onChange) {
  useEffect(() => {
    if (!filter?.value) return; //user id null or empty then return

    const { column, value } = filter;

    const channel = supabase
      .channel(`${table}-realtime`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: `${column}=eq.${value}`,
        },
        onChange
      )
      .subscribe();

    // cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, filter?.value, onChange]);
}
