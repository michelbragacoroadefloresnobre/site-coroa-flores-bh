const SITE_TAG = "\n\n(Vim do site Coroa de Flores SP)";

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
  ribbonMessage?: string;
  deliveryLocation?: string;
  preferredTime?: string;
  formattedDate?: string;
};

export function quickOrderMessage(params: QuickOrderParams): string {
  const lines: string[] = [
    "Olá! Gostaria de fazer um pedido urgente:",
    "",
    `Produto: ${params.productName} - Tamanho ${params.sizeLabel}`,
    `Preço: ${params.formattedPrice}`,
  ];

  if (params.ribbonMessage) {
    lines.push(`Mensagem da faixa: "${params.ribbonMessage}"`);
  }
  if (params.deliveryLocation) {
    lines.push(`Local de entrega: ${params.deliveryLocation}`);
  }
  if (params.preferredTime) {
    lines.push(`Horário preferido: ${params.preferredTime}`);
  }
  if (params.formattedDate) {
    lines.push(`Data prevista: ${params.formattedDate}`);
  }

  lines.push("");
  lines.push("Preciso desta coroa com urgência. Podem confirmar a entrega?");
  lines.push(SITE_TAG.trimStart());

  return lines.join("\n");
}
