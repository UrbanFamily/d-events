// The four service pages. Each one answers a distinct search ("esküvőszervező
// Budapest", "céges rendezvényszervezés Pest megye" …), so each has its own
// title, introduction, scope and questions rather than one shared template text.

export type Service = {
  slug: string
  /** Matches the event type the quote wizard preselects. */
  wizardType: "wedding" | "corporate" | "private" | "decor"
  navLabel: string
  title: string
  metaTitle: string
  metaDescription: string
  heroImage: string
  lead: string
  intro: string[]
  includes: string[]
  packages: { name: string; desc: string }[]
  faq: { q: string; a: string }[]
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

export const SERVICES: Service[] = [
  {
    slug: "eskuvoszervezes",
    wizardType: "wedding",
    navLabel: "Esküvőszervezés",
    title: "Esküvőszervezés Budapesten és Pest megyében",
    metaTitle: "Esküvőszervező Budapest és Pest megye – teljes körű esküvőszervezés",
    metaDescription:
      "Teljes körű vagy részleges esküvőszervezés és napi koordináció Budapesten, Szigetszentmiklóson és Pest megyében. Helyszín, dekoráció, szolgáltatók – egy kapcsolattartóval.",
    heroImage: img("1519741497674-611481863552"),
    lead: "A helyszínkereséstől az utolsó táncig: mi tartjuk a szálakat, Önök pedig a nagy napra figyelhetnek.",
    intro: [
      "Egy esküvő megszervezése átlagosan több száz döntést és tucatnyi szolgáltatóval való egyeztetést jelent. Esküvőszervezőként ezt a terhet vesszük le a párokról: segítünk megtalálni a stílusukhoz és keretükhöz illő helyszínt, összeállítjuk a szolgáltatói csapatot, és a nap folyamán a háttérből irányítunk mindent.",
      "Budapesten, Szigetszentmiklóson, a Csepel-szigeten és Pest megye más településein is dolgozunk – kastélyszállótól a kerti esküvőig. Az első konzultáció ingyenes, utána személyre szabott ajánlatot küldünk.",
    ],
    includes: [
      "Helyszínkeresés és -bejárás, szerződéskötés előtti ellenőrzés",
      "Költségterv és nyomon követés, hogy a keret ne csússzon el",
      "Szolgáltatók ajánlása és koordinálása: catering, fotós, videós, zenekar/DJ, virágos, torta",
      "Arculat, színvilág, dekoráció és helyszínberendezés",
      "Részletes forgatókönyv és ültetési rend",
      "Ceremónia és lagzi levezénylése a helyszínen, a nap végéig",
    ],
    packages: [
      { name: "Teljes körű szervezés", desc: "Az eljegyzéstől a nagy napig minden lépésben együtt dolgozunk – ajánlott, ha kevés az idő vagy sok a vendég." },
      { name: "Részleges szervezés", desc: "Ha a helyszín és néhány szolgáltató már megvan, a hiányzó részeket és a koordinációt vesszük át." },
      { name: "Napi koordináció", desc: "Az utolsó hetekben átvesszük a forgatókönyvet, a nagy napon pedig mi irányítunk, hogy Önöknek csak ünnepelni kelljen." },
    ],
    faq: [
      { q: "Mennyivel előre érdemes esküvőszervezőt választani?", a: "Ideális esetben 12–18 hónappal az esküvő előtt, mert a népszerű helyszínek és szolgáltatók ennyivel előre telnek be. Rövidebb határidővel is vállalunk esküvőt, ilyenkor a rugalmasabb dátum sokat segít." },
      { q: "Vidéki vagy Budapesten kívüli helyszínt is vállalnak?", a: "Igen. Budapesten és Pest megyében dolgozunk a legtöbbet, de ennél távolabbi helyszínre is szívesen elmegyünk – az utazási költséget az ajánlatban külön jelezzük." },
      { q: "Hogyan áll össze az esküvőszervezés díja?", a: "A díj a választott csomagtól, a vendégszámtól és a szervezés összetettségétől függ. Az első konzultáció után tételes ajánlatot küldünk, rejtett költségek nélkül." },
    ],
  },
  {
    slug: "ceges-rendezvenyszervezes",
    wizardType: "corporate",
    navLabel: "Céges rendezvények",
    title: "Céges rendezvényszervezés Budapesten és Pest megyében",
    metaTitle: "Céges rendezvényszervezés Budapest – gála, csapatépítő, évzáró",
    metaDescription:
      "Céges gálák, évzárók, csapatépítők és jubileumi rendezvények szervezése Budapesten és Pest megyében. Helyszín, catering, technika és program egy kézből.",
    heroImage: img("1540575467063-178a50c2df87"),
    lead: "Rendezvény, amire a kollégák és a partnerek is szívesen emlékeznek – határidőre, keretben.",
    intro: [
      "Egy céges rendezvény egyszerre szolgálja a csapatot, a márkát és a partnerkapcsolatokat. Mi a cél megértésével kezdünk: ünneplés, motiváció, termékbemutató vagy ügyféltalálkozó – és ehhez igazítjuk a helyszínt, a programot és a hangulatot.",
      "Évzárókat, gálavacsorákat, csapatépítőket, jubileumi és családi napokat szervezünk Budapesten és Pest megyében, 20 fős vezetői vacsorától több száz fős rendezvényig.",
    ],
    includes: [
      "Briefing és célmeghatározás, rendezvénykoncepció",
      "Helyszín, catering, hang- és fénytechnika, színpad",
      "Program: műsorvezető, fellépők, csapatépítő játékok",
      "Arculatra szabott dekoráció és nyomtatott anyagok",
      "Vendégkezelés, regisztráció, ültetési rend",
      "Helyszíni produkciós vezetés és utólagos elszámolás",
    ],
    packages: [
      { name: "Kulcsrakész rendezvény", desc: "Az ötlettől az elszámolásig mindent mi intézünk, Önnek egy kapcsolattartója van." },
      { name: "Produkció és koordináció", desc: "Ha a helyszín már megvan, a technikát, a programot és a helyszíni lebonyolítást vállaljuk." },
      { name: "Visszatérő rendezvények", desc: "Évente ismétlődő eseményeknél (évzáró, családi nap) a korábbi tapasztalatokra építve tervezünk." },
    ],
    faq: [
      { q: "Mennyi idő kell egy céges rendezvény megszervezéséhez?", a: "Kisebb rendezvényhez 4–8 hét, nagyobb gálához vagy évzáróhoz 3–6 hónap az ideális. Az év végi időszakban a helyszínek korán betelnek, ezért ott érdemes hamarabb kezdeni." },
      { q: "Tudnak számlát adni cégnek, és szerződést kötni?", a: "Igen, minden megbízásról írásos szerződés és cégre szóló számla készül." },
      { q: "Vállalnak hétköznapi vagy rövid határidős rendezvényt?", a: "Igen, amennyiben a helyszín és a szolgáltatók elérhetők. Kérjen ajánlatot, és rövid időn belül jelezzük, megvalósítható-e." },
    ],
  },
  {
    slug: "maganrendezveny-szervezes",
    wizardType: "private",
    navLabel: "Magánrendezvények",
    title: "Születésnap, évforduló és családi ünnep szervezése",
    metaTitle: "Magánrendezvény szervezés – születésnap, évforduló, keresztelő | Budapest",
    metaDescription:
      "Kerek születésnapok, évfordulók, keresztelők, ballagások és meglepetésbulik szervezése Budapesten és Pest megyében, személyre szabott dekorációval.",
    heroImage: img("1523438885200-e635ba2c371e"),
    lead: "Ünnep, amin a házigazda is vendég lehet.",
    intro: [
      "Egy kerek születésnap, egy évforduló vagy egy keresztelő akkor igazán felszabadult, ha a házigazdának nem a terítéken, a tortán és az időzítésen kell járnia az eszének. Mi ezt vesszük át – a meglepetésbuli titoktartásával együtt.",
      "Otthon, kertben, étteremben vagy bérelt helyszínen is szervezünk, Budapesten, Szigetszentmiklóson és Pest megye más településein.",
    ],
    includes: [
      "Helyszín és catering, torta és édesasztal",
      "Tematikus dekoráció, virágok, fotófal",
      "Zene, fotós, gyerekprogram",
      "Meghívók és vendéglista-kezelés",
      "Meglepetés-forgatókönyv és helyszíni lebonyolítás",
    ],
    packages: [
      { name: "Teljes szervezés", desc: "A meghívótól a búcsúajándékig mindent mi intézünk." },
      { name: "Dekoráció és styling", desc: "Ha a helyszín és az étel megvan, a hangulatot és a berendezést vállaljuk." },
      { name: "Meglepetésbuli", desc: "Titokban szervezzük, az ünnepelt csak a helyszínen tud meg mindent." },
    ],
    faq: [
      { q: "Mekkora rendezvényt vállalnak?", a: "Már 10–15 fős, bensőséges ünnepséget is, egészen a nagyobb családi összejövetelekig." },
      { q: "Otthoni vagy kerti helyszínt is berendeznek?", a: "Igen – sátortól a világításon át a bútorbérlésig mindent megoldunk, és a végén el is pakolunk." },
      { q: "Mennyivel előre kell szólni?", a: "Kisebb ünnephez néhány hét is elég, kerek születésnaphoz vagy nagyobb családi eseményhez 2–3 hónappal előre ajánlott." },
    ],
  },
  {
    slug: "dekoracio-es-styling",
    wizardType: "decor",
    navLabel: "Dekoráció & Styling",
    title: "Esküvői és rendezvénydekoráció, helyszínberendezés",
    metaTitle: "Esküvői dekoráció és rendezvénydekoráció Budapest – virág, styling",
    metaDescription:
      "Esküvői és rendezvénydekoráció, virágkompozíciók, asztaldíszek, ceremónia-háttér és teljes helyszínberendezés Budapesten és Pest megyében.",
    heroImage: img("1469371670807-013ccf25f16a"),
    lead: "A helyszín, ahogy Önök megálmodták – az első virágtól az utolsó gyertyáig.",
    intro: [
      "A dekoráció adja egy rendezvény első benyomását és a fotók hangulatát. Moodboarddal kezdünk: színvilág, anyagok, virágok és fények, hogy a végeredmény egységes és személyes legyen.",
      "Önállóan is vállaljuk a dekorációt, ha a szervezés többi részét a pár vagy a cég maga intézi – a beállítást és a bontást is beleértve.",
    ],
    includes: [
      "Moodboard és színvilág",
      "Virágkompozíciók: menyasszonyi csokor, asztaldíszek, ceremónia-dekoráció",
      "Ceremónia-háttér, fotófal, belépő",
      "Asztalterítés, textíliák, gyertyák és fények",
      "Helyszínberendezés, beállítás és bontás",
    ],
    packages: [
      { name: "Teljes helyszínberendezés", desc: "A ceremóniától a vacsoráig minden teret egységes arculatban rendezünk be." },
      { name: "Virág és asztal", desc: "Csokrok, asztaldíszek és terítés – ha a helyszín már adott." },
      { name: "Ceremónia-dekoráció", desc: "Háttér, oltár, széksorok és belépő a szertartáshoz." },
    ],
    faq: [
      { q: "Csak dekorációt is vállalnak, szervezés nélkül?", a: "Igen, a dekoráció önállóan is megrendelhető, beállítással és bontással együtt." },
      { q: "Láthatjuk előre, hogyan fog kinézni?", a: "Igen: moodboardot és szükség esetén mintaasztalt készítünk, hogy a döntés előtt lássák az irányt." },
      { q: "Saját elképzelésünket is meg tudják valósítani?", a: "Természetesen – a saját ötleteikből indulunk ki, és szakmai tanácsokkal egészítjük ki." },
    ],
  },
]

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)
