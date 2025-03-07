import { Plus } from "lucide-react"

import logo from "@/assets/logo-in-orbit.svg"
import letsStart from "@/assets/lets-start-illustration.svg"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"

export function EmptyGoals() {
  return (
    <div className="gap-8 flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="in.orbit logo" />
      <img src={letsStart} alt="lets start" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nehuma meta, que tal cadastrar uma agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
