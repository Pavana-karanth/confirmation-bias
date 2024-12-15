import { cn } from "@/lib/utils"

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-slate-900/80 border-t border-purple-800/30 backdrop-blur-md mt-8",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-6 text-center text-gray-300">
        <p>© 2024 BiasSage - Confirmation Bias Detector. All rights reserved.</p>
        <p className="mt-2 text-sm">Developed as part of a mini project to promote critical thinking and self-awareness.</p>
      </div>
    </footer>
  )
}

