// Shown in place of a project image until one is added in src/data/portfolio.ts
export default function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink/5 p-6 text-center">
      <span className="text-2xl md:text-4xl font-black uppercase tracking-tight text-ink/20">{title}</span>
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ocean/60">Image coming soon</span>
    </div>
  );
}
