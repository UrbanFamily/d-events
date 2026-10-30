// Home page copy in both languages, the gallery photo sets and the budget
// estimator's rates. Kept apart from the component so the Hungarian and the
// English routes render the same page from one source.

// ─── Translations ─────────────────────────────────────────────────────────────

export const translations = {
  hu: {
    nav: { about: "Rólunk", services: "Szolgáltatások", gallery: "Galéria", testimonials: "Vélemények", contact: "Kapcsolat" },
    hero: {
      tagline: "Minden pillanat tökéletes legyen",
      subtitle: "Esküvő & Rendezvényszervezés",
      description: "Álmai napját mi tesszük valósággá — végtelen gonddal, személyes figyelemmel, és az elegancia iránt érzett szenvedéllyel.",
      cta: "Ajánlatot kérek",
      ctaSecondary: "Galériánk",
    },
    about: {
      label: "Rólunk",
      title: "Ahol az álmok valósággá válnak",
      p1: "A D-Events csapata hisz abban, hogy minden rendezvény egyedi történet. Legyen szó intim esküvőről, nagyszabású céges gáláról vagy bensőséges születésnapi ünnepségről — mi minden részletet átgondolunk, hogy Ön csak az élményre figyeljen.",
      p2: "Több mint tíz évnyi tapasztalatunkkal és gondosan válogatott partnereinkkel garantáljuk, hogy napja maradandó emlék marad.",
      stat1: { number: 200, suffix: "+", label: "Sikeres rendezvény" },
      stat2: { number: 10, suffix: "+", label: "Év tapasztalat" },
      stat3: { number: 98, suffix: "%", label: "Elégedett ügyfél" },
    },
    process: {
      label: "Folyamatunk",
      title: "A tökéletes nap útja",
      steps: [
        { num: "01", title: "Konzultáció", desc: "Megismerjük az álmait és elképzeléseit egy személyes találkozón." },
        { num: "02", title: "Tervezés", desc: "Részletes ajánlatot és moodboard-ot készítünk az Ön stílusához." },
        { num: "03", title: "Szervezés", desc: "Koordinálunk minden partnert, helyszínt és szolgáltatót." },
        { num: "04", title: "A nagy nap", desc: "Mi irányítunk a háttérből — Ön csak élvezi a pillanatokat." },
      ],
    },
    services: {
      label: "Szolgáltatások",
      title: "Amit kínálunk",
      items: [
        { title: "Esküvőszervezés", desc: "Teljes körű esküvőszervezés a helyszín kiválasztásától az utolsó virágszirmig." },
        { title: "Céges rendezvények", desc: "Gálák, csapatépítők, évfordulók — professzionális szervezéssel." },
        { title: "Magánrendezvények", desc: "Születésnapok, évfordulók, keresztelők — személyre szabott ünnepségek." },
        { title: "Dekoráció & Styling", desc: "Egyedi virágkompozíciók, tematikus dekorációk, helyszínkialakítás." },
      ],
    },
    partners: {
      label: "Partnereink",
      title: "Megbízható szakértői hálózat",
      subtitle: "Gondosan válogatott partnereinkkel garantáljuk a tökéletes kivitelezést.",
      items: ["Bella Florista", "Studio Light Photography", "Gourmet Catering Kft.", "Royal Music Group", "Luxury Venues Kft.", "Arte Décor Studio"],
    },
    beforeAfter: {
      label: "Átalakulás",
      title: "A helyszín, ahogy mi látjuk",
      subtitle: "Húzza a csúszkát és nézze meg a különbséget.",
      before: "Üres helyszín",
      after: "D-Events varázslata",
    },
    gallery: {
      label: "Galéria",
      title: "Pillanatok, amelyek örökre megmaradnak",
      tabs: ["Esküvők", "Céges", "Privát"],
    },
    calculator: {
      label: "Költségbecslő",
      title: "Mennyi az Ön rendezvénye?",
      guestLabel: "Vendégek száma",
      typeLabel: "Rendezvény típusa",
      types: ["Esküvő", "Céges rendezvény", "Magánrendezvény"],
      resultLabel: "Becsült keretek",
      disclaimer: "Tájékoztató jellegű becslés. A pontos ár az egyedi igényektől függ.",
      cta: "Személyes ajánlatot kérek",
    },
    faq: {
      label: "GYIK",
      title: "Gyakran Ismételt Kérdések",
      items: [
        { q: "Mennyi idővel előre kell foglalni?", a: "Esküvők esetén legalább 12–18 hónappal, céges rendezvényeknél 3–6 hónappal érdemes foglalni. A keresett dátumok hamar telnek — minél korábban veszi fel velünk a kapcsolatot, annál biztosabb a helye." },
        { q: "Mi szerepel a teljes körű szervezésben?", a: "A helyszín kiválasztástól a dekoráción, cateringen, fotóson és zenészen át az esemény teljes lebonyolításáig mindent intézünk Ön helyett. Egyetlen kapcsolattartóval dolgozik végig." },
        { q: "Hogyan zajlik az ajánlatadás?", a: "Az első konzultáció ingyenes és kötelezettségmentes. Ezt követően 3–5 munkanapon belül személyre szabott ajánlatot küldünk, amelyet igény szerint módosíthatunk." },
        { q: "Tudnak segíteni szűkösebb költségvetéssel is?", a: "Természetesen. Különböző szolgáltatási csomagjaink vannak, amelyeket az Ön igényeihez és keretéhez igazítunk. Az ár-érték arányt minden esetben maximalizáljuk." },
        { q: "Mi történik, ha változik a vendégszám?", a: "Rugalmasan alkalmazkodunk a változásokhoz. Az esetleges módosításokat a rendezvény előtt legalább 3–4 héttel jelezheti — ekkor még legtöbbször minden megoldható." },
      ],
    },
    testimonials: {
      label: "Vélemények",
      title: "Amit ügyfeleink mondanak",
      items: [
        { text: "A D-Events csapata minden várakozásunkat felülmúlta. Az esküvőnk tökéletes volt — minden részlet gondosan megtervezve, minden pillanat varázslatos.", name: "Kovács Anna & Péter", role: "Esküvői pár, 2024" },
        { text: "Céges gálánkat a D-Events szervezte, és a visszajelzések messze felülmúlták az eddigieket. Profi, kreatív, megbízható csapat.", name: "Dr. Nagy Gábor", role: "Ügyvezető, TechHub Kft." },
        { text: "Anyám 70. születésnapját egy álommá varázsolták. Minden vendégünk lenyűgözve távozott. Szívből ajánlom mindenkinek.", name: "Szabó Eszter", role: "Magánrendezvény, 2023" },
      ],
    },
    contact: {
      label: "Kapcsolat",
      title: "Kezdjük el együtt tervezni",
      subtitle: "Töltse ki az alábbi űrlapot és 24 órán belül felvesszük Önnel a kapcsolatot.",
      name: "Neve", email: "E-mail cím", phone: "Telefonszám", eventType: "Rendezvény típusa", message: "Üzenet",
      messagePlaceholder: "Meséljen az álmai rendezvényéről...",
      send: "Üzenet küldése",
      eventTypes: ["Esküvő", "Céges rendezvény", "Magánrendezvény", "Egyéb"],
      address: "Szigetszentmiklós, Pest megye", phoneNum: "+36 30 123 4567", emailAddr: "hello@d-events.hu",
    },
    footer: { copy: "© 2025 D-Events. Minden jog fenntartva.", tagline: "Ahol az álmok valósággá válnak." },
    sticky: "Álmai rendezvénye csak egy lépésre van.",
  },
  en: {
    nav: { about: "About", services: "Services", gallery: "Gallery", testimonials: "Testimonials", contact: "Contact" },
    hero: {
      tagline: "Every moment, perfectly crafted",
      subtitle: "Wedding & Event Planning",
      description: "We turn your dream day into reality — with meticulous care, personal attention, and a passion for elegance.",
      cta: "Request a Quote",
      ctaSecondary: "View Gallery",
    },
    about: {
      label: "About Us",
      title: "Where dreams become reality",
      p1: "The D-Events team believes every event tells a unique story. Whether it's an intimate wedding, a grand corporate gala, or a heartfelt birthday celebration — we think through every detail so you can focus on the experience.",
      p2: "With over a decade of experience and carefully selected partners, we guarantee your day will be an unforgettable memory.",
      stat1: { number: 200, suffix: "+", label: "Successful events" },
      stat2: { number: 10, suffix: "+", label: "Years experience" },
      stat3: { number: 98, suffix: "%", label: "Satisfied clients" },
    },
    process: {
      label: "Our Process",
      title: "The path to a perfect day",
      steps: [
        { num: "01", title: "Consultation", desc: "We get to know your vision and dreams in a personal meeting." },
        { num: "02", title: "Planning", desc: "We create a detailed proposal and moodboard tailored to your style." },
        { num: "03", title: "Coordination", desc: "We coordinate every partner, venue, and vendor for you." },
        { num: "04", title: "The Big Day", desc: "We work behind the scenes — you simply enjoy every moment." },
      ],
    },
    services: {
      label: "Services",
      title: "What we offer",
      items: [
        { title: "Wedding Planning", desc: "Full-service wedding coordination from venue selection to the last petal." },
        { title: "Corporate Events", desc: "Galas, team-buildings, anniversaries — professionally organised." },
        { title: "Private Celebrations", desc: "Birthdays, anniversaries, christenings — bespoke celebrations." },
        { title: "Décor & Styling", desc: "Custom floral arrangements, thematic décor, venue dressing." },
      ],
    },
    partners: {
      label: "Our Partners",
      title: "A trusted network of experts",
      subtitle: "Our carefully selected partners guarantee flawless execution.",
      items: ["Bella Florista", "Studio Light Photography", "Gourmet Catering", "Royal Music Group", "Luxury Venues", "Arte Décor Studio"],
    },
    beforeAfter: {
      label: "Transformation",
      title: "The venue as we see it",
      subtitle: "Drag the slider to see the difference.",
      before: "Empty venue",
      after: "D-Events magic",
    },
    gallery: {
      label: "Gallery",
      title: "Moments that last forever",
      tabs: ["Weddings", "Corporate", "Private"],
    },
    calculator: {
      label: "Cost Estimator",
      title: "How much will your event cost?",
      guestLabel: "Number of guests",
      typeLabel: "Event type",
      types: ["Wedding", "Corporate event", "Private celebration"],
      resultLabel: "Estimated budget",
      disclaimer: "This is an indicative estimate. The exact price depends on individual requirements.",
      cta: "Request a personalised quote",
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        { q: "How far in advance should I book?", a: "For weddings, we recommend at least 12–18 months in advance; for corporate events, 3–6 months. Popular dates fill up quickly — the sooner you get in touch, the better." },
        { q: "What's included in full-service planning?", a: "From venue selection through décor, catering, photography, and entertainment to full event management on the day — we handle everything. You'll have one dedicated contact throughout." },
        { q: "How does the quote process work?", a: "The first consultation is free and non-binding. Afterwards, we send a personalised proposal within 3–5 working days, which can be adjusted as needed." },
        { q: "Can you work with a tighter budget?", a: "Absolutely. We offer different service packages that we tailor to your needs and budget. We always maximise value for money." },
        { q: "What if the guest count changes?", a: "We adapt flexibly to changes. Any adjustments notified at least 3–4 weeks before the event can almost always be accommodated." },
      ],
    },
    testimonials: {
      label: "Testimonials",
      title: "What our clients say",
      items: [
        { text: "The D-Events team exceeded every expectation. Our wedding was perfect — every detail thoughtfully planned, every moment magical.", name: "Anna & Péter Kovács", role: "Wedding couple, 2024" },
        { text: "D-Events organised our corporate gala and the feedback far surpassed anything we'd received before. Professional, creative, reliable.", name: "Dr. Gábor Nagy", role: "CEO, TechHub Ltd." },
        { text: "They turned my mother's 70th birthday into a dream. Every guest left in awe. I wholeheartedly recommend them to everyone.", name: "Eszter Szabó", role: "Private event, 2023" },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's start planning together",
      subtitle: "Fill in the form below and we'll get back to you within 24 hours.",
      name: "Your name", email: "Email address", phone: "Phone number", eventType: "Event type", message: "Message",
      messagePlaceholder: "Tell us about your dream event...",
      send: "Send message",
      eventTypes: ["Wedding", "Corporate event", "Private celebration", "Other"],
      address: "Szigetszentmiklós, Pest County", phoneNum: "+36 30 123 4567", emailAddr: "hello@d-events.hu",
    },
    footer: { copy: "© 2025 D-Events. All rights reserved.", tagline: "Where dreams become reality." },
    sticky: "Your dream event is just one step away.",
  },
}

