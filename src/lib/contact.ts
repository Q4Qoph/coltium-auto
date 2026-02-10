/**
 * Coltium contact information — single source of truth for the website.
 */
export const CONTACT = {
  address: "15164-00509, Langata Hardy, Nairobi",
  email: "contact@intl-coltium.com",
  website: "https://www.intl-coltium.com",
  phone: "+1 (758) 486-9802",
  /** E.164 for tel: and wa.me (no + or spaces) */
  phoneE164: "17584869802",
} as const;

export const whatsappUrl = `https://wa.me/${CONTACT.phoneE164}`;
export const telUrl = `tel:${CONTACT.phoneE164}`;
export const mailtoUrl = `mailto:${CONTACT.email}`;
