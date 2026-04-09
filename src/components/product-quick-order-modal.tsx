"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { quickOrderMessage } from "@/lib/whatsapp-messages";

type ProductSize = {
  price: number;
  height: number;
  width: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  sizes: Record<string, ProductSize>;
};

type ProductQuickOrderModalProps = {
  product: Product | null;
  onClose: () => void;
};

type SizeKey = "default" | "big";

const SIZE_LABELS: Record<SizeKey, string> = {
  default: "Padrão",
  big: "Grande",
};

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function getAvailableSizes(product: Product): SizeKey[] {
  const sizes: SizeKey[] = [];
  if (product.sizes.default) sizes.push("default");
  if (product.sizes.big) sizes.push("big");
  return sizes;
}

function getSizeData(product: Product, size: SizeKey): ProductSize | undefined {
  return product.sizes[size];
}

function formatTimeInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

function isValidTime(value: string): boolean {
  if (!value) return true;
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return false;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

function getTodayString(): string {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDatePtBr(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

export function ProductQuickOrderModal({
  product,
  onClose,
}: ProductQuickOrderModalProps) {
  const [size, setSize] = useState<SizeKey>("default");
  const [ribbonMessage, setRibbonMessage] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [timeError, setTimeError] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  const resetForm = useCallback(() => {
    setSize("default");
    setRibbonMessage("");
    setDeliveryLocation("");
    setPreferredTime("");
    setExpectedDate("");
    setTimeError(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes.big ? "big" : "default");
  }, [product]);

  useEffect(() => {
    if (!product) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [product, handleClose]);

  if (!product) return null;

  const availableSizes = getAvailableSizes(product);
  const currentSize = getSizeData(product, size) ?? getSizeData(product, availableSizes[0])!;

  const handleTimeChange = (value: string) => {
    const formatted = formatTimeInput(value);
    setPreferredTime(formatted);
    if (formatted.length === 5) {
      setTimeError(!isValidTime(formatted));
    } else {
      setTimeError(false);
    }
  };

  const handleSubmit = () => {
    if (timeError) return;

    const message = quickOrderMessage({
      productName: product.name,
      sizeLabel: SIZE_LABELS[size],
      formattedPrice: formatPrice(currentSize.price),
      ribbonMessage: ribbonMessage.trim() || undefined,
      deliveryLocation: deliveryLocation.trim() || undefined,
      preferredTime: (!timeError && preferredTime.trim()) || undefined,
      formattedDate: expectedDate ? formatDatePtBr(expectedDate) : undefined,
    });

    window.open(buildWhatsappUrl(message), "_blank");
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <X className="size-5 text-[#1C1C1C]" />
        </button>

        {/* Product image */}
        <div className="relative h-56 w-full bg-gray-50 sm:h-64">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="rounded-t-2xl object-contain"
            sizes="(max-width: 640px) 100vw, 500px"
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="text-xl font-bold text-[#1C1C1C]">{product.name}</h3>
          <p className="mt-1 text-[14px] text-[#6B6B6B]">
            {product.description}
          </p>
          <p className="mt-2 text-lg font-semibold text-[#2D5A3D]">
            {formatPrice(currentSize.price)}
          </p>
          {currentSize.height > 0 && currentSize.width > 0 && (
            <p className="mt-1 text-[13px] text-[#6B6B6B]">
              Medidas: {currentSize.height}cm × {currentSize.width}cm (altura × largura)
            </p>
          )}

          {/* Form */}
          <div className="mt-5 space-y-4">
            {/* Size toggle */}
            <div>
              <label className="text-sm font-medium text-[#1C1C1C]">
                Tamanho
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-lg py-2.5 text-sm font-medium transition-colors ${
                      size === s
                        ? "bg-[#2D5A3D] text-white"
                        : "bg-[#F5F5F5] text-[#1C1C1C] hover:bg-[#E8E8E8]"
                    }`}
                  >
                    {SIZE_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Ribbon message */}
            <div>
              <label
                htmlFor="ribbon-message"
                className="text-sm font-medium text-[#1C1C1C]"
              >
                Mensagem da faixa{" "}
                <span className="font-normal text-[#9B9B9B]">(opcional)</span>
              </label>
              <textarea
                id="ribbon-message"
                value={ribbonMessage}
                onChange={(e) => setRibbonMessage(e.target.value)}
                rows={2}
                placeholder="Ex: Saudades eternas, família Silva"
                className="mt-1.5 w-full resize-none rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#BEBEBE] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] focus:outline-none"
              />
            </div>

            {/* Delivery location */}
            <div>
              <label
                htmlFor="delivery-location"
                className="text-sm font-medium text-[#1C1C1C]"
              >
                Local de entrega
              </label>
              <input
                id="delivery-location"
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Ex: Cemitério da Paz"
                className="mt-1.5 w-full rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#BEBEBE] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] focus:outline-none"
              />
            </div>

            {/* Preferred time */}
            <div>
              <label
                htmlFor="preferred-time"
                className="text-sm font-medium text-[#1C1C1C]"
              >
                Horário preferido
              </label>
              <input
                id="preferred-time"
                type="text"
                inputMode="numeric"
                value={preferredTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                placeholder="HH:MM"
                maxLength={5}
                className={`mt-1.5 w-full rounded-lg border px-3 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#BEBEBE] focus:ring-1 focus:outline-none ${
                  timeError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-[#E0E0E0] focus:border-[#2D5A3D] focus:ring-[#2D5A3D]"
                }`}
              />
              {timeError && (
                <p className="mt-1 text-xs text-red-500">
                  Horário inválido. Use o formato HH:MM (00:00 a 23:59).
                </p>
              )}
            </div>

            {/* Expected date */}
            <div>
              <label
                htmlFor="expected-date"
                className="text-sm font-medium text-[#1C1C1C]"
              >
                Data prevista
              </label>
              <input
                id="expected-date"
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                min={getTodayString()}
                className="mt-1.5 w-full rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-sm text-[#1C1C1C] focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={timeError}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2D5A3D] px-5 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <MessageCircle className="size-4" />
            Enviar pedido pelo WhatsApp
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
