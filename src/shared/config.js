// =====================================================================
//  ONE FILE TO CUSTOMISE A CLIENT.
//  Replace the placeholder contact details below, then edit products.
// =====================================================================

export const contact = {
  whatsapp: '962790000000', // international format, no + or spaces
  instagram: 'https://instagram.com/yourshop',
  facebook: 'https://facebook.com/yourshop',
  phone: '+962 79 000 0000',
  mapsUrl: 'https://maps.google.com/?q=Amman',
  address: { ar: 'عمّان، الأردن', en: 'Amman, Jordan' },
  hours: { ar: 'يوميًا ١٠ ص – ١٠ م', en: 'Daily 10 AM – 10 PM' },
};

// type -> which generated illustration is drawn (see jewelry.js)
export const products = [
  { id: 'ring', type: 'ring', karat: '21K', name: { ar: 'خاتم الملكة', en: 'Queen Ring' } },
  { id: 'necklace', type: 'necklace', karat: '21K', name: { ar: 'عقد الياسمين', en: 'Jasmine Necklace' } },
  { id: 'earrings', type: 'earrings', karat: '18K', name: { ar: 'أقراط الهلال', en: 'Crescent Earrings' } },
  { id: 'bracelet', type: 'bracelet', karat: '21K', name: { ar: 'إسورة الواحة', en: 'Oasis Bangle' } },
  { id: 'pendant', type: 'pendant', karat: '18K', name: { ar: 'قلادة النجمة', en: 'Star Pendant' } },
  { id: 'set', type: 'set', karat: '21K', name: { ar: 'طقم العروس', en: 'Bridal Set' } },
];

const inquiryText = {
  ar: (name) => `مرحبًا، أودّ الاستفسار عن: ${name}`,
  en: (name) => `Hello, I would like to ask about: ${name}`,
};

export function whatsappLink(lang = 'ar', productName = null) {
  const text = productName
    ? inquiryText[lang](productName)
    : lang === 'ar'
      ? 'مرحبًا، أودّ الاستفسار عن مجوهراتكم'
      : 'Hello, I would like to know more about your jewellery';
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
