import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/api'

export const Route = createFileRoute('/compliance')({
  component: CompliancePage,
})

function CompliancePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['compliance-gaps'],
    queryFn: () => apiGet('/api/compliance-gaps'),
  })

  if (isLoading) return <div className="p-6 text-muted-foreground">Scanning regulatory clauses…</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Regulatory Compliance Intelligence</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Critical Gaps" value={data.summary.critical} tone="red" />
        <StatCard label="Major Gaps" value={data.summary.major} tone="amber" />
        <StatCard label="Compliant" value={data.summary.compliant} tone="green" />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th>Clause</th><th>Equipment</th><th>Status</th><th>Evidence</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.gaps.map((g: any) => (
            <tr key={g.clause_id} className="border-t border-border">
              <td>{g.requirement_source} — {g.clause_id}</td>
              <td>{g.equipment}</td>
              <td className={g.severity === 'Critical' ? 'text-red-500' : g.severity === 'Major' ? 'text-amber-500' : 'text-green-500'}>
                {g.gap_type}
              </td>
              <td>{g.evidence_doc ?? '—'}</td>
              <td className="text-muted-foreground">{g.recommended_action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
