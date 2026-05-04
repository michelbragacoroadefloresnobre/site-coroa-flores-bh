export type CityCopy = {
  heroTitle: string;
  heroSubtitle: string;
  headerLogoAlt: string;
  aboutParagraph: string;
  deliveryHeading: string;
  locationsHeroSubtitle: string;
  locationsCtaParagraph: string;
  testimonialsTitle: string;
  testimonialsCounter: string;
  whatsappSignature: string;
  metadataTitle: string;
  metadataDescription: string;
  metadataOgImageAlt: string;
  catalogMetadataDescription: string;
  locationsMetadataDescription: string;
  locationsMetadataOgDescription: string;
};

export type CityConfig = {
  slug: string;
  name: string;
  nameShort: string;
  capitalCityName: string;
  logoPath: string;
  copy: CityCopy;
};
