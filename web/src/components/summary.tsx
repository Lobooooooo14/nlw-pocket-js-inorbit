import { DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InOrbitIcon } from "@/components/in-orbit-icon"
import { Progress, ProgressIndicator } from "@/components/ui/progress-bar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getSummary } from "@/http/get-summary"
import dayjs from "dayjs"
import pt_BR from "dayjs/locale/pt-br"
import { PendingGoals } from "@/components/pending-goals"

dayjs.locale(pt_BR)

export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 1 minute
  })

  if (!data) return null

  const firstDayOfWeek = dayjs().startOf("week").format("D MMM")
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM")

  const completedPergentage = Math.round((data.completed * 100) / data.total)

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={{ width: `${completedPergentage}%` }} />
        </Progress>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Você completou <span className="text-zinc-100">{data.completed}</span>{" "}
          de <span className="text-zinc-100">{data.total}</span> metas essa
          semana.
        </span>
        <span>{completedPergentage}%</span>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format("dddd")
          const formattedDate = dayjs(date).format("D[ de ]MMMM")

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                <span className="capitalize">{weekDay}</span>{" "}
                <span className="text-zinc-400 text-sm">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const time = dayjs(goal.completedAt).format("HH:mm")

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">{time}h</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
