"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type ProductImageLightboxProps = {
  imageSrc: string;
  imageAlt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductImageLightbox({
  imageSrc,
  imageAlt,
  open,
  onOpenChange,
}: ProductImageLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-none bg-transparent p-0 shadow-none sm:max-w-2xl [&>[data-slot=dialog-close]]:top-3 [&>[data-slot=dialog-close]]:right-3 [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-white/80 [&>[data-slot=dialog-close]]:backdrop-blur-sm"
      >
        <DialogTitle className="sr-only">{imageAlt}</DialogTitle>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="rounded-xl object-contain"
            sizes="(max-width: 768px) 95vw, 700px"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
