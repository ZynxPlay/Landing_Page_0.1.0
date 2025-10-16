import SpaceBackground from "@/components/space-background"
import InteractiveLogo from "@/components/interactive-logo"

export default function HomePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10 flex h-screen items-center justify-center px-4">
        <InteractiveLogo />
      </div>
    </main>
  )
}
