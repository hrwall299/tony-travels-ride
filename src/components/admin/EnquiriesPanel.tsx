import {
  ENQUIRY_STATUSES,
  useEnquiries,
  useUpdateEnquiryStatus,
} from "@/lib/admin";

export function EnquiriesPanel() {
  const { data, isLoading, error } = useEnquiries();
  const update = useUpdateEnquiryStatus();

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading enquiries…</p>;
  if (error) return <p className="text-sm text-destructive">{(error as Error).message}</p>;
  if (!data?.length) return <p className="text-sm text-muted-foreground">No enquiries yet.</p>;

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="p-3">Received</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Trip</th>
            <th className="p-3">Route</th>
            <th className="p-3">When</th>
            <th className="p-3">Pax</th>
            <th className="p-3">Notes</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id} className="border-t border-border align-top">
              <td className="whitespace-nowrap p-3 text-muted-foreground">
                {new Date(e.created_at).toLocaleString("en-IN")}
              </td>
              <td className="p-3">
                <span className="font-medium text-foreground">{e.name}</span>
                <br />
                <a href={`tel:${e.mobile}`} className="text-primary">
                  {e.mobile}
                </a>
              </td>
              <td className="p-3">{e.trip_type ?? "—"}</td>
              <td className="p-3">
                {e.pickup ?? "—"} → {e.drop_location ?? "—"}
              </td>
              <td className="p-3">
                {e.travel_date ?? "—"} {e.pickup_time ?? ""}
              </td>
              <td className="p-3">{e.passengers ?? "—"}</td>
              <td className="max-w-[16rem] whitespace-pre-wrap p-3 text-muted-foreground">
                {e.message ?? "—"}
              </td>
              <td className="p-3">
                <select
                  className="h-9 border border-border bg-background px-2 text-sm capitalize"
                  value={e.status}
                  onChange={(ev) => update.mutate({ id: e.id, status: ev.target.value })}
                >
                  {ENQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s} className="capitalize">
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
