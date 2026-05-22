import { useState, useEffect, useCallback } from "react";

const C = { navy:"#0D1B2A", navy2:"#162436", gold:"#C4973A", gold2:"#D4A94A", cream:"#FAF7F2", cream2:"#F2EBE0", gray:"#7A7470", gray2:"#AFA8A0", border:"#E8E0D5" };
const AM_ICONS: Record<string,string> = {
  wifi:"📶", tv:"📺", netflix:"🎬", bluetooth:"🔊", phone:"📞",
  ac:"❄️", heating:"🔥", fireplace:"🪵", fan:"🌀", humidifier:"💧",
  kitchen:"🍳", fridge:"🧊", microwave:"📡", kettle:"☕", coffee:"☕",
  dishwasher:"🍽️", toaster:"🍞", oven:"🫕", blender:"🥤", wine_fridge:"🍷",
  bathrobe:"🥼", slippers:"🩴", towels:"🛁", hairdryer:"💨", iron:"👔",
  toiletries:"🧴", jacuzzi:"🛁", shower:"🚿",
  washer:"🫧", dryer:"🌀", ironing_board:"👕",
  parking:"🚗", ev_charger:"⚡", bike:"🚲", airport_shuttle:"🚌",
  elevator:"🛗", pool:"🏊", gym:"💪", sauna:"🧖", garden:"🌿",
  bbq:"🍖", terrace:"☀️", playground:"🛝", storage:"📦",
  breakfast:"🥐", room_service:"🛎️", concierge:"🎩", safe:"🔒",
  desk:"💼", crib:"👶", pets:"🐾", smoking_outside:"🚭",
  self_checkin:"🔑", cctv:"📷", fire_extinguisher:"🧯", first_aid:"🩺"
};
const ALL_AM = Object.keys(AM_ICONS);
const ADMIN_PASS = "BlueBee2024";
const SITE_PASS = "Bluebee421993";
const CONTACT0 = { phone:"+40 700 000 000", whatsapp:"+40 700 000 000", email:"contact@bluebeeapartments.ro", address:"Bulevardul Eroilor, Orăștie, 335700" };

const APTS0 = [
  { id:1, name:"BlueBee Hive", badge_ro:"Cu bucătărie", badge_en:"With kitchen", badge_fr:"Avec cuisine", badge_it:"Con cucina", price:270, maxGuests:5,
    priceTiers:[{guests:2,price:270},{guests:4,price:370},{guests:5,price:400}],
    desc:{ ro:"Apartament elegant cu dormitor, living spațios, baie modernă și bucătărie complet utilată. Perfect pentru sejururi prelungite sau familii care doresc confortul unui acasă departe de casă.", en:"Elegant apartment with bedroom, spacious living room, modern bathroom and fully equipped kitchen. Perfect for extended stays or families.", fr:"Appartement élégant avec chambre, grand salon, salle de bain moderne et cuisine entièrement équipée. Idéal pour les familles.", it:"Appartamento elegante con camera, ampio soggiorno, bagno moderno e cucina attrezzata. Perfetto per soggiorni prolungati." },
    amenities:["wifi","ac","tv","parking","kitchen","washer","fridge","microwave","kettle","coffee","bathrobe","slippers","hairdryer","towels"],
    photos:["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"] },
  { id:2, name:"BlueBee Nest", badge_ro:"Fără bucătărie", badge_en:"Without kitchen", badge_fr:"Sans cuisine", badge_it:"Senza cucina", price:250, maxGuests:4,
    priceTiers:[{guests:2,price:250},{guests:4,price:350}],
    desc:{ ro:"Apartament modern cu dormitor, living confortabil și baie elegantă. Ideal pentru city breaks și escapade de weekend în care contează fiecare detaliu.", en:"Modern apartment with bedroom, comfortable living room and elegant bathroom. Ideal for city breaks and weekend getaways.", fr:"Appartement moderne avec chambre, salon élégant et salle de bain bien équipée. Idéal pour les escapades.", it:"Appartamento moderno con camera, soggiorno elegante e bagno ben attrezzato. Ideale per city break." },
    amenities:["wifi","ac","tv","parking","washer","fridge","kettle","bathrobe","slippers","hairdryer","towels"],
    photos:["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80","https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80"] }
];

const TXT: Record<string,Record<string,string>> = {
  ro:{ home:"Acasă",apts:"Apartamente",contact:"Contact",book:"Rezervă",hero_sub:"Cazare elegantă în inima orașului",discover:"Descoperă",book_now:"Rezervă Acum",our_apts:"Apartamentele Noastre",from:"de la",per_night:"/ noapte",details:"Detalii",book_apt:"Rezervă",checkin:"Check-in",checkout:"Check-out",guests:"Oaspeți",total:"Total",nights:"nopți",night:"noapte",confirm:"Confirmă și Plătește",select_dates:"Selectează datele",ci_time:"Check-in: ora 15:00",co_time:"Check-out: ora 10:00",min_stay:"Sejur minim: 1 noapte",full_name:"Nume și prenume",email:"Email (opțional)",phone:"Telefon",payment:"Plată Securizată",card_nr:"Număr card",expiry:"LL/AA",cvc:"CVC",pay:"Plătește",success_title:"Rezervare Confirmată!",success_msg:"Vei fi contactat în scurt timp pentru confirmare.",contact_us:"Contactează-ne",contact_sub:"Suntem la dispoziția ta",back:"← Înapoi",max_g:"Max.",g_unit:"oaspeți",bedroom:"Dormitor",living:"Living",bathroom:"Baie",kitchen_lbl:"Bucătărie",amenities_lbl:"Facilități",addr_lbl:"Adresă",phone_lbl:"Telefon",email_lbl:"Email",wa_lbl:"WhatsApp",a_wifi:"WiFi",a_tv:"Smart TV",a_netflix:"Netflix",a_bluetooth:"Boxă Bluetooth",a_phone:"Telefon fix",a_ac:"Aer Condiționat",a_heating:"Încălzire",a_fireplace:"Șemineu",a_fan:"Ventilator",a_humidifier:"Umidificator",a_kitchen:"Bucătărie",a_fridge:"Frigider",a_microwave:"Cuptor microunde",a_kettle:"Fierbător apă",a_coffee:"Espressor",a_dishwasher:"Mașină de vase",a_toaster:"Toaster",a_oven:"Cuptor",a_blender:"Blender",a_wine_fridge:"Frigider vinuri",a_bathrobe:"Halat de baie",a_slippers:"Papuci de casă",a_towels:"Prosoape",a_hairdryer:"Uscător de păr",a_iron:"Fier de călcat",a_toiletries:"Articole toaletă",a_jacuzzi:"Jacuzzi",a_shower:"Duș",a_washer:"Mașină de spălat",a_dryer:"Uscător rufe",a_ironing_board:"Masă de călcat",a_parking:"Parcare",a_ev_charger:"Încărcare EV",a_bike:"Biciclete",a_airport_shuttle:"Transfer aeroport",a_elevator:"Lift",a_pool:"Piscină",a_gym:"Sală fitness",a_sauna:"Saună",a_garden:"Grădină",a_bbq:"Grătar",a_terrace:"Terasă",a_playground:"Loc de joacă",a_storage:"Depozitare bagaje",a_breakfast:"Mic dejun inclus",a_room_service:"Room service",a_concierge:"Concierge",a_safe:"Seif",a_desk:"Birou de lucru",a_crib:"Pătuț copil",a_pets:"Animale acceptate",a_smoking_outside:"Fumat permis afară",a_self_checkin:"Check-in autonom",a_cctv:"Camere securitate",a_fire_extinguisher:"Stingător incendiu",a_first_aid:"Trusă prim ajutor" },
  en:{ home:"Home",apts:"Apartments",contact:"Contact",book:"Book",hero_sub:"Elegant accommodation in the heart of the city",discover:"Discover",book_now:"Book Now",our_apts:"Our Apartments",from:"from",per_night:"/ night",details:"Details",book_apt:"Book",checkin:"Check-in",checkout:"Check-out",guests:"Guests",total:"Total",nights:"nights",night:"night",confirm:"Confirm & Pay",select_dates:"Select dates",ci_time:"Check-in: 3:00 PM",co_time:"Check-out: 10:00 AM",min_stay:"Minimum stay: 1 night",full_name:"Full name",email:"Email (optional)",phone:"Phone",payment:"Secure Payment",card_nr:"Card number",expiry:"MM/YY",cvc:"CVC",pay:"Pay",success_title:"Booking Confirmed!",success_msg:"You will be contacted shortly for confirmation.",contact_us:"Contact Us",contact_sub:"We are here for you",back:"← Back",max_g:"Max.",g_unit:"guests",bedroom:"Bedroom",living:"Living room",bathroom:"Bathroom",kitchen_lbl:"Kitchen",amenities_lbl:"Amenities",addr_lbl:"Address",phone_lbl:"Phone",email_lbl:"Email",wa_lbl:"WhatsApp",a_wifi:"WiFi",a_tv:"Smart TV",a_netflix:"Netflix",a_bluetooth:"Bluetooth Speaker",a_phone:"Landline",a_ac:"Air Conditioning",a_heating:"Heating",a_fireplace:"Fireplace",a_fan:"Fan",a_humidifier:"Humidifier",a_kitchen:"Kitchen",a_fridge:"Fridge",a_microwave:"Microwave",a_kettle:"Kettle",a_coffee:"Espresso Machine",a_dishwasher:"Dishwasher",a_toaster:"Toaster",a_oven:"Oven",a_blender:"Blender",a_wine_fridge:"Wine Fridge",a_bathrobe:"Bathrobe",a_slippers:"Slippers",a_towels:"Towels",a_hairdryer:"Hair Dryer",a_iron:"Iron",a_toiletries:"Toiletries",a_jacuzzi:"Jacuzzi",a_shower:"Shower",a_washer:"Washing Machine",a_dryer:"Dryer",a_ironing_board:"Ironing Board",a_parking:"Parking",a_ev_charger:"EV Charger",a_bike:"Bikes",a_airport_shuttle:"Airport Shuttle",a_elevator:"Elevator",a_pool:"Pool",a_gym:"Gym",a_sauna:"Sauna",a_garden:"Garden",a_bbq:"BBQ",a_terrace:"Terrace",a_playground:"Playground",a_storage:"Luggage Storage",a_breakfast:"Breakfast",a_room_service:"Room Service",a_concierge:"Concierge",a_safe:"Safe",a_desk:"Work Desk",a_crib:"Baby Crib",a_pets:"Pets Allowed",a_smoking_outside:"Smoking Outside",a_self_checkin:"Self Check-in",a_cctv:"CCTV",a_fire_extinguisher:"Fire Extinguisher",a_first_aid:"First Aid Kit" },
  fr:{ home:"Accueil",apts:"Appartements",contact:"Contact",book:"Réserver",hero_sub:"Hébergement élégant au cœur de la ville",discover:"Découvrir",book_now:"Réserver",our_apts:"Nos Appartements",from:"à partir de",per_night:"/ nuit",details:"Détails",book_apt:"Réserver",checkin:"Arrivée",checkout:"Départ",guests:"Voyageurs",total:"Total",nights:"nuits",night:"nuit",confirm:"Confirmer et Payer",select_dates:"Sélectionner les dates",ci_time:"Arrivée: 15h00",co_time:"Départ: 10h00",min_stay:"Séjour minimum: 1 nuit",full_name:"Nom complet",email:"Email (optionnel)",phone:"Téléphone",payment:"Paiement Sécurisé",card_nr:"Numéro de carte",expiry:"MM/AA",cvc:"CVC",pay:"Payer",success_title:"Réservation Confirmée!",success_msg:"Vous serez contacté prochainement pour confirmation.",contact_us:"Nous Contacter",contact_sub:"Nous sommes à votre disposition",back:"← Retour",max_g:"Max.",g_unit:"voyageurs",bedroom:"Chambre",living:"Salon",bathroom:"Salle de bain",kitchen_lbl:"Cuisine",amenities_lbl:"Équipements",addr_lbl:"Adresse",phone_lbl:"Téléphone",email_lbl:"Email",wa_lbl:"WhatsApp",a_wifi:"WiFi",a_tv:"Smart TV",a_netflix:"Netflix",a_bluetooth:"Enceinte Bluetooth",a_phone:"Téléphone fixe",a_ac:"Climatisation",a_heating:"Chauffage",a_fireplace:"Cheminée",a_fan:"Ventilateur",a_humidifier:"Humidificateur",a_kitchen:"Cuisine",a_fridge:"Réfrigérateur",a_microwave:"Micro-ondes",a_kettle:"Bouilloire",a_coffee:"Machine à café",a_dishwasher:"Lave-vaisselle",a_toaster:"Grille-pain",a_oven:"Four",a_blender:"Mixeur",a_wine_fridge:"Cave à vins",a_bathrobe:"Peignoir",a_slippers:"Chaussons",a_towels:"Serviettes",a_hairdryer:"Sèche-cheveux",a_iron:"Fer à repasser",a_toiletries:"Articles de toilette",a_jacuzzi:"Jacuzzi",a_shower:"Douche",a_washer:"Lave-linge",a_dryer:"Sèche-linge",a_ironing_board:"Planche à repasser",a_parking:"Parking",a_ev_charger:"Borne EV",a_bike:"Vélos",a_airport_shuttle:"Navette aéroport",a_elevator:"Ascenseur",a_pool:"Piscine",a_gym:"Salle de sport",a_sauna:"Sauna",a_garden:"Jardin",a_bbq:"Barbecue",a_terrace:"Terrasse",a_playground:"Aire de jeux",a_storage:"Consigne bagages",a_breakfast:"Petit-déjeuner",a_room_service:"Service en chambre",a_concierge:"Conciergerie",a_safe:"Coffre-fort",a_desk:"Bureau",a_crib:"Lit bébé",a_pets:"Animaux acceptés",a_smoking_outside:"Fumeurs dehors",a_self_checkin:"Arrivée autonome",a_cctv:"Vidéosurveillance",a_fire_extinguisher:"Extincteur",a_first_aid:"Trousse de secours" },
  it:{ home:"Home",apts:"Appartamenti",contact:"Contatti",book:"Prenota",hero_sub:"Alloggio elegante nel cuore della città",discover:"Scopri",book_now:"Prenota Ora",our_apts:"I Nostri Appartamenti",from:"da",per_night:"/ notte",details:"Dettagli",book_apt:"Prenota",checkin:"Check-in",checkout:"Check-out",guests:"Ospiti",total:"Totale",nights:"notti",night:"notte",confirm:"Conferma e Paga",select_dates:"Seleziona le date",ci_time:"Check-in: 15:00",co_time:"Check-out: 10:00",min_stay:"Soggiorno minimo: 1 notte",full_name:"Nome completo",email:"Email (opzionale)",phone:"Telefono",payment:"Pagamento Sicuro",card_nr:"Numero carta",expiry:"MM/AA",cvc:"CVC",pay:"Paga",success_title:"Prenotazione Confermata!",success_msg:"Sarai contattato a breve per la conferma.",contact_us:"Contattaci",contact_sub:"Siamo a tua disposizione",back:"← Indietro",max_g:"Max.",g_unit:"ospiti",bedroom:"Camera da letto",living:"Soggiorno",bathroom:"Bagno",kitchen_lbl:"Cucina",amenities_lbl:"Servizi",addr_lbl:"Indirizzo",phone_lbl:"Telefono",email_lbl:"Email",wa_lbl:"WhatsApp",a_wifi:"WiFi",a_tv:"Smart TV",a_netflix:"Netflix",a_bluetooth:"Cassa Bluetooth",a_phone:"Telefono fisso",a_ac:"Aria Condizionata",a_heating:"Riscaldamento",a_fireplace:"Camino",a_fan:"Ventilatore",a_humidifier:"Umidificatore",a_kitchen:"Cucina",a_fridge:"Frigorifero",a_microwave:"Microonde",a_kettle:"Bollitore",a_coffee:"Macchina caffè",a_dishwasher:"Lavastoviglie",a_toaster:"Tostapane",a_oven:"Forno",a_blender:"Frullatore",a_wine_fridge:"Cantinetta vini",a_bathrobe:"Accappatoio",a_slippers:"Pantofole",a_towels:"Asciugamani",a_hairdryer:"Asciugacapelli",a_iron:"Ferro da stiro",a_toiletries:"Articoli da toilette",a_jacuzzi:"Jacuzzi",a_shower:"Doccia",a_washer:"Lavatrice",a_dryer:"Asciugatrice",a_ironing_board:"Asse da stiro",a_parking:"Parcheggio",a_ev_charger:"Ricarica EV",a_bike:"Biciclette",a_airport_shuttle:"Navetta aeroporto",a_elevator:"Ascensore",a_pool:"Piscina",a_gym:"Palestra",a_sauna:"Sauna",a_garden:"Giardino",a_bbq:"Barbecue",a_terrace:"Terrazza",a_playground:"Area giochi",a_storage:"Deposito bagagli",a_breakfast:"Colazione",a_room_service:"Servizio in camera",a_concierge:"Concierge",a_safe:"Cassaforte",a_desk:"Scrivania",a_crib:"Culla",a_pets:"Animali ammessi",a_smoking_outside:"Fumatori fuori",a_self_checkin:"Check-in autonomo",a_cctv:"Videosorveglianza",a_fire_extinguisher:"Estintore",a_first_aid:"Kit pronto soccorso" }
};

