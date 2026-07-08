import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/lib/api'

export const Route = createFileRoute('/lessons')({
  component: LessonsPage,
})

function LessonsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['lessons-learned'],
    queryFn: () => apiGet('/api/lessons-learned'),
  })

  if (isLoading) return <div className="p-6 text-muted-foreground">Scanning incident databases for patterns…</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Lessons Learned & Failure Intelligence</h1>
      <p className="text-muted-foreground text-sm">Proactive cross-equipment pattern detection</p>
      
      <div className="grid grid-cols-1 gap-4">
        {data.patterns.map((p: any, i: number) => (
          <div key={i} className="rounded-lg border border-border p-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-amber-500">{p.pattern_summary}</h3>
              <span className="text-xs bg-muted px-2 py-1 rounded">Conf: {p.confidence}</span>
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Affected Equipment: </span>
              {p.equipment_tags.join(', ')}
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Incidents Correlated: </span>
              {p.member_count}
            </div>
            
            <div className="mt-4 p-3 bg-red-950/20 border border-red-900 rounded text-sm text-red-200">
              {p.recommended_warning}
            </div>
          </div>
        ))}
        {data.patterns.length === 0 && (
          <div className="text-muted-foreground">No active failure patterns detected.</div>
        )}
      </div>
    </div>
  )
}
