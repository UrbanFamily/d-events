// Planning guides. They answer what people type before they look for a
// planner ("esküvő szervezése lépésről lépésre", "mennyibe kerül egy esküvő"),
// which is where a small business can rank. Advice only: no invented clients,
// figures or quotes.

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  description: string
  published: string
  updated?: string
  readingMinutes: number
  image: string
  /** The service page this guide leads to. */
  relatedService: string
  body: BlogBlock[]
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

export const POSTS: BlogPost[] = [
  {
    slug: "eskuvo-szervezese-lepesrol-lepesre",
    title: "Esküvő szervezése lépésről lépésre: 12 hónapos idővonal",
    description:
      "Mit mikor érdemes lefoglalni egy esküvőhöz? Hónapról hónapra lebontott teendőlista a helyszíntől a köszönőkártyákig.",
    published: "2026-10-30",
    readingMinutes: 7,
    image: img("1511285560929-80b456fea0bc"),
    relatedService: "eskuvoszervezes",
    body: [
      { type: "p", text: "Az esküvőszervezés legnagyobb kihívása nem egy-egy döntés, hanem a sorrend: ami későn kerül sorra, arra már nem marad szabad helyszín vagy szolgáltató. Az alábbi idővonal egy átlagos, 80–120 fős esküvőhöz készült – rövidebb felkészülésnél a lépések összecsúsznak, de a sorrend ugyanaz marad." },
      { type: "h2", text: "12–10 hónappal előtte: a keretek" },
      { type: "ul", items: [
        "Döntsétek el a nagyjából vendégszámot és a teljes keretet – ez határozza meg a helyszínt.",
        "Válasszatok 2–3 lehetséges dátumot; a rugalmasság sokszor jobb helyszínt jelent.",
        "Nézzetek meg helyszíneket, és foglaljátok le azt, amelyik a vendégszámhoz és a stílushoz is illik.",
        "Ha szerveztek esküvőszervezőt, most érdemes – a helyszínválasztásban már sokat segít.",
      ] },
      { type: "h2", text: "9–7 hónappal előtte: a kulcsszolgáltatók" },
      { type: "ul", items: [
        "Fotós és videós: a jók egy évre előre beteltek, ezért ők az elsők.",
        "Zenekar vagy DJ, ceremóniamester.",
        "Catering, ha a helyszín nem biztosítja.",
        "Mentsd a dátumot (save the date) üzenet a vendégeknek, főleg ha sokan utaznak.",
      ] },
      { type: "h2", text: "6–4 hónappal előtte: a részletek" },
      { type: "ul", items: [
        "Ruhapróbák, öltöny, kiegészítők.",
        "Dekoráció és virágok: moodboard, színvilág, ajánlatkérés.",
        "Torta- és menükóstoló.",
        "Meghívók tervezése és nyomtatása.",
      ] },
      { type: "h2", text: "3–1 hónappal előtte: a véglegesítés" },
      { type: "ul", items: [
        "Meghívók kiküldése, visszajelzések gyűjtése.",
        "Polgári szertartás időpontja, szükséges dokumentumok az anyakönyvvezetőnél.",
        "Forgatókönyv a nappal: ki mikor érkezik, mikor van vacsora, nyitótánc, torta.",
        "Ültetési rend, a végleges létszám leadása a helyszínnek és a cateringnek.",
      ] },
      { type: "h2", text: "Az utolsó két hét" },
      { type: "ul", items: [
        "Minden szolgáltatónak elküldeni a forgatókönyvet és a kapcsolattartó telefonszámát.",
        "Kijelölni egy személyt (tanú, barát vagy szervező), akit a napon kérdezni lehet – nem a párt.",
        "Ruhák, gyűrűk, dokumentumok egy helyre készítve.",
      ] },
      { type: "h2", text: "Mikor érdemes szervezőt bevonni?" },
      { type: "p", text: "Ha kevés az idő, sok a vendég, a helyszín messze van, vagy egyszerűen nem szeretnétek a nagy napon telefonon egyeztetni, egy esküvőszervező sok terhet levesz rólatok. Napi koordinációt akkor is érdemes kérni, ha mindent magatok szerveztetek: így a napon valaki más felel azért, hogy minden a forgatókönyv szerint menjen." },
    ],
  },
  {
    slug: "mennyibe-kerul-egy-eskuvo",
    title: "Mennyibe kerül egy esküvő? Így tervezzétek meg a költségvetést",
    description:
      "Mi határozza meg egy esküvő költségét, milyen arányban oszlik meg a keret, és hol lehet okosan spórolni minőségromlás nélkül?",
    published: "2026-10-30",
    readingMinutes: 6,
    image: img("1519167758481-83f550bb49b3"),
    relatedService: "eskuvoszervezes",
    body: [
      { type: "p", text: "Az esküvő költségét három tényező határozza meg a legjobban: a vendégszám, a helyszín és a szezon. Ugyanaz a nap száz vendéggel nagyságrendileg más költség, mint negyvennel, és egy júniusi szombat drágább, mint egy októberi péntek." },
      { type: "h2", text: "Kezdjétek a vendégszámmal" },
      { type: "p", text: "A legtöbb tétel – étel, ital, ültetés, meghívó, ajándék – fejenként számolódik. Ezért a vendéglista véglegesítése az első és legnagyobb hatású költségtervezési lépés. Érdemes két listát írni: akik nélkül nem lenne teljes a nap, és akiket szívesen látnátok, ha a keret engedi." },
      { type: "h2", text: "Így oszlik meg jellemzően a keret" },
      { type: "ul", items: [
        "Helyszín, étel és ital: a keret legnagyobb része, gyakran a fele.",
        "Fotó és videó: a megmaradó emlékek, itt nem érdemes a legolcsóbbat választani.",
        "Zene és program: a buli hangulatát leginkább ez határozza meg.",
        "Dekoráció és virág: a helyszín jellegétől függően sokat vagy keveset igényel.",
        "Ruhák, gyűrűk, szépségápolás.",
        "Tartalék: a teljes keret 5–10%-a a váratlan tételekre.",
      ] },
      { type: "h2", text: "Hol lehet okosan spórolni?" },
      { type: "ul", items: [
        "Szezonon kívüli vagy hétköznapi dátum: a helyszínek és szolgáltatók gyakran kedvezőbbek.",
        "Olyan helyszín, amely magában is szép – kevesebb dekorációt igényel.",
        "Kevesebb, de átgondolt dekorációs elem a sok apró helyett.",
        "A ceremónia és a vacsora egy helyszínen: megspórolható a szállítás és a második berendezés.",
      ] },
      { type: "h2", text: "Becslés, majd ajánlat" },
      { type: "p", text: "Az oldalunkon található költségbecslő a vendégszám és a rendezvénytípus alapján ad egy első tájékozódó keretet. A pontos összeg az egyedi igényektől függ – egy ingyenes konzultáció után tételes ajánlatot küldünk, amelyben minden költség látható." },
    ],
  },
  {
    slug: "ceges-rendezveny-szervezese-tippek",
    title: "Céges rendezvény szervezése: 10 kérdés, amit az elején érdemes tisztázni",
    description:
      "Évzáró, gála vagy csapatépítő előtt: a célok, a keret, a helyszín és a program kérdései, amelyeken egy céges rendezvény sikere múlik.",
    published: "2026-10-30",
    readingMinutes: 5,
    image: img("1540575467063-178a50c2df87"),
    relatedService: "ceges-rendezvenyszervezes",
    body: [
      { type: "p", text: "A legtöbb céges rendezvény nem a lebonyolításon csúszik el, hanem azon, hogy az elején nem volt kimondva, mit kell elérnie. Ezzel a tíz kérdéssel a briefing is gyorsabb lesz, és az ajánlatok is összehasonlíthatók." },
      { type: "ol", items: [
        "Mi a rendezvény célja: ünneplés, motiváció, csapatépítés, ügyfélkapcsolat vagy termékbemutató?",
        "Kik a vendégek, és hányan lesznek? Csak kollégák, vagy partnerek és családtagok is?",
        "Mi a teljes keret, és mi tartozik bele (utazás, szállás, ajándékok)?",
        "Mikor lesz? Az év végi hetekben a helyszínek hónapokkal előre betelnek.",
        "Milyen helyszín illik a célhoz: városi, zöldövezeti, egy teremben vagy több helyszínen?",
        "Milyen program kell: beszédek, díjátadó, fellépő, közös játék, kötetlen beszélgetés?",
        "Milyen technika szükséges: színpad, hangosítás, kivetítő, fénytechnika?",
        "Vannak étkezési igények (vegetáriánus, allergiák), amelyeket előre fel kell mérni?",
        "Hogyan jelenik meg a cég arculata: dekoráció, nyomtatott anyagok, ajándékok?",
        "Ki dönt a cégnél, és ki a kapcsolattartó a szervezés alatt?",
      ] },
      { type: "h2", text: "Miért éri meg külső szervezővel dolgozni?" },
      { type: "p", text: "Egy céges rendezvény megszervezése heteken át leköt valakit a csapatból. Egy rendezvényszervező ismeri a helyszíneket és a szolgáltatókat, egy kézben tartja az egyeztetéseket, a nap folyamán pedig a háttérből irányít – így a szervezők is a vendégekkel lehetnek." },
    ],
  },
]

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug)
