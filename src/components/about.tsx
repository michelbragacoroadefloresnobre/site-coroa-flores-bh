import { Truck, Clock, Camera, HeartHandshake } from "lucide-react";
import stats from "@/data/stats.json";
import { city } from "@/lib/city";

const statIcons = [Truck, Clock, Camera, HeartHandshake] as const;

export function About() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -right-20 -top-10 size-96 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-[1100px] gap-12 md:grid-cols-2 md:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-[24px] leading-[1.25] font-bold text-[#1C1C1C] md:text-[38px]">
            Cuidamos de cada detalhe pra que você não precise se preocupar com
            isso agora.
          </h2>
          <p className="mt-6 text-base leading-[1.7] text-[#6B6B6B]">
            {city.config.copy.aboutParagraph}
          </p>
          <p className="mt-4 text-base leading-[1.7] text-[#6B6B6B]">
            Nossas coroas são montadas com flores frescas e entregues em até uma
            hora após a confirmação. Você acompanha tudo — e recebe a foto antes
            da entrega.
          </p>
        </div>

        {/* Right — stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <div
                key={stat.value}
                className="rounded-xl border-l-[3px] border-l-[#2D5A3D] bg-[#F5F0E8] p-6"
              >
                <div className="flex items-center gap-2.5">
                  {Icon && (
                    <Icon
                      className="size-5 text-[#2D5A3D]/60"
                      strokeWidth={1.5}
                    />
                  )}
                  <p className="text-[30px] font-bold leading-none text-[#2D5A3D] md:text-[34px]">
                    {stat.value}
                  </p>
                </div>
                <p className="mt-2.5 text-[14px] leading-snug text-[#6B6B6B]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
