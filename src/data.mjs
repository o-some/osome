export const SHOP_URL = 'https://www.chelonaki.eu/shop';
export const CONTACT_EMAIL = 'info@o-some.de';
export const CONTACT_PHONE = '0171 2997495';
export const RECIPE_SLUG = '/blogs/rezepte/heute-entfuhren-wir-dich-kulinarisch-nach-griechenland-mit-einem-echten-klassiker-moussaka-herzhaft-aromatisch-und-perfekt-geschichtet-ein-wohlfuhlgericht-das-nicht-nur-nach-sommer-sondern-auch-nach-liebe-schmeckt-%F0%9F%92%9B';

// Current public O-SOME product pages, checked 2026-09-22. Marketing claims remain pending for launch.
export const products = [
  {slug:'charibee-pesto-zitrone-salbei',name:'Zitrone-Salbei',image:'zitrone.webp',color:'#F4D652',description:'Frische Zitrone und aromatischer Salbei verbinden sich zu einem hellen Pesto. Für Pasta, Brot oder zum Verfeinern von Saucen und Salaten.',source:'https://www.o-some.de/products/charibee-pesto-zitrone-salbei'},
  {slug:'o-some-taste-pesto-steinpilz',name:'Steinpilz',image:'steinpilz.webp',color:'#A88464',description:'Erdig und reichhaltig: Steinpilz und Cashewkerne geben diesem Pesto seinen intensiven Charakter. Für Pasta, Brot, Saucen und Eintöpfe.',source:'https://www.o-some.de/products/o-some-taste-pesto-steinpilz'},
  {slug:'o-some-taste-pesto-tomate',name:'Tomate',image:'tomate.webp',color:'#D96549',description:'Tomate und Cashewkerne treffen in einem aromatischen Pesto zusammen. Eine einfache Idee für Pasta, Brot und mediterrane Teller.',source:'https://www.o-some.de/products/o-some-taste-pesto-tomate'},
  {slug:'o-some-taste-pesto-basilikum',name:'Basilikum',image:'basilikum.webp',color:'#8AA65C',description:'Basilikum und Cashewkerne sorgen für einen intensiven, vertrauten Pestogeschmack. Passt zu Pasta, Brot, Saucen und Salaten.',source:'https://www.o-some.de/products/o-some-taste-pesto-basilikum'},
  {slug:'o-some-taste-pesto-kalamata-olive',name:'Kalamata-Olive',image:'kalamata.webp',color:'#B47A9B',description:'Kalamata-Oliven und Cashewkerne bringen einen kräftigen, herzhaften Geschmack auf den Teller. Für Pasta, Brot und mediterrane Gerichte.',source:'https://www.o-some.de/products/o-some-taste-pesto-kalamata-olive'},
  {slug:'o-some-taste-pesto-rucola',name:'Rucola',image:'rucola.webp',color:'#74A569',description:'Rucola gibt diesem Pesto eine frische, würzige Note. Eine gute Ergänzung für Pasta, Brot, Saucen und Salate.',source:'https://www.o-some.de/products/o-some-taste-pesto-rucola'},
  {slug:'o-some-taste-pesto-chili',name:'Chili',image:'chili-live.webp',color:'#D44B56',description:'Tomatenmark, Cashewkerne, Hartkäse und Chilischoten ergeben ein cremiges Pesto mit angenehmer Schärfe. Für Pasta, als Dip oder auf Brot.',source:'https://www.o-some.de/products/o-some-taste-pesto-chili'}
];

export const categories = [
  {name:'Pesto',path:'/collections/pesto',number:'01',image:'food-basilikum.webp',alt:'Pasta mit Basilikum und Tomaten',copy:'Nicht nur für Pasta. Sondern für deinen nächsten Lieblingsbissen.'},
  {name:'Dressings',path:'/collections/dressing',number:'02',image:'dressing-zitrone.webp',alt:'O-SOME TASTE Dressing Zitrone-Salbei',copy:'Frische Ideen für alles, was auf deinen Tisch kommt.'},
  {name:'Aioli',path:'/collections/aioli',number:'03',image:null,alt:'',copy:'Zum Dippen, Teilen und Noch-einmal-Zugreifen.'}
];

// Linked from the current homepage, but neither item appears in the live Dressing collection (available=false).
export const dressingArchive = [
  {slug:'dressing-zitrone-salbei',name:'Zitrone-Salbei',image:'dressing-zitrone.webp',color:'#F0D975',description:'Zitrone und Salbei geben diesem Dressing seinen frischen, würzigen Charakter.',source:'https://www.o-some.de/products/dressing-zitrone-salbei'},
  {slug:'dressing-limette-minze',name:'Limette-Minze',image:'dressing-limette.webp',color:'#89C8AC',description:'Limette und Minze waren die geschmackliche Idee dieses O-SOME-Dressings.',source:'https://www.o-some.de/products/dressing-limette-minze'}
];