const toStr = (d: Date) => d.toISOString().split('T')[0];
const todayStr = () => toStr(new Date());
const addDays = (s: string, n: number) => { const d=new Date(s); d.setDate(d.getDate()+n); return toStr(d); };
const diffDays = (a: string, b: string) => Math.round((new Date(b).getTime()-new Date(a).getTime())/86400000);
const fmtDate = (s: string) => new Date(s).toLocaleDateString('ro-RO',{day:'2-digit',month:'short',year:'numeric'});
const getPriceForGuests = (apt: Apt, guests: number) => {
  if(!apt.priceTiers||apt.priceTiers.length===0) return apt.price;
  const tier = apt.priceTiers.find(t=>guests<=t.guests);
  return tier ? tier.price : apt.priceTiers[apt.priceTiers.length-1].price;
};
const MONTHS = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
const MONTHS_SHORT = ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'];

const BbLogo = ({size=44}:{size?:number}) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{flexShrink:0}}>
    <circle cx="50" cy="50" r="47" fill="#0D1B2A" stroke="#C4973A" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(196,151,58,0.2)" strokeWidth=".5"/>
    <text x="50" y="47" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fontWeight="400">
      <tspan fill="#ffffff">Blue</tspan><tspan fill="#C4973A">Bee</tspan>
    </text>
    <text x="50" y="57.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" fill="rgba(196,151,58,0.75)" letterSpacing="3">APARTMENTS</text>
    <line x1="17" y1="62" x2="33" y2="62" stroke="#C4973A" strokeWidth=".6" opacity=".55"/>
    <line x1="67" y1="62" x2="83" y2="62" stroke="#C4973A" strokeWidth=".6" opacity=".55"/>
  </svg>
);

function monthDays(y: number, m: number){
  const first=new Date(y,m,1).getDay(), last=new Date(y,m+1,0).getDate();
  const days: (string|null)[] = [];
  for(let i=0;i<first;i++) days.push(null);
  for(let d=1;d<=last;d++) days.push(toStr(new Date(y,m,d)));
  return days;
}

const lsGet = (key: string) => { try { return localStorage.getItem(key); } catch(e) { return null; } };
const lsSet = (key: string, val: string) => { try { localStorage.setItem(key, val); } catch(e) {} };

