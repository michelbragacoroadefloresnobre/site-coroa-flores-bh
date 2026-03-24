export function SectionOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-[#2D5A3D]/20" />
      <svg className="size-4 text-[#2D5A3D]/30" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C8 4.418 4.418 8 0 8c4.418 0 8 3.582 8 8 0-4.418 3.582-8 8-8-4.418 0-8-3.582-8-8z" />
      </svg>
      <span className="h-px w-10 bg-[#2D5A3D]/20" />
    </div>
  );
}
