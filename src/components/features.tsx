import { Clock, MessageCircle, Camera } from "lucide-react";

const items = [
  {
    icon: Clock,
    title: "Entrega em até 1 hora",
    description: "Após a confirmação do pedido.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento 24 horas",
    description: "Todos os dias, inclusive feriados.",
  },
  {
    icon: Camera,
    title: "Foto antes de entregar",
    description: "Você vê a coroa antes de ela sair daqui.",
  },
] as const;

export function Features() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] px-4 py-16 md:py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -left-10 -bottom-10 size-60 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
        <svg className="absolute -right-8 -top-8 size-48 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="70" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1100px] gap-5 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center rounded-xl bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-[#D4E8DC]">
              <item.icon className="size-6 text-[#2D5A3D]" strokeWidth={1.5} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#1C1C1C]">
              {item.title}
            </h3>
            <p className="mt-2 text-[15px] text-[#6B6B6B]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