interface PriceTier { guests:number; price:number; }
interface Apt { id:number; name:string; badge_ro:string; badge_en:string; badge_fr:string; badge_it:string; price:number; maxGuests:number; priceTiers:PriceTier[]; desc:Record<string,string>; amenities:string[]; photos:string[]; ical_booking?:string; ical_travelminit?:string; }
interface Bk { aptId:number|null; checkin:string|null; checkout:string|null; step:number; }
interface Guest { name:string; email:string; phone:string; guests:number; }
interface Booking { id:number; aptId:number|null; aptName:string; checkin:string|null; checkout:string|null; name:string; email:string; phone:string; guests:number; total:number; date:string; status:string; }
interface Contact { phone:string; whatsapp:string; email:string; address:string; }

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Jost:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--navy:#0D1B2A;--gold:#C4973A;--gold2:#D4A94A;--cream:#FAF7F2;--cream2:#F0E8DC;--gray:#7A7470;--gray2:#AFA8A0;--border:#E8E0D5}
.bb{font-family:'Jost',sans-serif;color:#1C1714;background:var(--cream);min-height:100vh;overflow-x:hidden}
.nav{position:sticky;top:0;z-index:100;background:var(--navy);box-shadow:0 4px 32px rgba(0,0,0,.25);padding:0 36px;display:flex;align-items:center;justify-content:space-between;height:68px}
.navlogo{cursor:pointer;display:flex;align-items:center;gap:10px}
.navtxt{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:500;color:#fff;line-height:1.1}
.navtxt em{color:var(--gold);font-style:normal}
.navsub{font-size:7px;letter-spacing:3px;text-transform:uppercase;color:rgba(196,151,58,.65);display:block}
.navr{display:flex;align-items:center;gap:22px}
.nl{color:rgba(255,255,255,.7);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;background:none;border:none;font-family:'Jost',sans-serif;transition:color .2s}
.nl:hover{color:var(--gold)}
.nb{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#fff;padding:9px 22px;border-radius:24px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-weight:500;cursor:pointer;border:none;transition:all .3s;box-shadow:0 2px 12px rgba(196,151,58,.3)}
.nb:hover{box-shadow:0 4px 20px rgba(196,151,58,.5);transform:translateY(-1px)}
.lang{display:flex;gap:2px}
.lb{padding:3px 7px;border:1px solid transparent;border-radius:16px;font-size:10px;font-weight:500;cursor:pointer;background:none;transition:all .2s;font-family:'Jost',sans-serif}
.lb.on{border-color:var(--gold);color:var(--gold)}
.lb.off{color:rgba(255,255,255,.3)}
.lb.off:hover{color:rgba(255,255,255,.75)}
.hero{height:calc(100vh - 68px);min-height:540px;background:linear-gradient(150deg,#0a1520 0%,#1a3a5c 45%,#162030 100%);display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% 65%,rgba(196,151,58,.06) 0%,transparent 70%)}
.hc{position:relative;z-index:1;padding:0 24px;max-width:660px}
.hbadge{display:inline-flex;align-items:center;gap:9px;border:1px solid rgba(196,151,58,.3);color:rgba(196,151,58,.8);font-size:9px;letter-spacing:3px;text-transform:uppercase;padding:6px 18px;margin-bottom:26px;border-radius:24px;background:rgba(196,151,58,.04)}
.ht{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,9vw,96px);font-weight:300;color:#fff;line-height:.93;letter-spacing:-2px}
.ht em{color:var(--gold);font-style:italic}
.hs{color:rgba(255,255,255,.48);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:22px 0 36px;font-weight:300}
.hbtns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.bg{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#fff;border:none;padding:13px 34px;border-radius:28px;font-family:'Jost',sans-serif;font-weight:500;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .3s;box-shadow:0 4px 16px rgba(196,151,58,.3)}
.bg:hover{box-shadow:0 8px 28px rgba(196,151,58,.5);transform:translateY(-2px)}
.bg:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}
.bo{background:rgba(255,255,255,.05);color:rgba(255,255,255,.8);border:1px solid rgba(255,255,255,.18);padding:12px 34px;border-radius:28px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all .3s}
.bo:hover{border-color:rgba(255,255,255,.45);background:rgba(255,255,255,.09)}
.sec{padding:88px 40px;max-width:1160px;margin:0 auto}
.stitle{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,5vw,50px);font-weight:300;color:var(--navy);margin-bottom:9px;letter-spacing:-.5px}
.ssub{color:var(--gray2);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:52px;display:flex;align-items:center;gap:13px}
.ssub::after{content:'';display:block;height:1px;width:40px;background:linear-gradient(to right,var(--gold),transparent)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.card{background:#fff;border-radius:18px;overflow:hidden;cursor:pointer;transition:all .4s;box-shadow:0 2px 18px rgba(28,23,20,.07)}
.card:hover{box-shadow:0 22px 68px rgba(28,23,20,.14);transform:translateY(-6px)}
.cimgw{overflow:hidden;position:relative;height:272px}
.cimg{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s;cursor:zoom-in}
.card:hover .cimg{transform:scale(1.06)}
.cbadge{position:absolute;top:14px;left:14px;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#fff;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:5px 14px;border-radius:20px;box-shadow:0 2px 10px rgba(196,151,58,.45)}
.cimgw-btn{position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,.45);color:#fff;border:1px solid rgba(255,255,255,.3);padding:5px 12px;border-radius:20px;font-size:10px;letter-spacing:1px;cursor:pointer;backdrop-filter:blur(8px);font-family:'Jost',sans-serif;transition:all .2s}
.cimgw-btn:hover{background:rgba(196,151,58,.7);border-color:var(--gold)}
.cbody{padding:26px}
.cname{font-family:'Cormorant Garamond',serif;font-size:27px;color:var(--navy);margin-bottom:8px;letter-spacing:-.3px}
.cdesc{color:var(--gray);font-size:13px;line-height:1.75;margin-bottom:17px}
.cams{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.cam{font-size:11px;color:var(--navy);background:var(--cream2);padding:5px 11px;border-radius:18px;border:1px solid var(--border)}
.cfoot{display:flex;align-items:center;justify-content:space-between;padding-top:18px;border-top:1px solid var(--border)}
.cprice{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--navy);letter-spacing:-.5px}
.cprice span{font-family:'Jost',sans-serif;font-size:12px;color:var(--gray)}
.cbtns{display:flex;gap:8px}
.ob{background:transparent;color:var(--navy);border:1px solid var(--border);padding:8px 16px;border-radius:22px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.8px;text-transform:uppercase;cursor:pointer;transition:all .25s}
.ob:hover{border-color:var(--gold);color:var(--gold)}
.cbook{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#fff;border:none;padding:8px 16px;border-radius:22px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.8px;text-transform:uppercase;cursor:pointer;transition:all .3s;box-shadow:0 2px 10px rgba(196,151,58,.25)}
.cbook:hover{box-shadow:0 4px 18px rgba(196,151,58,.45);transform:translateY(-1px)}
.detail{padding-top:0}
.gal{position:relative;height:480px;background:#162436}
.galimg{width:100%;height:100%;object-fit:cover;display:block;cursor:zoom-in}
.galnav{position:absolute;bottom:18px;right:18px;display:flex;gap:7px}
.galbtn{width:40px;height:40px;background:rgba(255,255,255,.11);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.2);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:19px;border-radius:10px;transition:all .2s;font-family:inherit}
.galbtn:hover{background:var(--gold);border-color:var(--gold)}
.galcnt{position:absolute;bottom:18px;left:18px;color:#fff;font-size:11px;letter-spacing:1px;background:rgba(0,0,0,.3);padding:4px 12px;backdrop-filter:blur(8px);border-radius:18px}
.galthumbs{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:6px}
.galthumb{width:50px;height:35px;object-fit:cover;cursor:pointer;opacity:.4;border:2px solid transparent;border-radius:6px;transition:all .2s}
.galthumb.on{opacity:1;border-color:var(--gold)}
.dbody{display:grid;grid-template-columns:1fr 350px;gap:56px;max-width:1160px;margin:0 auto;padding:56px 40px}
.dtitle{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:300;color:var(--navy);margin-bottom:7px;letter-spacing:-1px}
.dbadge{display:inline-flex;align-items:center;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#fff;font-size:10px;letter-spacing:1px;padding:5px 13px;text-transform:uppercase;margin-bottom:16px;border-radius:18px}
.ddesc{color:var(--gray);font-size:14px;line-height:1.85;margin-bottom:34px}
.amlbl{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--navy);font-weight:600;margin-bottom:13px}
.amgrid{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:34px}
.amtag{display:flex;align-items:center;gap:7px;background:#fff;border:1px solid var(--border);padding:9px 15px;font-size:13px;border-radius:22px;box-shadow:0 1px 4px rgba(28,23,20,.04)}
.dinfo{background:var(--cream2);padding:22px;display:grid;grid-template-columns:1fr 1fr;gap:13px;border-radius:14px}
.dinforow{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray)}
.widget{background:#fff;border-radius:20px;padding:28px;position:sticky;top:20px;box-shadow:0 8px 40px rgba(28,23,20,.1)}
.wprice{font-family:'Cormorant Garamond',serif;font-size:40px;color:var(--navy);margin-bottom:4px;letter-spacing:-.5px}
.wprice span{font-family:'Jost',sans-serif;font-size:13px;color:var(--gray)}
.daterow{display:grid;grid-template-columns:1fr 1fr;gap:1px;border:1.5px solid var(--border);margin:16px 0;background:var(--border);cursor:pointer;border-radius:12px;overflow:hidden}
.df{background:#fff;padding:13px 15px;transition:background .2s}
.df:hover{background:var(--cream)}
.df label{display:block;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gray2);margin-bottom:4px;cursor:pointer}
.df span{font-size:13px;color:var(--navy);font-weight:500}
.winfo{display:flex;flex-direction:column;gap:6px;margin:13px 0;padding:13px;background:var(--cream);font-size:11px;color:var(--gray);border-radius:10px}
.wtotal{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-top:1px solid var(--border);margin-top:13px}
.wtlbl{font-size:11px;color:var(--gray);text-transform:uppercase;letter-spacing:1px}
.wtval{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--navy)}
.overlay{position:fixed;inset:0;background:rgba(10,15,24,.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(6px)}
.modal{background:#fff;border-radius:22px;padding:34px;max-width:510px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,.25)}
.mtitle{font-family:'Cormorant Garamond',serif;font-size:30px;color:var(--navy);margin-bottom:5px;letter-spacing:-.5px}
.msub{font-size:12px;color:var(--gray);margin-bottom:26px}
.calh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.calm{font-family:'Cormorant Garamond',serif;font-size:19px;color:var(--navy)}
.caln{width:32px;height:32px;border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:17px;transition:all .2s;font-family:inherit;border-radius:8px}
.caln:hover{background:var(--gold);color:#fff;border-color:var(--gold)}
.calg{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
.caldow{text-align:center;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--gray2);padding:6px 0}
.cald{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;border-radius:7px;transition:all .15s;border:1px solid transparent;min-width:0}
.cald:hover:not(.past):not(.bkd){background:var(--gold);color:#fff}
.cald.sel{background:var(--navy)!important;color:#fff!important}
.cald.range{background:rgba(196,151,58,.13);color:var(--navy)}
.cald.past{color:#ccc;cursor:not-allowed}
.cald.bkd{color:#ddd;cursor:not-allowed;background:repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(0,0,0,.04) 4px,rgba(0,0,0,.04) 8px)}
.cald.tod{border-color:var(--gold)}
.calsel{margin-top:13px;padding:10px 14px;background:var(--cream);font-size:11px;display:flex;justify-content:space-between;gap:8px;border-radius:10px}
.ff{margin-bottom:13px}
.ff label{display:block;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gray2);margin-bottom:5px}
.ff input{width:100%;border:1.5px solid var(--border);padding:10px 13px;font-size:13px;outline:none;transition:border-color .2s;font-family:'Jost',sans-serif;border-radius:9px;background:var(--cream)}
.ff input:focus{border-color:var(--gold);background:#fff}
.ff input.req{border-color:var(--gold)}
.paybox{background:var(--cream);padding:18px;margin:16px 0;border:1px solid var(--border);border-radius:13px}
.paytitle{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gray);margin-bottom:13px}
.cardrow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px}
.mbtns{display:flex;gap:9px;margin-top:14px}
.mbtns .bo{flex:1;color:var(--navy);border-color:var(--border);backdrop-filter:none}
.mbtns .bg{flex:2}
.success{text-align:center;padding:20px 0}
.contact{background:linear-gradient(160deg,var(--navy) 0%,#162436 100%);padding:88px 40px;position:relative;overflow:hidden}
.ctitle{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,5vw,50px);color:#fff;font-weight:300;margin-bottom:9px;text-align:center;letter-spacing:-.5px}
.csub{color:rgba(255,255,255,.32);font-size:9px;letter-spacing:3px;text-transform:uppercase;text-align:center;margin-bottom:50px}
.cgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1060px;margin:0 auto}
.citem{padding:30px 20px;border:1px solid rgba(255,255,255,.08);text-align:center;transition:all .3s;cursor:pointer;border-radius:16px;background:rgba(255,255,255,.025)}
.citem:hover{border-color:rgba(196,151,58,.38);background:rgba(196,151,58,.05);transform:translateY(-3px)}
.cicon{font-size:26px;margin-bottom:13px}
.clbl{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:7px}
.cval{color:#fff;font-size:13px}
.cval a{color:var(--gold);text-decoration:none}
.admin{min-height:100vh;background:var(--cream)}
.admin-nav{background:var(--navy);padding:0 32px;display:flex;gap:4px;align-items:center;overflow-x:auto}
.admin-tab{padding:18px 20px;color:rgba(255,255,255,.5);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;background:none;border:none;font-family:'Jost',sans-serif;border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap}
.admin-tab:hover{color:rgba(255,255,255,.8)}
.admin-tab.on{color:#fff;border-bottom-color:var(--gold)}
.awrap{max-width:1100px;margin:0 auto;padding:32px 20px}
.acard{background:#fff;border-radius:18px;padding:26px;margin-bottom:18px;box-shadow:0 2px 16px rgba(28,23,20,.07)}
.aaptname{font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--navy);margin-bottom:20px;display:flex;align-items:center;gap:9px}
.af{margin-bottom:13px}
.af label{display:block;font-size:9px;letter-spacing:1.5px;color:var(--gray2);text-transform:uppercase;margin-bottom:5px}
.af input,.af textarea{width:100%;border:1.5px solid var(--border);padding:8px 12px;font-size:13px;font-family:'Jost',sans-serif;outline:none;border-radius:8px;background:var(--cream)}
.af input:focus,.af textarea:focus{border-color:var(--gold);background:#fff}
.amtoggle{display:flex;flex-wrap:wrap;gap:7px}
.amt{display:flex;align-items:center;gap:5px;padding:6px 13px;border:1.5px solid var(--border);cursor:pointer;font-size:11px;transition:all .2s;user-select:none;border-radius:18px}
.amt.on{border-color:var(--gold);background:rgba(196,151,58,.08);color:var(--navy)}
.amt.off{color:var(--gray)}
.photolist{display:flex;flex-direction:column;gap:7px;margin-bottom:9px}
.prow{display:flex;gap:7px;align-items:center}
.prow img{width:42px;height:42px;object-fit:cover;border:1px solid var(--border);flex-shrink:0;border-radius:7px}
.prow input{flex:1;border:1.5px solid var(--border);padding:7px 11px;font-size:12px;font-family:'Jost',sans-serif;outline:none;border-radius:7px}
.pdel{background:none;border:1.5px solid #e5e7eb;width:28px;height:28px;cursor:pointer;color:#9ca3af;font-size:15px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:7px}
.pdel:hover{background:#fef2f2;color:#ef4444;border-color:#ef4444}
.savebtn{background:var(--navy);color:#fff;border:none;padding:12px 26px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;transition:all .3s;margin-top:13px;border-radius:22px}
.savebtn:hover{background:var(--gold)}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.stat{background:#fff;border-radius:16px;padding:22px;box-shadow:0 2px 16px rgba(28,23,20,.07);text-align:center}
.stat-num{font-family:'Cormorant Garamond',serif;font-size:40px;color:var(--navy);letter-spacing:-.5px}
.stat-lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gray2);margin-top:4px}
.admin-cal{background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(28,23,20,.07)}
.admin-cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.admin-cal-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--navy)}
.admin-cal-nav{display:flex;gap:8px;align-items:center}
.admin-cal-nbtn{width:32px;height:32px;border:1px solid var(--border);background:none;cursor:pointer;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .2s}
.admin-cal-nbtn:hover{background:var(--gold);color:#fff;border-color:var(--gold)}
.admin-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.admin-cal-dow{text-align:center;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--gray2);padding:6px 0}
.admin-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;border-radius:7px;border:1px solid transparent;position:relative;cursor:default;min-width:0}
.admin-day.free{background:rgba(34,197,94,.12);color:#15803d;font-weight:500}
.admin-day.occ{background:rgba(239,68,68,.12);color:#dc2626;font-weight:500}
.admin-day.past{color:#d1d5db;background:transparent}
.admin-day.tod{border-color:var(--gold)}
.cal-legend{display:flex;gap:16px;margin-top:14px;font-size:11px}
.cal-leg{display:flex;align-items:center;gap:6px}
.cal-dot{width:10px;height:10px;border-radius:50%}
.bk-tabs{display:flex;gap:4px;margin-bottom:20px}
.bk-tab{padding:10px 20px;border:1.5px solid var(--border);border-radius:22px;font-size:11px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;background:none;font-family:'Jost',sans-serif;transition:all .2s}
.bk-tab.on{background:var(--navy);color:#fff;border-color:var(--navy)}
.bk-tab.off{color:var(--gray)}
.bk-card{background:#fff;border-radius:14px;padding:20px;margin-bottom:12px;box-shadow:0 2px 12px rgba(28,23,20,.07);display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}
.bk-card.cancelled{opacity:.5}
.bk-name{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--navy);margin-bottom:4px}
.bk-info{font-size:12px;color:var(--gray);line-height:1.8}
.bk-info strong{color:var(--navy)}
.bk-dates{background:var(--cream);padding:10px 14px;border-radius:10px;font-size:12px;margin-top:8px;display:flex;gap:16px}
.bk-actions{display:flex;flex-direction:column;gap:8px;align-items:flex-end}
.bk-total{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--navy)}
.bk-status{font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:20px}
.bk-status.active{background:rgba(34,197,94,.12);color:#15803d}
.bk-status.cancelled{background:rgba(239,68,68,.1);color:#dc2626}
.bk-cancel{background:none;border:1px solid #fca5a5;color:#dc2626;padding:7px 14px;border-radius:18px;font-size:10px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;transition:all .2s}
.bk-cancel:hover{background:#fef2f2}
.loginwrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,var(--navy) 0%,#1a3a5c 100%)}
.loginbox{background:#fff;border-radius:22px;padding:50px 42px;width:100%;max-width:360px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.3)}
.llogo{font-family:'Cormorant Garamond',serif;font-size:28px;color:var(--navy);margin-bottom:5px}
.lsub{font-size:9px;letter-spacing:2px;color:var(--gray2);text-transform:uppercase;margin-bottom:34px}
.linput{width:100%;border:1.5px solid var(--border);padding:12px 15px;font-size:14px;outline:none;margin-bottom:13px;text-align:center;font-family:'Jost',sans-serif;border-radius:9px;background:var(--cream)}
.linput:focus{border-color:var(--gold);background:#fff}
.lerr{color:#ef4444;font-size:12px;margin-bottom:11px}
.backbtn{display:inline-flex;align-items:center;gap:5px;color:var(--gray);font-size:11px;cursor:pointer;background:none;border:none;font-family:'Jost',sans-serif;margin-bottom:18px;padding:0;transition:color .2s}
.backbtn:hover{color:var(--gold)}
.footer{background:var(--navy);border-top:1px solid rgba(255,255,255,.06);padding:26px 40px;display:flex;justify-content:space-between;align-items:center}
.flogo{font-family:'Cormorant Garamond',serif;font-size:17px;color:#fff;display:flex;align-items:center;gap:9px}
.flogo span{color:var(--gold)}
.ftxt{color:rgba(255,255,255,.28);font-size:11px}
.infosumm{background:var(--cream);padding:10px 14px;margin-bottom:20px;font-size:12px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;border-radius:10px}
.addphoto{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:8px;border:1.5px dashed var(--gold);color:var(--gold);font-size:11px;background:none;cursor:pointer;font-family:'Jost',sans-serif;transition:all .2s;border-radius:9px}
.addphoto:hover{background:rgba(196,151,58,.06)}
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:300;display:flex;align-items:center;justify-content:center;cursor:zoom-out}
.lb-img{max-width:92vw;max-height:88vh;object-fit:contain;border-radius:4px}
.lb-close{position:absolute;top:20px;right:24px;color:#fff;font-size:32px;cursor:pointer;background:none;border:none;opacity:.7;transition:opacity .2s;line-height:1}
.lb-close:hover{opacity:1}
.lb-prev,.lb-next{position:absolute;top:50%;transform:translateY(-50%);color:#fff;font-size:44px;cursor:pointer;background:rgba(255,255,255,.08);border:none;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .2s}
.lb-prev{left:20px}.lb-next{right:20px}
.lb-prev:hover,.lb-next:hover{background:rgba(196,151,58,.5)}
.lb-thumbs{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:8px}
.lb-thumb{width:56px;height:40px;object-fit:cover;cursor:pointer;opacity:.4;border:2px solid transparent;border-radius:4px;transition:all .2s}
.lb-thumb.on{opacity:1;border-color:var(--gold)}
@keyframes fi{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.fin{animation:fi .7s cubic-bezier(0.22,1,0.36,1) forwards}
@media(max-width:860px){.dbody{grid-template-columns:1fr}.widget{position:static}.grid{grid-template-columns:1fr}.cgrid{grid-template-columns:repeat(2,1fr)}.navr{gap:12px}.stat-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.sec{padding:56px 18px}.nav{padding:0 16px}.ht{font-size:44px}.hbtns{flex-direction:column;align-items:center}.cgrid{grid-template-columns:1fr}}
`;

export default function BlueBeeApp() {
  const [siteUnlocked, setSiteUnlocked] = useState(() => {
    try { return localStorage.getItem('bb_site_unlocked') === '1'; } catch(e) { return false; }
  });
  const [sitePass, setSitePass] = useState("");
  const [siteErr, setSiteErr] = useState(false);

  if(!siteUnlocked) return (
    <div style={{minHeight:'100vh',background:'linear-gradient(150deg,#0D1B2A 0%,#1a3a5c 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Jost,sans-serif'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500&display=swap');`}</style>
      <div style={{background:'#fff',borderRadius:22,padding:'50px 44px',width:'100%',maxWidth:360,textAlign:'center',boxShadow:'0 30px 80px rgba(0,0,0,.3)'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:14}}><BbLogo size={72}/></div>
        <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:28,color:'#0D1B2A',marginBottom:5}}>Blue<span style={{color:'#C4973A'}}>Bee</span></div>
        <div style={{fontSize:10,letterSpacing:2,color:'#AFA8A0',textTransform:'uppercase',marginBottom:30}}>Site în construcție</div>
        <input style={{width:'100%',border:`1.5px solid ${siteErr?'#ef4444':'#E8E0D5'}`,padding:'12px 15px',fontSize:14,outline:'none',marginBottom:10,textAlign:'center',fontFamily:'Jost,sans-serif',borderRadius:9,background:'#FAF7F2'}}
          type="password" placeholder="Parolă" value={sitePass} autoFocus
          onChange={e=>{setSitePass(e.target.value);setSiteErr(false);}}
          onKeyDown={e=>{if(e.key==='Enter'){if(sitePass===SITE_PASS){localStorage.setItem('bb_site_unlocked','1');setSiteUnlocked(true);}else setSiteErr(true);}}}/>
        {siteErr&&<div style={{color:'#ef4444',fontSize:12,marginBottom:8}}>Parolă incorectă</div>}
        <button style={{background:'linear-gradient(135deg,#C4973A,#D4A94A)',color:'#fff',border:'none',padding:'12px 26px',fontSize:10,letterSpacing:1.5,textTransform:'uppercase',cursor:'pointer',fontFamily:'Jost,sans-serif',borderRadius:22,width:'100%',marginTop:4}}
          onClick={()=>{if(sitePass===SITE_PASS){localStorage.setItem('bb_site_unlocked','1');setSiteUnlocked(true);}else setSiteErr(true);}}>Intră</button>
      </div>
    </div>
  );

  const [lang,setLang]=useState("ro");
  const [page,setPage]=useState("home");
  const [apts,setApts]=useState<Apt[]>(APTS0);
  const [contact,setContact]=useState<Contact>(CONTACT0);
  const [bookings,setBookings]=useState<Booking[]>([]);
  const [bk,setBk]=useState<Bk>({aptId:null,checkin:null,checkout:null,step:0});
  const [guest,setGuest]=useState<Guest>({name:"",email:"",phone:"",guests:1});
  const [adminIn,setAdminIn]=useState(false);
  const [adminPw,setAdminPw]=useState("");
  const [adminErr,setAdminErr]=useState(false);
  const [saved,setSaved]=useState<Record<string,boolean>>({});
  const [galIdx,setGalIdx]=useState<Record<number,number>>({1:0,2:0});
  const [calMo,setCalMo]=useState<[number,number]>(()=>{const d=new Date();return[d.getFullYear(),d.getMonth()];});
  const [lb,setLb]=useState<{photos:string[],idx:number}|null>(null);
  const [adminTab,setAdminTab]=useState("dashboard");

  const t=TXT[lang];
  const bkApt=bk.aptId?apts.find(a=>a.id===bk.aptId):null;
  const nights=bk.checkin&&bk.checkout?diffDays(bk.checkin,bk.checkout):0;
  const pricePerNight=bkApt?getPriceForGuests(bkApt,guest.guests):0;
  const total=pricePerNight*nights;

  useEffect(()=>{
    const r1=lsGet('bb_apts'); if(r1) setApts(JSON.parse(r1));
    const r2=lsGet('bb_bks'); if(r2) setBookings(JSON.parse(r2));
    const r3=lsGet('bb_cnt'); if(r3) setContact(JSON.parse(r3));
    if(window.location.pathname==='/admintci93') setPage('admin');
  },[]);

  const saveApt=(id:number,data:Partial<Apt>)=>{const n=apts.map(a=>a.id===id?{...a,...data}:a);setApts(n);lsSet('bb_apts',JSON.stringify(n));setSaved(s=>({...s,[id]:true}));setTimeout(()=>setSaved(s=>({...s,[id]:false})),2500);};
  const saveCnt=(c:Contact)=>{setContact(c);lsSet('bb_cnt',JSON.stringify(c));setSaved(s=>({...s,cnt:true}));setTimeout(()=>setSaved(s=>({...s,cnt:false})),2500);};
  
  const confirmBk=()=>{
    if(!bkApt)return;
    const nb:Booking={id:Date.now(),aptId:bk.aptId,aptName:bkApt.name,checkin:bk.checkin,checkout:bk.checkout,...guest,total,date:new Date().toISOString(),status:'active'};
    const nbs=[...bookings,nb];
    setBookings(nbs);
    lsSet('bb_bks',JSON.stringify(nbs));
    setBk(b=>({...b,step:4}));
  };

  const cancelBooking=(id:number)=>{
    const bkObj=bookings.find(b=>b.id===id);
    if(!bkObj)return;
    if(!window.confirm(`Anulezi rezervarea lui ${bkObj.name}?`))return;
    const nbs=bookings.map(b=>b.id===id?{...b,status:'cancelled'}:b);
    setBookings(nbs);
    lsSet('bb_bks',JSON.stringify(nbs));
    if(bkObj.email){
      window.open(`mailto:${bkObj.email}?subject=Anulare rezervare BlueBee Apartments&body=Stimate/ă ${bkObj.name},%0A%0ARezerva dumneavoastră la ${bkObj.aptName} pentru perioada ${bkObj.checkin} - ${bkObj.checkout} a fost anulată.%0A%0AVă rugăm să ne contactați pentru detalii.%0A%0ACu stimă,%0AEchipa BlueBee Apartments`);
    }
  };

  const isBooked=(aptId:number,ds:string)=>bookings.filter(b=>b.aptId===aptId&&b.status!=='cancelled').some(b=>!!b.checkin&&!!b.checkout&&ds>=b.checkin&&ds<b.checkout);
  const goApts=()=>{setPage('home');setTimeout(()=>document.getElementById('apts')?.scrollIntoView({behavior:'smooth'}),80);};
  const openLb=(photos:string[],idx:number)=>setLb({photos,idx});

  const Lightbox=()=>{
    if(!lb)return null;
    return(<div className="lightbox" onClick={()=>setLb(null)}>
      <button className="lb-close" onClick={()=>setLb(null)}>✕</button>
      {lb.photos.length>1&&<button className="lb-prev" onClick={e=>{e.stopPropagation();setLb(l=>l?{...l,idx:(l.idx-1+l.photos.length)%l.photos.length}:null);}}>‹</button>}
      <img className="lb-img" src={lb.photos[lb.idx]} alt="" onClick={e=>e.stopPropagation()}/>
      {lb.photos.length>1&&<button className="lb-next" onClick={e=>{e.stopPropagation();setLb(l=>l?{...l,idx:(l.idx+1)%l.photos.length}:null);}}>›</button>}
      <div className="lb-thumbs" onClick={e=>e.stopPropagation()}>
        {lb.photos.map((p,i)=><img key={i} src={p} className={`lb-thumb ${i===lb.idx?'on':''}`} alt="" onClick={()=>setLb(l=>l?{...l,idx:i}:null)}/>)}
      </div>
    </div>);
  };

  const Calendar=()=>{
    const[y,m]=calMo,days=monthDays(y,m),dows=['Du','Lu','Ma','Mi','Jo','Vi','Sâ'];
    return(<div>
      <div className="calh">
        <button className="caln" onClick={()=>{let nm=m-1,ny=y;if(nm<0){nm=11;ny--;}setCalMo([ny,nm]);}}>‹</button>
        <span className="calm">{MONTHS[m]} {y}</span>
        <button className="caln" onClick={()=>{let nm=m+1,ny=y;if(nm>11){nm=0;ny++;}setCalMo([ny,nm]);}}>›</button>
      </div>
      <div className="calg">
        {dows.map(d=><div key={d} className="caldow">{d}</div>)}
        {days.map((ds,i)=>{
          if(!ds)return<div key={`e${i}`}/>;
          const past=ds<todayStr(),bkd=bk.aptId?isBooked(bk.aptId,ds):false;
          const isCi=ds===bk.checkin,isCo=ds===bk.checkout;
          const inR=bk.checkin&&bk.checkout&&ds>bk.checkin&&ds<bk.checkout;
          let cls="cald";
          if(past)cls+=" past";else if(bkd)cls+=" bkd";else if(isCi||isCo)cls+=" sel";else if(inR)cls+=" range";
          if(ds===todayStr()&&!past)cls+=" tod";
          const d=parseInt(ds.split('-')[2]);
          const click=()=>{
            if(past||bkd)return;
            if(!bk.checkin||(bk.checkin&&bk.checkout)){setBk(b=>({...b,checkin:ds,checkout:null}));return;}
            if(ds<=bk.checkin){setBk(b=>({...b,checkin:ds,checkout:null}));return;}
            if(bk.aptId){let cur=addDays(bk.checkin,1);while(cur<ds){if(isBooked(bk.aptId,cur)){setBk(b=>({...b,checkin:ds,checkout:null}));return;}cur=addDays(cur,1);}}
            setBk(b=>({...b,checkout:ds}));
          };
          return<div key={ds} className={cls} onClick={click}>{d}</div>;
        })}
      </div>
      {bk.checkin&&<div className="calsel"><span><b>{t.checkin}:</b> {fmtDate(bk.checkin)}</span><span><b>{t.checkout}:</b> {bk.checkout?fmtDate(bk.checkout):'—'}</span>{nights>0&&<span><b>{nights} {nights===1?t.night:t.nights}</b></span>}</div>}
    </div>);
  };

  const Modal=()=>{
    if(!bk.step)return null;
    const close=()=>setBk({aptId:null,checkin:null,checkout:null,step:0});
    return(<div className="overlay" onClick={e=>{if(e.target===e.currentTarget)close();}}>
      <div className="modal fin">
        {bk.step===4?(<div className="success">
          <div style={{fontSize:50,marginBottom:12}}>✅</div>
          <div className="mtitle" style={{fontSize:24}}>{t.success_title}</div>
          <p style={{color:C.gray,fontSize:13,margin:'9px 0 5px'}}>{t.success_msg}</p>
          {bk.checkin&&bk.checkout&&<p style={{color:C.gray,fontSize:13}}>{fmtDate(bk.checkin)} → {fmtDate(bk.checkout)} • {nights} {nights===1?t.night:t.nights} • <strong>{total} RON</strong></p>}
          <div style={{margin:'13px 0',padding:'13px',background:'#f0f9ff',border:'1px solid #bae6fd',fontSize:12,color:'#0369a1',borderRadius:9}}>💬 WhatsApp: <strong>{contact.whatsapp}</strong></div>
          <button className="bg" style={{marginTop:8}} onClick={()=>{close();setGuest({name:'',email:'',phone:'',guests:1});}}>OK</button>
        </div>):(<>
          <div className="mtitle">{t.confirm}</div>
          <div className="msub">{bkApt?.name}</div>
          {bk.step===1&&(<><Calendar/><div className="mbtns"><button className="bo" onClick={close}>✕</button><button className="bg" disabled={!bk.checkin||!bk.checkout} onClick={()=>setBk(b=>({...b,step:2}))}>{bk.checkin&&bk.checkout?`${nights} ${nights===1?t.night:t.nights} · ${total} RON →`:t.select_dates}</button></div></>)}
          {bk.step===2&&(<>
            <div className="infosumm">{bk.checkin&&bk.checkout&&<><span>{fmtDate(bk.checkin)} → {fmtDate(bk.checkout)}</span><strong>{nights} {nights===1?t.night:t.nights} · {total} RON</strong></>}</div>
            <div className="ff"><label>Nume și prenume *</label><input type="text" placeholder="Ion Popescu" required value={guest.name} onChange={e=>setGuest(g=>({...g,name:e.target.value}))}/></div>
            <div className="ff"><label>Telefon * <span style={{color:'var(--gold)'}}>obligatoriu</span></label><input type="tel" placeholder="+40 7XX XXX XXX" required value={guest.phone} onChange={e=>setGuest(g=>({...g,phone:e.target.value}))}/></div>
            <div className="ff"><label>Email <span style={{color:'var(--gray2)',fontSize:9}}>(opțional)</span></label><input type="email" placeholder="email@exemplu.ro" value={guest.email} onChange={e=>setGuest(g=>({...g,email:e.target.value}))}/></div>
            <div className="ff"><label>{t.guests} (max {bkApt?.maxGuests})</label><input type="number" min={1} max={bkApt?.maxGuests} value={guest.guests} onChange={e=>setGuest(g=>({...g,guests:Number(e.target.value)}))}/></div>
            <div className="mbtns"><button className="bo" onClick={()=>setBk(b=>({...b,step:1}))}>←</button><button className="bg" disabled={!guest.name||!guest.phone} onClick={()=>setBk(b=>({...b,step:3}))}>💳 {t.payment} →</button></div>
          </>)}
          {bk.step===3&&(<>
            <div className="infosumm"><span>{guest.name} · {guest.phone}</span><strong>{total} RON</strong></div>
            <div className="paybox"><div className="paytitle">🔒 {t.payment} — Stripe</div>
              <div className="ff"><label>{t.card_nr}</label><input placeholder="4242 4242 4242 4242"/></div>
              <div className="cardrow"><div className="ff"><label>{t.expiry}</label><input placeholder="MM/AA"/></div><div className="ff"><label>{t.cvc}</label><input placeholder="123"/></div><div className="ff"><label>Total</label><input value={`${total} RON`} readOnly style={{background:'#f0f0f0'}}/></div></div>
            </div>
            <div className="mbtns"><button className="bo" onClick={()=>setBk(b=>({...b,step:2}))}>←</button><button className="bg" onClick={confirmBk}>{t.pay} {total} RON 🔒</button></div>
          </>)}
        </>)}
      </div>
    </div>);
  };

  const Detail=({apt}:{apt:Apt})=>{
    const idx=galIdx[apt.id]||0,desc=apt.desc[lang]||apt.desc.ro,badge=(apt as unknown as Record<string,string>)[`badge_${lang}`]||apt.badge_ro;
    const wBk=bk.aptId===apt.id;
    const openBk=()=>{setCalMo([new Date().getFullYear(),new Date().getMonth()]);setBk({aptId:apt.id,checkin:null,checkout:null,step:1});};
    return(<div className="detail fin">
      <div className="gal">
        <img className="galimg" src={apt.photos[idx]||''} alt={apt.name} onClick={()=>openLb(apt.photos,idx)}/>
        <div className="galcnt">{idx+1} / {apt.photos.length}</div>
        {apt.photos.length>1&&<div className="galnav"><button className="galbtn" onClick={()=>setGalIdx(g=>({...g,[apt.id]:(idx-1+apt.photos.length)%apt.photos.length}))}>‹</button><button className="galbtn" onClick={()=>setGalIdx(g=>({...g,[apt.id]:(idx+1)%apt.photos.length}))}>›</button></div>}
        <div className="galthumbs">{apt.photos.map((p,i)=><img key={i} src={p} className={`galthumb ${i===idx?'on':''}`} alt="" onClick={()=>setGalIdx(g=>({...g,[apt.id]:i}))}/>)}</div>
      </div>
      <div className="dbody">
        <div>
          <button className="backbtn" onClick={()=>setPage('home')}>{t.back}</button>
          <div className="dbadge">{badge}</div>
          <h1 className="dtitle">{apt.name}</h1>
          <p className="ddesc">{desc}</p>
          <div className="amlbl">{t.amenities_lbl}</div>
          <div className="amgrid">{apt.amenities.map(k=><div key={k} className="amtag">{AM_ICONS[k]} {t[`a_${k}`]||k}</div>)}</div>
          <div className="dinfo">{[['🛏',t.bedroom],['🛋',t.living],['🚿',t.bathroom],...(apt.amenities.includes('kitchen')?[['🍳',t.kitchen_lbl]]:[]),['👥',`${t.max_g} ${apt.maxGuests} ${t.g_unit}`]].map(([ic,lb],i)=><div key={i} className="dinforow"><span>{ic}</span><span>{lb}</span></div>)}</div>
        </div>
        <div>
          <div className="widget">
            <div className="wprice">{pricePerNight||apt.priceTiers[0]?.price||apt.price} RON<span> {t.per_night}</span></div>
            {apt.priceTiers&&apt.priceTiers.length>0&&(
              <div style={{fontSize:11,color:'var(--gray)',marginBottom:8,lineHeight:1.7}}>
                {apt.priceTiers.map((tier,i)=>{const prev=i===0?1:apt.priceTiers[i-1].guests+1;return<div key={i}>{prev===tier.guests?`${prev} pers`:`${prev}-${tier.guests} pers`}: <strong>{tier.price} RON</strong></div>;})}
              </div>
            )}
            <div className="daterow" onClick={openBk}><div className="df"><label>{t.checkin}</label><span>{wBk&&bk.checkin?fmtDate(bk.checkin):'—'}</span></div><div className="df"><label>{t.checkout}</label><span>{wBk&&bk.checkout?fmtDate(bk.checkout):'—'}</span></div></div>
            <div className="winfo"><span>✓ {t.ci_time}</span><span>✓ {t.co_time}</span><span>✓ {t.min_stay}</span></div>
            {wBk&&bk.checkin&&bk.checkout&&<div className="wtotal"><span className="wtlbl">{nights} {nights===1?t.night:t.nights}</span><span className="wtval">{total} RON</span></div>}
            <button className="bg" style={{width:'100%',marginTop:14}} onClick={()=>{if(wBk&&bk.checkin&&bk.checkout)setBk(b=>({...b,step:2}));else openBk();}}>
              {wBk&&bk.checkin&&bk.checkout?t.confirm:`📅 ${t.select_dates}`}
            </button>
          </div>
        </div>
      </div>
    </div>);
  };

  // Admin Calendar Component
  const AdminCalendar=({aptId}:{aptId:number})=>{
    const [y,setY]=useState(new Date().getFullYear());
    const [m,setM]=useState(new Date().getMonth());
    const [viewAll,setViewAll]=useState(false);
    const days=monthDays(y,m),dows=['Du','Lu','Ma','Mi','Jo','Vi','Sâ'];
    const apt=apts.find(a=>a.id===aptId);
    
    if(viewAll){
      return(<div className="admin-cal">
        <div className="admin-cal-head">
          <div className="admin-cal-title">{apt?.name} — {y}</div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <button className="admin-cal-nbtn" onClick={()=>setY(y-1)}>‹</button>
            <span style={{fontSize:13,color:'var(--gray)'}}>{y}</span>
            <button className="admin-cal-nbtn" onClick={()=>setY(y+1)}>›</button>
            <button onClick={()=>setViewAll(false)} style={{padding:'6px 14px',border:'1px solid var(--border)',borderRadius:18,fontSize:11,cursor:'pointer',background:'none',fontFamily:'Jost',color:'var(--navy)'}}>Luna curentă</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {Array.from({length:12},(_,mi)=>{
            const mdays=monthDays(y,mi);
            return(<div key={mi}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:16,color:'var(--navy)',marginBottom:8,textAlign:'center'}}>{MONTHS_SHORT[mi]}</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1}}>
                {['D','L','M','M','J','V','S'].map(d=><div key={d} style={{textAlign:'center',fontSize:8,color:'var(--gray2)',padding:'3px 0'}}>{d}</div>)}
                {mdays.map((ds,i)=>{
                  if(!ds)return<div key={`e${i}`}/>;
                  const occ=isBooked(aptId,ds),past=ds<todayStr(),tod=ds===todayStr();
                  const d=parseInt(ds.split('-')[2]);
                  let bg='transparent',color=past?'#d1d5db':'var(--navy)';
                  if(!past&&occ){bg='rgba(239,68,68,.15)';color='#dc2626';}
                  else if(!past&&!occ){bg='rgba(34,197,94,.1)';color='#15803d';}
                  return<div key={ds} style={{textAlign:'center',fontSize:9,padding:'3px 1px',borderRadius:3,background:bg,color,border:tod?'1px solid var(--gold)':'1px solid transparent'}}>{d}</div>;
                })}
              </div>
            </div>);
          })}
        </div>
        <div className="cal-legend" style={{marginTop:20}}>
          <div className="cal-leg"><div className="cal-dot" style={{background:'rgba(34,197,94,.3)'}}></div><span style={{fontSize:11,color:'var(--gray)'}}>Liber</span></div>
          <div className="cal-leg"><div className="cal-dot" style={{background:'rgba(239,68,68,.3)'}}></div><span style={{fontSize:11,color:'var(--gray)'}}>Ocupat</span></div>
        </div>
      </div>);
    }

    return(<div className="admin-cal">
      <div className="admin-cal-head">
        <div className="admin-cal-title">{apt?.name}</div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="admin-cal-nbtn" onClick={()=>{let nm=m-1,ny=y;if(nm<0){nm=11;ny--;}setM(nm);setY(ny);}}>‹</button>
          <span style={{fontSize:13,color:'var(--gray)'}}>{MONTHS[m]} {y}</span>
          <button className="admin-cal-nbtn" onClick={()=>{let nm=m+1,ny=y;if(nm>11){nm=0;ny++;}setM(nm);setY(ny);}}>›</button>
          <button onClick={()=>setViewAll(true)} style={{padding:'6px 14px',border:'1px solid var(--border)',borderRadius:18,fontSize:11,cursor:'pointer',background:'none',fontFamily:'Jost',color:'var(--navy)'}}>Vezi tot anul</button>
        </div>
      </div>
      <div className="admin-cal-grid">
        {dows.map(d=><div key={d} className="admin-cal-dow">{d}</div>)}
        {days.map((ds,i)=>{
          if(!ds)return<div key={`e${i}`}/>;
          const occ=isBooked(aptId,ds),past=ds<todayStr(),tod=ds===todayStr();
          let cls="admin-day";
          if(past)cls+=" past";else if(occ)cls+=" occ";else cls+=" free";
          if(tod)cls+=" tod";
          const d=parseInt(ds.split('-')[2]);
          const bkInfo=!past&&occ?bookings.find(b=>b.aptId===aptId&&b.status!=='cancelled'&&!!b.checkin&&!!b.checkout&&ds>=b.checkin&&ds<b.checkout):null;
          return<div key={ds} className={cls} title={bkInfo?`${bkInfo.name} · ${bkInfo.phone}`:''}>{d}</div>;
        })}
      </div>
      <div className="cal-legend">
        <div className="cal-leg"><div className="cal-dot" style={{background:'rgba(34,197,94,.4)'}}></div><span style={{fontSize:11,color:'var(--gray)'}}>Liber</span></div>
        <div className="cal-leg"><div className="cal-dot" style={{background:'rgba(239,68,68,.4)'}}></div><span style={{fontSize:11,color:'var(--gray)'}}>Ocupat</span></div>
      </div>
    </div>);
  };

  const Admin=()=>{
    const [ea,setEa]=useState<Apt[]>(apts.map(a=>({...a,desc:{...a.desc},photos:[...a.photos],amenities:[...a.amenities]})));
    const [ec,setEc]=useState<Contact>({...contact});
    const [bkTab,setBkTab]=useState(1);

    if(!adminIn)return(<div className="loginwrap"><div className="loginbox">
      <div style={{display:'flex',justifyContent:'center',marginBottom:14}}><BbLogo size={72}/></div>
      <div className="llogo">Blue<span style={{color:C.gold}}>Bee</span></div>
      <div className="lsub">Administrator</div>
      <input className="linput" type="password" placeholder="••••••••" value={adminPw} autoFocus onChange={e=>{setAdminPw(e.target.value);setAdminErr(false);}} onKeyDown={e=>{if(e.key==='Enter'){if(adminPw===ADMIN_PASS)setAdminIn(true);else setAdminErr(true);}}}/>
      {adminErr&&<div className="lerr">Parolă incorectă</div>}
      <button className="savebtn" style={{width:'100%',marginTop:0}} onClick={()=>{if(adminPw===ADMIN_PASS)setAdminIn(true);else setAdminErr(true);}}>Autentificare</button>
      <button className="backbtn" style={{marginTop:16,justifyContent:'center',width:'100%'}} onClick={()=>setPage('home')}>← Înapoi</button>
    </div></div>);

    const activeBookings=bookings.filter(b=>b.status!=='cancelled');
    const upcomingBookings=activeBookings.filter(b=>b.checkin&&b.checkin>=todayStr());
    const totalRevenue=activeBookings.reduce((s,b)=>s+b.total,0);

    const upd=(i:number,f:string,v:string|number)=>{const n=[...ea];n[i]={...n[i],[f]:v};setEa(n);};
    const updDesc=(i:number,v:string)=>{const n=[...ea];n[i]={...n[i],desc:{...n[i].desc,ro:v}};setEa(n);};
    const addPh=(i:number)=>{const n=[...ea];n[i]={...n[i],photos:[...n[i].photos,'']};setEa(n);};
    const updPh=(ai:number,pi:number,v:string)=>{const n=[...ea];const p=[...n[ai].photos];p[pi]=v;n[ai]={...n[ai],photos:p};setEa(n);};
    const delPh=(ai:number,pi:number)=>{const n=[...ea];n[ai]={...n[ai],photos:n[ai].photos.filter((_,i)=>i!==pi)};setEa(n);};
    const togAm=(ai:number,k:string)=>{const n=[...ea];const am=n[ai].amenities.includes(k)?n[ai].amenities.filter(a=>a!==k):[...n[ai].amenities,k];n[ai]={...n[ai],amenities:am};setEa(n);};

    return(<div className="admin">
      <div style={{background:'var(--navy)',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between',height:68}}>
        <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>setPage('home')}>
          <BbLogo size={38}/>
          <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:18,color:'#fff'}}>Blue<span style={{color:'var(--gold)'}}>Bee</span> <span style={{color:'rgba(255,255,255,.5)',fontSize:14}}>Admin</span></div>
        </div>
        <button className="savebtn" style={{background:'transparent',color:'rgba(255,255,255,.5)',border:'1px solid rgba(255,255,255,.2)',marginTop:0}} onClick={()=>{setAdminIn(false);setAdminPw('');setPage('home');}}>Deconectare</button>
      </div>
      <div className="admin-nav">
        {[['dashboard','📊 Dashboard'],['calendar','📅 Calendar'],['bookings','📋 Rezervări'],['apartments','🏠 Apartamente'],['settings','⚙️ Setări']].map(([id,label])=>(
          <button key={id} className={`admin-tab ${adminTab===id?'on':'off'}`} onClick={()=>setAdminTab(id)}>{label}</button>
        ))}
      </div>

      <div className="awrap">
        {adminTab==='dashboard'&&(<div className="fin">
          <div className="stat-grid">
            <div className="stat"><div className="stat-num">{activeBookings.length}</div><div className="stat-lbl">Rezervări totale</div></div>
            <div className="stat"><div className="stat-num">{upcomingBookings.length}</div><div className="stat-lbl">Viitoare</div></div>
            <div className="stat"><div className="stat-num">{totalRevenue}</div><div className="stat-lbl">Venit total (RON)</div></div>
            <div className="stat"><div className="stat-num">{bookings.filter(b=>b.status==='cancelled').length}</div><div className="stat-lbl">Anulate</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            <AdminCalendar aptId={1}/>
            <AdminCalendar aptId={2}/>
          </div>
          {upcomingBookings.length>0&&(<div className="acard" style={{marginTop:20}}>
            <div className="aaptname">🔔 Următoarele rezervări</div>
            {upcomingBookings.slice(0,5).map(b=>(
              <div key={b.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--border)'}}>
                <div><strong style={{fontSize:14}}>{b.name}</strong><div style={{fontSize:12,color:'var(--gray)'}}>{b.aptName} · {b.checkin} → {b.checkout}</div></div>
                <div style={{textAlign:'right'}}><div style={{fontFamily:'Cormorant Garamond,serif',fontSize:20}}>{b.total} RON</div><div style={{fontSize:11,color:'var(--gray)'}}>{b.phone}</div></div>
              </div>
            ))}
          </div>)}
        </div>)}

        {adminTab==='calendar'&&(<div className="fin">
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:32,color:'var(--navy)',marginBottom:24}}>📅 Calendar Disponibilitate</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            <AdminCalendar aptId={1}/>
            <AdminCalendar aptId={2}/>
          </div>
        </div>)}

        {adminTab==='bookings'&&(<div className="fin">
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:32,color:'var(--navy)',marginBottom:20}}>📋 Rezervări</h2>
          <div className="bk-tabs">
            {apts.map(a=><button key={a.id} className={`bk-tab ${bkTab===a.id?'on':'off'}`} onClick={()=>setBkTab(a.id)}>{a.name} ({bookings.filter(b=>b.aptId===a.id&&b.status!=='cancelled').length})</button>)}
          </div>
          {bookings.filter(b=>b.aptId===bkTab).length===0?
            <div className="acard"><p style={{color:'var(--gray)',fontSize:13}}>Nu există rezervări pentru acest apartament.</p></div>:
            bookings.filter(b=>b.aptId===bkTab).sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).map(b=>(
              <div key={b.id} className={`bk-card ${b.status==='cancelled'?'cancelled':''}`}>
                <div>
                  <div className="bk-name">{b.name}</div>
                  <div className="bk-info">
                    <div>📞 <strong>{b.phone}</strong></div>
                    {b.email&&<div>✉️ {b.email}</div>}
                    <div>👥 {b.guests} {b.guests===1?'oaspete':'oaspeți'}</div>
                    <div style={{fontSize:11,color:'var(--gray2)',marginTop:4}}>Rezervat: {new Date(b.date).toLocaleDateString('ro-RO')}</div>
                  </div>
                  <div className="bk-dates">
                    <span>📅 <strong>{t.checkin}:</strong> {b.checkin}</span>
                    <span>📅 <strong>{t.checkout}:</strong> {b.checkout}</span>
                    <span>🌙 {b.checkin&&b.checkout?diffDays(b.checkin,b.checkout):0} nopți</span>
                  </div>
                </div>
                <div className="bk-actions">
                  <div className="bk-total">{b.total} RON</div>
                  <span className={`bk-status ${b.status==='cancelled'?'cancelled':'active'}`}>{b.status==='cancelled'?'Anulat':'Activ'}</span>
                  {b.status!=='cancelled'&&<button className="bk-cancel" onClick={()=>cancelBooking(b.id)}>✕ Anulează</button>}
                  {b.phone&&<a href={`https://wa.me/${b.phone.replace(/[^0-9]/g,'')}`} target="_blank" rel="noreferrer" style={{fontSize:11,color:'#25D366',textDecoration:'none',padding:'6px 14px',border:'1px solid #25D366',borderRadius:18}}>💬 WhatsApp</a>}
                </div>
              </div>
            ))
          }
        </div>)}

        {adminTab==='apartments'&&(<div className="fin">
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:32,color:'var(--navy)',marginBottom:20}}>🏠 Apartamente</h2>
          {ea.map((apt,ai)=>(<div key={apt.id} className="acard">
            <div className="aaptname">🏠 {apt.name} {saved[apt.id]&&<span style={{fontSize:12,color:'#16a34a',fontFamily:'Jost',fontWeight:400}}>✓ Salvat!</span>}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13}}>
              <div className="af"><label>Nume apartament</label><input value={apt.name} onChange={e=>upd(ai,'name',e.target.value)}/></div>
              <div className="af"><label>Max oaspeți</label><input type="number" value={apt.maxGuests} onChange={e=>upd(ai,'maxGuests',Number(e.target.value))}/></div>
            </div>
            <div className="af">
              <label>Prețuri per număr de oaspeți (RON/noapte)</label>
              {apt.priceTiers&&apt.priceTiers.map((tier,ti)=>{
                const prev=ti===0?1:apt.priceTiers[ti-1].guests+1;
                return(<div key={ti} style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
                  <span style={{fontSize:12,color:'var(--gray)',minWidth:90}}>{prev===tier.guests?`${prev} pers`:`${prev}–${tier.guests} pers`}:</span>
                  <input type="number" value={tier.price} style={{width:90,border:`1.5px solid ${C.border}`,padding:'6px 10px',fontSize:13,fontFamily:'Jost',outline:'none',borderRadius:8,background:'var(--cream)'}}
                    onChange={e=>{const n=[...ea];const tiers=[...n[ai].priceTiers];tiers[ti]={...tiers[ti],price:Number(e.target.value)};n[ai]={...n[ai],priceTiers:tiers};setEa(n);}}/>
                  <span style={{fontSize:12,color:'var(--gray)'}}>RON</span>
                </div>);
              })}
            </div>
            <div className="af"><label>Descriere (RO)</label><textarea rows={3} style={{width:'100%',border:`1.5px solid ${C.border}`,padding:'8px 12px',fontFamily:'Jost',fontSize:13,outline:'none',resize:'vertical',borderRadius:8,background:'var(--cream)'}} value={apt.desc.ro} onChange={e=>updDesc(ai,e.target.value)}/></div>
            <div className="af"><label>Facilități</label><div className="amtoggle">{ALL_AM.map(k=><div key={k} className={`amt ${apt.amenities.includes(k)?'on':'off'}`} onClick={()=>togAm(ai,k)}>{AM_ICONS[k]} {TXT.ro[`a_${k}`]||k}</div>)}</div></div>
            <div className="af"><label>Fotografii</label>
              <div className="photolist">{apt.photos.map((url,pi)=>(<div key={pi} className="prow">{url&&<img src={url} alt="" onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>}<input value={url} placeholder="URL fotografie..." onChange={e=>updPh(ai,pi,e.target.value)}/><button className="pdel" onClick={()=>delPh(ai,pi)}>×</button></div>))}</div>
              <button className="addphoto" onClick={()=>addPh(ai)}>+ Adaugă fotografie</button>
            </div>
            <button className="savebtn" onClick={()=>saveApt(apt.id,{name:apt.name,price:apt.priceTiers[0]?.price||apt.price,maxGuests:apt.maxGuests,priceTiers:apt.priceTiers,desc:{...apts[ai].desc,ro:apt.desc.ro},amenities:apt.amenities,photos:apt.photos})}>{saved[apt.id]?'✓ Salvat!':'Salvează'}</button>
          </div>))}
        </div>)}

        {adminTab==='settings'&&(<div className="fin">
          <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:32,color:'var(--navy)',marginBottom:20}}>⚙️ Setări</h2>
          <div className="acard">
            <div className="aaptname">📍 Informații Contact {saved['cnt']&&<span style={{fontSize:12,color:'#16a34a',fontFamily:'Jost',fontWeight:400}}>✓ Salvat!</span>}</div>
            {(['phone','whatsapp','email','address'] as const).map(k=>(<div key={k} className="af"><label>{k==='phone'?'Telefon':k==='whatsapp'?'WhatsApp':k==='email'?'Email':'Adresă'}</label><input value={ec[k]||''} onChange={e=>setEc(c=>({...c,[k]:e.target.value}))}/></div>))}
            <button className="savebtn" onClick={()=>saveCnt(ec)}>{saved['cnt']?'✓ Salvat!':'Salvează'}</button>
          </div>
          <div className="acard">
            <div className="aaptname">🔄 Sincronizare iCal</div>
            <p style={{fontSize:12,color:'var(--gray)',marginBottom:18,lineHeight:1.7}}>Adaugă link-urile iCal de pe Booking.com și Travelminit pentru a evita dublarea rezervărilor.</p>
            {ea.map((apt,ai)=>(<div key={apt.id} style={{marginBottom:20,padding:'16px',background:'var(--cream)',borderRadius:12}}>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:18,color:'var(--navy)',marginBottom:12}}>🏠 {apt.name}</div>
              <div className="af"><label>📅 Booking.com — link iCal</label><input value={apt.ical_booking||''} placeholder="https://admin.booking.com/..." onChange={e=>{const n=[...ea];n[ai]={...n[ai],ical_booking:e.target.value};setEa(n);}}/></div>
              <div className="af"><label>📅 Travelminit — link iCal</label><input value={apt.ical_travelminit||''} placeholder="https://www.travelminit.ro/ical/..." onChange={e=>{const n=[...ea];n[ai]={...n[ai],ical_travelminit:e.target.value};setEa(n);}}/></div>
              <button className="savebtn" onClick={()=>saveApt(apt.id,{ical_booking:apt.ical_booking,ical_travelminit:apt.ical_travelminit})}>Salvează linkuri iCal</button>
            </div>))}
            <div style={{padding:'14px',background:'#f0f9ff',border:'1px solid #bae6fd',borderRadius:10,fontSize:12,color:'#0369a1',lineHeight:1.7}}>
              <strong>Booking.com:</strong> Extranet → Calendar → Sincronizare → Export calendar<br/>
              <strong>Travelminit:</strong> Cont proprietar → Calendar → Export iCal
            </div>
          </div>
        </div>)}
      </div>
    </div>);
  };

  return(<div className="bb">
    <style>{CSS}</style>
    <nav className="nav">
      <div className="navlogo" onClick={()=>setPage('home')}>
        <BbLogo size={42}/>
        <div className="navtxt">Blue<em>Bee</em><span className="navsub">apartments</span></div>
      </div>
      <div className="navr">
        <button className="nl" onClick={()=>setPage('home')}>{t.home}</button>
        <button className="nl" onClick={goApts}>{t.apts}</button>
        <button className="nl" onClick={()=>{setPage('home');setTimeout(()=>document.getElementById('ctc')?.scrollIntoView({behavior:'smooth'}),80);}}>{t.contact}</button>
        <button className="nb" onClick={goApts}>{t.book}</button>
        <div className="lang">{['ro','en','fr','it'].map(l=><button key={l} className={`lb ${lang===l?'on':'off'}`} onClick={()=>setLang(l)}>{l.toUpperCase()}</button>)}</div>
      </div>
    </nav>

    {page==='home'&&<div className="fin">
      <div className="hero">
        <div className="hc fin">
          <div className="hbadge"><BbLogo size={20}/> BlueBee Apartments</div>
          <h1 className="ht">Blue<em>Bee</em><br/>Apartments</h1>
          <p className="hs">{t.hero_sub}</p>
          <div className="hbtns"><button className="bg" onClick={goApts}>{t.discover}</button><button className="bo" onClick={goApts}>{t.book_now}</button></div>
        </div>
      </div>
      <div id="apts" className="sec">
        <p className="ssub">{t.our_apts}</p>
        <h2 className="stitle">{t.our_apts}</h2>
        <div className="grid">
          {apts.map(apt=>{
            const badge=(apt as unknown as Record<string,string>)[`badge_${lang}`]||apt.badge_ro,desc=apt.desc[lang]||apt.desc.ro;
            return(<div key={apt.id} className="card">
              <div className="cimgw">
                <img className="cimg" src={apt.photos[0]||''} alt={apt.name} onClick={e=>{e.stopPropagation();openLb(apt.photos,0);}}/>
                <div className="cbadge">{badge}</div>
                {apt.photos.length>1&&<button className="cimgw-btn" onClick={e=>{e.stopPropagation();openLb(apt.photos,0);}}>📷 {apt.photos.length} foto</button>}
              </div>
              <div className="cbody">
                <h3 className="cname">{apt.name}</h3>
                <p className="cdesc">{desc.substring(0,128)}...</p>
                <div className="cams">{apt.amenities.slice(0,5).map(k=><span key={k} className="cam">{AM_ICONS[k]} {t[`a_${k}`]||k}</span>)}</div>
                <div className="cfoot">
                  <div><div style={{fontSize:9,color:C.gray,letterSpacing:1,textTransform:'uppercase',marginBottom:3}}>{t.from}</div><div className="cprice">{apt.priceTiers&&apt.priceTiers.length>0?apt.priceTiers[0].price:apt.price} RON<span> {t.per_night}</span></div></div>
                  <div className="cbtns">
                    <button className="ob" onClick={()=>setPage(`apt${apt.id}`)}>{t.details}</button>
                    <button className="cbook" onClick={()=>{setCalMo([new Date().getFullYear(),new Date().getMonth()]);setBk({aptId:apt.id,checkin:null,checkout:null,step:1});}}>{t.book_apt}</button>
                  </div>
                </div>
              </div>
            </div>);
          })}
        </div>
      </div>
      <div id="ctc" className="contact">
        <div style={{fontSize:9,color:'rgba(196,151,58,.55)',letterSpacing:3,textTransform:'uppercase',textAlign:'center',marginBottom:9}}>{t.contact_sub}</div>
        <h2 className="ctitle">{t.contact_us}</h2>
        <div className="cgrid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          <div className="citem" onClick={()=>window.open(`tel:${contact.phone}`)}>
            <div className="cicon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#C4973A"/></svg></div>
            <div className="clbl">{t.phone_lbl}</div><div className="cval"><a href={`tel:${contact.phone}`}>{contact.phone}</a></div>
          </div>
          <div className="citem" onClick={()=>window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g,'')}`)}>
            <div className="cicon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.4C8.6 21.5 10.3 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm5 13.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.4-.1-.3-.1-.7-.2-1.2-.5-2.1-.9-3.5-3-3.6-3.1-.1-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.9.2-.2.5-.3.6-.3h.5c.2 0 .3 0 .5.4l.6 1.5c.1.2.1.3 0 .5l-.3.4-.3.4c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4 0 .5-.1l.7-.8c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.3 0 .1.1.5-.1 1.1z" fill="#C4973A"/></svg></div>
            <div className="clbl">WhatsApp</div><div className="cval" style={{color:'var(--gold)'}}>{contact.whatsapp}</div>
          </div>
          <div className="citem" onClick={()=>window.open(`mailto:${contact.email}`)}>
            <div className="cicon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#C4973A"/></svg></div>
            <div className="clbl">{t.email_lbl}</div><div className="cval"><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
          </div>
          <div className="citem">
            <div className="cicon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" fill="#C4973A"/></svg></div>
            <div className="clbl">{t.addr_lbl}</div><div className="cval">{contact.address}</div>
          </div>
        </div>
        <div style={{marginTop:44,maxWidth:1060,margin:'44px auto 0',borderRadius:18,overflow:'hidden',boxShadow:'0 8px 40px rgba(0,0,0,.3)',position:'relative'}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.5!2d23.1893889!3d45.8382932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474e9b2a75312d89%3A0x1f8b3e3e43f8302e!2sBulevardul+Eroilor%2C+Or%C4%83%C8%99tie!5e0!3m2!1sro!2sro!4v1"
            width="100%" height="360" style={{border:0,display:'block',filter:'grayscale(15%) contrast(1.05)'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
          <a href="https://maps.google.com/?q=45.8382932,23.1893889" target="_blank" rel="noopener noreferrer"
            style={{position:'absolute',bottom:16,right:16,background:'linear-gradient(135deg,#C4973A,#D4A94A)',color:'#fff',padding:'10px 20px',borderRadius:24,fontSize:11,letterSpacing:1.5,textTransform:'uppercase',textDecoration:'none',fontFamily:'Jost,sans-serif',fontWeight:500,boxShadow:'0 4px 16px rgba(196,151,58,.4)',display:'flex',alignItems:'center',gap:7}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>
            Deschide în Google Maps
          </a>
        </div>
      </div>
    </div>}
    {page==='apt1'&&<div className="fin"><Detail apt={apts[0]}/></div>}
    {page==='apt2'&&<div className="fin"><Detail apt={apts[1]}/></div>}
    {page==='admin'&&<Admin/>}
    {bk.step>0&&<Modal/>}
    {lb&&<Lightbox/>}
    {page!=='admin'&&<footer className="footer">
      <div className="flogo"><BbLogo size={38}/><div style={{fontFamily:'Cormorant Garamond,serif',fontSize:19,fontWeight:500,color:'#fff',lineHeight:1.1}}>Blue<span style={{color:'var(--gold)'}}>Bee</span><span style={{fontSize:7,letterSpacing:3,textTransform:'uppercase',color:'rgba(196,151,58,.65)',display:'block'}}>apartments</span></div></div>
      <div className="ftxt">© {new Date().getFullYear()} BlueBee Apartments</div>
      <div className="ftxt" style={{fontSize:9,letterSpacing:1,opacity:.3}}>All rights reserved</div>
    </footer>}
  </div>);
}
