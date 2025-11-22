export enum OccasionTheme {
  CASUAL = 'Casual Day Out',
  BUSINESS = 'Business Professional',
  DATE_NIGHT = 'Date Night',
  PARTY = 'Party / Club',
  FORMAL = 'Formal Event',
  GYM = 'Athleisure / Gym'
}

export interface GenerateRequest {
  userImageBase64: string;
  clothingImageBase64: string;
  theme: OccasionTheme;
}

export interface OutfitResult {
  imageBase64: string;
  description: string;
}