export type Lang = "hu" | "en"

// ─── Gallery photo sets ───────────────────────────────────────────────────────

export const galleryByType = [
  [
    { id: "1519741497674-611481863552", alt: "Esküvői asztal" },
    { id: "1511285560929-80b456fea0bc", alt: "Esküvői pár" },
    { id: "1469371670807-013ccf25f16a", alt: "Esküvői hangulat" },
    { id: "1523438885200-e635ba2c371e", alt: "Dekoráció" },
    { id: "1519167758481-83f550bb49b3", alt: "Helyszín" },
  ],
  [
    { id: "1540575467063-178a50c2df87", alt: "Céges gála" },
    { id: "1519167758481-83f550bb49b3", alt: "Konferencia terem" },
    { id: "1469371670807-013ccf25f16a", alt: "Csapatépítő" },
    { id: "1511285560929-80b456fea0bc", alt: "Évforduló" },
    { id: "1523438885200-e635ba2c371e", alt: "Díszterem" },
  ],
  [
    { id: "1523438885200-e635ba2c371e", alt: "Születésnap" },
    { id: "1511285560929-80b456fea0bc", alt: "Évforduló" },
    { id: "1519741497674-611481863552", alt: "Privát vacsora" },
    { id: "1469371670807-013ccf25f16a", alt: "Kerti party" },
    { id: "1540575467063-178a50c2df87", alt: "Ünnepség" },
  ],
]

// k HUF per guest: wedding / corporate / private
export const calcBases = [150, 80, 60]

export function formatBudget(guests: number, typeIdx: number): string {
  const totalM = (guests * calcBases[typeIdx]) / 1000
  return `${(totalM * 0.8).toFixed(1)} – ${(totalM * 1.2).toFixed(1)} M Ft`
}

