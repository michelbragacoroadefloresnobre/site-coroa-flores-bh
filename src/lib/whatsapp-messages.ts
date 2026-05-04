import { city } from "@/lib/city";

const SITE_TAG = `\n\n${city.config.copy.whatsappSignature}`;

export const whatsappMessages = {
  generalHelp:
    `Oi, preciso de uma coroa de flores. Podem me ajudar?${SITE_TAG}`,

  deliveryInquiry:
    `Oi, gostaria de saber se vocês entregam na minha cidade.${SITE_TAG}`,

  deliveryRegionInquiry:
    `Oi, gostaria de saber se vocês entregam na minha região.${SITE_TAG}`,

  catalogHelp:
    `Oi, não encontrei o que procuro no catálogo. Podem me ajudar?${SITE_TAG}`,

  moreInfo:
    `Olá! Gostaria de mais informações sobre coroas de flores.${SITE_TAG}`,

  urgentOrder:
    `Oi, preciso de uma coroa de flores com urgência. Podem me atender?${SITE_TAG}`,

  serviceQuestion:
    `Oi, tenho uma dúvida sobre o serviço.${SITE_TAG}`,
} as const;

export function locationDeliveryMessage(locationName: string): string {
  return `Olá, preciso de uma coroa de flores para entrega em ${locationName}.${SITE_TAG}`;
}

type QuickOrderParams = {
  productName: string;
  sizeLabel: string;
  formattedPrice: string;
};

export function quickOrderMessage(params: QuickOrderParams): string {
  const lines: string[] = [
    "Olá! Gostaria de fazer um pedido:",
    "",
    `Produto: ${params.productName} - Tamanho ${params.sizeLabel}`,
    `Preço: ${params.formattedPrice}`,
    "",
    "Podem me ajudar com este pedido?",
    SITE_TAG.trimStart(),
  ];

  return lines.join("\n");
}
