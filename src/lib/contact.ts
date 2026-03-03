/**
 * Coltium contact information — single source of truth for the website.
 */
export const CONTACT = {
  address: "15164-00509, Langata Hardy, Nairobi",
  email: "sales@coltiumauto.shop",
  website: "https://coltiumauto.shop",
  phone: "+254 762 858881",
  /** E.164 for tel: and wa.me (no + or spaces) */
  phoneE164: "254762858881",
} as const;

export const whatsappUrl = `https://wa.me/${CONTACT.phoneE164}`;
export const telUrl = `tel:${CONTACT.phoneE164}`;
export const mailtoUrl = `mailto:${CONTACT.email}`;
