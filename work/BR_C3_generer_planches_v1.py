"""Dessine des maquettes SVG fixes ; aucun site, serveur ou comportement produit."""
from pathlib import Path
from html import escape

OUT = Path(__file__).resolve().parents[1] / 'outputs'
PAPER, INK, BLUE, GREEN, LINE = '#F7F4EC', '#203B42', '#174F62', '#DCE5D6', '#C7CDC4'

def rect(x,y,w,h,c,stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"'+(f' stroke="{stroke}"' if stroke else '')+'/>'
def text(x,y,s,size=18,c=INK,font='Segoe UI',weight='400'):
    return f'<text x="{x}" y="{y}" fill="{c}" font-family="{font}" font-size="{size}" font-weight="{weight}">{escape(s)}</text>'
def lines(x,y,ss,size=18,step=28,c=INK,font='Segoe UI'):
    return ''.join(text(x,y+i*step,s,size,c,font) for i,s in enumerate(ss))
def rule(x,y,w,c=LINE):
    return f'<path d="M{x} {y}h{w}" stroke="{c}"/>'
def link(x,y,s,size=18,c=BLUE):
    return text(x,y,s,size,c,weight='600')
def scene(x,y,w,h):
    # Illustration géométrique originale, sans photographie ni carte.
    return f'''<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice">
    <rect width="600" height="460" fill="#DFE8DC"/>
    <circle cx="460" cy="82" r="44" fill="#E4C78E"/>
    <path d="M0 164Q125 78 280 145T600 121V460H0Z" fill="#B3C5AD"/>
    <path d="M0 239Q155 159 302 217T600 188V460H0Z" fill="#7E9E89"/>
    <path d="M600 242C435 173 430 306 274 292S130 296 0 356V460H600Z" fill="#578898"/>
    <path d="M600 268C431 205 437 333 275 319S125 330 0 386" fill="none" stroke="#B9D1CF" stroke-width="3"/>
    <path d="M600 358Q441 276 366 378T164 460H600Z" fill="#D8C79E"/>
    <path d="M600 378Q462 315 384 408T251 460" fill="none" stroke="#F3E7CA" stroke-width="15"/>
    <path d="M44 249V157L152 140L237 175V264Z" fill="#EEE5CE"/>
    <path d="M44 157L152 116L237 158V178L150 147Z" fill="#456B68"/>
    <path d="M152 147V256L237 264V178Z" fill="#CDBF9C"/>
    <path d="M67 184V218M98 180V214M126 174V208M179 190V226M210 201V237" stroke="#456B68" stroke-width="12"/>
    <path d="M273 240V121M304 246V150M518 300V165" stroke="#556C57" stroke-width="8"/>
    <ellipse cx="273" cy="118" rx="25" ry="48" fill="#3E6B5D"/>
    <ellipse cx="304" cy="147" rx="22" ry="38" fill="#628A69"/>
    <ellipse cx="518" cy="167" rx="31" ry="58" fill="#3E6B5D"/>
    <path d="M272 84V147M517 125V208" stroke="#ACC09B" stroke-width="2"/>
    <path d="M55 297l48-5m258-45l43-6m-221 122l59-4m191-41l36 5" stroke="#D5E2D5" stroke-width="2"/>
    </svg>'''
def header(mobile=False,ox=0,oy=0,w=1440):
    a=rect(ox,oy,w,36 if not mobile else 48,INK)
    if mobile:
        a+=lines(ox+20,oy+19,['DÉMONSTRATION PERSONNELLE','Commune et données fictives'],11,17,'#FFFFFF')
        a+=text(ox+20,oy+89,'Belle-Rive',30,INK,'Georgia')
        a+=rule(ox+20,oy+108,w-40)
        a+=text(ox+20,oy+135,'Informations pratiques',13)+text(ox+190,oy+135,'Agenda',13)+text(ox+260,oy+135,'Équipements',13)
        a+=rect(ox+20,oy+154,w-40,45,'#FFFFFF',LINE)
        a+=text(ox+33,oy+182,'Rechercher une information',14,'#4A6268')+text(ox+w-45,oy+182,'→',20,BLUE)
        return a
    a+=text(64,24,'DÉMONSTRATION PERSONNELLE — COMMUNE ET DONNÉES FICTIVES',12,'#FFFFFF')
    a+=text(64,97,'Belle-Rive',38,INK,'Georgia')
    a+=text(443,91,'Informations pratiques',17)+text(672,91,'Agenda',17)+text(781,91,'Équipements',17)
    a+=rect(1018,60,358,48,'#FFFFFF',LINE)+text(1036,90,'Rechercher une information',16,'#4A6268')+text(1342,91,'→',22,BLUE)
    return a+rule(64,131,1312)
def footer(y,w=1440):
    return rect(0,y,w,110,INK)+text(64,y+43,'Belle-Rive',28,'#FFFFFF','Georgia')+text(64,y+77,'Démonstration personnelle • Commune et données fictives • Aucun service réel',14,'#FFFFFF')
def svg(w,h,body,title):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{escape(title)}</title><desc>Maquette statique de conception. Aucun lien, recherche ou bouton fonctionnel.</desc>'+rect(0,0,w,h,PAPER)+body+'</svg>'

def home():
    a=header()+rect(64,170,1312,454,BLUE)
    a+=text(100,218,'VOTRE QUOTIDIEN',13,'#E4C78E',weight='600')
    a+=lines(100,290,['Les informations','utiles à Belle-Rive'],53,64,'#FFFFFF','Georgia')
    a+=lines(100,419,['Préparer une visite, découvrir un lieu,','consulter les événements du scénario.'],20,31,'#FFFFFF')
    a+=rect(100,500,283,52,PAPER)+link(120,532,'Informations pratiques   →',17)
    a+=scene(760,170,616,454)
    a+=text(778,600,'Illustration originale • territoire imaginaire',12,INK)
    a+=text(64,688,'Trouver votre information',34,INK,'Georgia')
    cards=[('01','Informations pratiques',['Préparer une visite','à l’accueil de la mairie.'],'Consulter les informations →'),('02','Agenda',['Dates, publics et conditions','des événements fictifs.'],'Voir l’agenda →'),('03','Équipements',['Retrouver un lieu, ses horaires','et les informations d’accès.'],'Voir les équipements →')]
    for i,(n,t,ss,l) in enumerate(cards):
        x=64+i*448
        a+=rect(x,720,416,220,'#EBEFE5')+text(x+24,755,n,14,BLUE)
        a+=text(x+24,798,t,25,INK,'Georgia')+lines(x+24,834,ss,17,26)+link(x+24,911,l,16)
    a+=text(64,1011,'À l’agenda',34,INK,'Georgia')+text(801,1008,'Scénario au 10 novembre 2026, 10 h • Europe/Paris',15)
    a+=rule(64,1039,1312)+rect(64,1063,100,104,GREEN)
    a+=text(87,1104,'21',35,BLUE,'Georgia')+text(86,1141,'NOV.',16,BLUE)
    a+=text(195,1081,'À VENIR • LECTURE',12,BLUE,weight='600')+text(195,1122,'Histoires au bord de l’eau',29,INK,'Georgia')
    a+=text(195,1157,'15 h–16 h • Médiathèque des Rives • Dès 6 ans, enfant accompagné',17)
    a+=link(1134,1125,'Voir l’événement →',16)
    a+=text(64,1230,'BR-C3 V1 • Accueil S0 • Vue de conception fixe — interactions non actives',13)
    return svg(1440,1380,a+footer(1270),'Belle-Rive — accueil proposé, scénario S0')

def detail():
    a=header()+text(64,174,'Accueil  /  Équipements  /  Médiathèque des Rives',14,BLUE)
    a+=text(64,228,'ÉQUIPEMENT • LIEU FICTIF',13,BLUE,weight='600')
    a+=text(64,293,'Médiathèque des Rives',54,INK,'Georgia')
    a+=text(64,338,'Un lieu fictif consacré à la lecture et à la consultation sur place.',22)
    a+=scene(954,385,422,315)
    a+=text(64,421,'Adresse et entrée',30,INK,'Georgia')
    a+=lines(64,462,['4, promenade des Rives — Belle-Rive','Adresse fictive • Entrée côté promenade'],19,30)
    a+=text(64,554,'Horaires ordinaires',30,INK,'Georgia')
    a+=text(64,587,'Les jours et créneaux du scénario ; aucune ouverture réelle annoncée.',16)
    a+=rect(64,608,820,40,GREEN)+text(80,635,'Jour',15,weight='600')+text(350,635,'Matin',15,weight='600')+text(615,635,'Après-midi',15,weight='600')
    data=[('Lundi','Fermé','Fermé'),('Mardi','Fermé','14 h–18 h'),('Mercredi','10 h–12 h','14 h–18 h'),('Jeudi','Fermé','Fermé'),('Vendredi','Fermé','14 h–18 h'),('Samedi','10 h–12 h','14 h–18 h'),('Dimanche','Fermé','Fermé')]
    for i,(d,m,p) in enumerate(data):
        yy=648+i*43
        a+=rect(64,yy,820,43,'#FFFFFF' if i%2==0 else '#F0F0E7')
        a+=text(80,yy+28,d,17)+text(350,yy+28,m,17)+text(615,yy+28,p,17)
    a+=rect(954,724,422,184,GREEN)+text(978,760,'Le lieu dans le scénario',23,INK,'Georgia')
    a+=lines(978,797,['Des temps de lecture sont proposés','dans cette démonstration. Les conditions','d’un éventuel emprunt ne sont pas','décrites.'],16,25)
    a+=text(64,1013,'Accès physique : information non documentée',29,INK,'Georgia')
    a+=lines(64,1052,['L’absence d’information ne permet de conclure ni à l’accessibilité,','ni à l’inaccessibilité du bâtiment fictif.'],18,29)
    a+=text(64,1159,'Événement associé',31,INK,'Georgia')
    a+=rect(64,1186,1312,160,'#F1E3DC')+rect(64,1186,5,160,'#93482F')
    a+=text(88,1218,'ANNULÉ',13,'#783B28',weight='600')+text(88,1260,'Histoires au bord de l’eau',28,INK,'Georgia')
    a+=text(88,1294,'21 novembre 2026, 15 h–16 h • Motif non renseigné ; aucune nouvelle date annoncée.',17)
    a+=link(88,1326,'Consulter l’événement annulé →',16)
    a+=text(64,1392,'Date éditoriale fictive : 9 novembre 2026 • EQ-01 r1 • Événement : variante S4',14)
    a+=link(64,1441,'← Retour aux équipements',17)
    a+=text(64,1490,'BR-C3 V1 • Détail EQ-01, variante S4 • Illustration imaginaire • Vue fixe',13)
    return svg(1440,1640,a+footer(1530),'Belle-Rive — médiathèque, variante avec événement annulé')

def mobiles():
    a=rect(0,0,1100,2370,'#E2E6DF')+text(64,60,'BELLE-RIVE / DÉCLINAISONS ÉTROITES',17,INK,weight='600')
    a+=text(64,96,'Deux compositions fixes de 390 px • aucun comportement adaptatif testé',18)
    for x,title in [(100,'ACCUEIL • S0'),(610,'MÉDIATHÈQUE • S4')]:
        a+=text(x,144,title,14,BLUE,weight='600')+rect(x,172,390,2100,PAPER)+header(True,x,172,390)
    x,y=100,172
    a+=rect(x+20,y+226,350,305,BLUE)+text(x+40,y+261,'VOTRE QUOTIDIEN',12,'#E4C78E')
    a+=lines(x+40,y+310,['Les informations','utiles à Belle-Rive'],31,40,'#FFFFFF','Georgia')
    a+=lines(x+40,y+412,['Préparer une visite, découvrir un lieu,','consulter les événements du scénario.'],15,24,'#FFFFFF')
    a+=rect(x+40,y+467,310,44,PAPER)+link(x+54,y+495,'Informations pratiques →',15)
    a+=text(x+20,y+582,'Trouver votre information',26,INK,'Georgia')
    for i,(t,s,l) in enumerate([('Informations pratiques','Préparer une visite à la mairie.','Consulter les informations →'),('Agenda','Dates, publics et conditions.','Voir l’agenda →'),('Équipements','Horaires et accès aux lieux.','Voir les équipements →')]):
        yy=y+607+i*153
        a+=rect(x+20,yy,350,133,'#EBEFE5')+text(x+36,yy+36,t,23,INK,'Georgia')+text(x+36,yy+69,s,15)+link(x+36,yy+108,l,15)
    a+=text(x+20,y+1116,'À l’agenda',29,INK,'Georgia')
    a+=lines(x+20,y+1149,['Scénario au 10 novembre 2026, 10 h','Europe/Paris'],13,22)
    a+=rule(x+20,y+1197,350)+text(x+20,y+1230,'À VENIR • 21 NOVEMBRE 2026',12,BLUE,weight='600')
    a+=lines(x+20,y+1272,['Histoires au bord','de l’eau'],27,35,INK,'Georgia')
    a+=lines(x+20,y+1351,['15 h–16 h • Médiathèque des Rives','Dès 6 ans, enfant accompagné'],15,25)+link(x+20,y+1423,'Voir l’événement →',16)
    a+=scene(x+20,y+1460,350,230)+text(x+20,y+1717,'Illustration originale • rive imaginaire',12)
    a+=rect(x,y+1770,390,330,INK)+text(x+20,y+1815,'Belle-Rive',28,'#FFFFFF','Georgia')
    a+=lines(x+20,y+1855,['Démonstration personnelle','Commune et données fictives','Aucun service réel'],15,27,'#FFFFFF')
    a+=lines(x+20,y+2000,['Conception fixe • Accueil S0','Navigation et recherche non actives'],12,22,'#FFFFFF')
    x,y=610,172
    a+=text(x+20,y+231,'Accueil / Équipements',13,BLUE)+text(x+20,y+270,'ÉQUIPEMENT • LIEU FICTIF',12,BLUE)
    a+=lines(x+20,y+316,['Médiathèque','des Rives'],36,44,INK,'Georgia')
    a+=lines(x+20,y+402,['Un lieu fictif consacré à la lecture','et à la consultation sur place.'],16,25)
    a+=text(x+20,y+492,'Adresse et entrée',25,INK,'Georgia')
    a+=lines(x+20,y+528,['4, promenade des Rives — Belle-Rive','Adresse fictive','Entrée côté promenade'],15,25)
    a+=text(x+20,y+640,'Horaires ordinaires',25,INK,'Georgia')
    days=[('Lundi','Fermé'),('Mardi','14 h–18 h'),('Mercredi','10 h–12 h et 14 h–18 h'),('Jeudi','Fermé'),('Vendredi','14 h–18 h'),('Samedi','10 h–12 h et 14 h–18 h'),('Dimanche','Fermé')]
    for i,(d,h) in enumerate(days):
        yy=y+664+i*52
        a+=rect(x+20,yy,350,52,'#EBEFE5' if i%2==0 else PAPER)+text(x+30,yy+32,d,15)+text(x+131,yy+32,h,14)
    a+=lines(x+20,y+1088,['Accès physique :','information non documentée'],23,31,INK,'Georgia')
    a+=lines(x+20,y+1164,['Cette absence ne permet de conclure','ni à l’accessibilité, ni à l’inaccessibilité','du bâtiment fictif.'],15,24)
    a+=text(x+20,y+1272,'Événement associé',25,INK,'Georgia')
    a+=rect(x+20,y+1295,350,240,'#F1E3DC')+rect(x+20,y+1295,4,240,'#93482F')
    a+=text(x+36,y+1328,'ANNULÉ',12,'#783B28',weight='600')+lines(x+36,y+1369,['Histoires au bord de l’eau'],23,30,INK,'Georgia')
    a+=lines(x+36,y+1404,['21 novembre 2026 • 15 h–16 h','Motif non renseigné ; aucune','nouvelle date annoncée.'],14,23)
    a+=link(x+36,y+1504,'Consulter l’événement annulé →',14)
    a+=text(x+20,y+1588,'Le lieu dans le scénario',23,INK,'Georgia')
    a+=lines(x+20,y+1629,['Des temps de lecture sont proposés','dans cette démonstration. Les conditions','d’un éventuel emprunt ne sont pas','décrites.'],15,25)
    a+=text(x+20,y+1777,'Consultation sur place • lieu fictif',12)
    a+=lines(x+20,y+1813,['Date éditoriale fictive : 9 novembre 2026','EQ-01 r1 • Variante S4'],12,21)
    a+=link(x+20,y+1881,'← Retour aux équipements',15)
    a+=rect(x,y+1920,390,180,INK)+text(x+20,y+1961,'Belle-Rive',27,'#FFFFFF','Georgia')
    a+=lines(x+20,y+1994,['Démonstration personnelle','Commune et données fictives','Vue de conception fixe'],13,25,'#FFFFFF')
    a+=text(64,2330,'BR-C3 V1 • Compositions proposées — aucun test produit, mobile ou utilisateur exécuté',14)
    return svg(1100,2370,a,'Belle-Rive — compositions étroites accueil et médiathèque')

def states():
    a=text(64,65,'BELLE-RIVE / ÉTATS À NE PAS MASQUER',18,INK,weight='600')
    a+=text(64,105,'Extraits de vues distinctes • propositions fixes • aucune interaction active',18)
    a+=text(64,172,'01 / Exception horaire — IP-01, scénario S2',24,INK,'Georgia')
    a+=rect(64,202,1312,163,'#F2E9CC')+rect(64,202,5,163,'#7C601B')
    a+=text(88,237,'FERMETURE EXCEPTIONNELLE',13,'#665018',weight='600')
    a+=text(88,278,'Mercredi 18 novembre 2026 : accueil fermé de 14 h à 17 h.',25,INK,'Georgia')
    a+=text(88,316,'L’ouverture du matin est maintenue de 9 h à 12 h. Les autres horaires ordinaires restent inchangés.',18)
    a+=text(88,345,'Information fictive • à placer avant les horaires ordinaires dans la fiche mairie',13)
    a+=text(64,438,'02 / Recherche sans résultat — scénario S0',24,INK,'Georgia')
    a+=rect(64,468,680,54,'#FFFFFF',LINE)+text(84,502,'piscine',20)+rect(744,468,180,54,BLUE)+text(770,501,'Rechercher',18,'#FFFFFF')
    a+=text(64,583,'Aucun résultat pour « piscine »',32,INK,'Georgia')
    a+=text(64,625,'Essayez d’autres mots ou consultez une rubrique. La recherche porte uniquement sur les contenus fictifs.',18)
    a+=link(64,681,'Informations pratiques →',18)+link(518,681,'Agenda →',18)+link(920,681,'Équipements →',18)
    a+=text(64,751,'Une indisponibilité technique exige un message différent : « La recherche est momentanément indisponible. »',16)
    a+=text(64,824,'BR-C3 V1 • Composition de deux états indépendants, sans modification des scénarios BR-C2',13)
    return svg(1440,870,a,'Belle-Rive — exception horaire et recherche sans résultat')

if __name__ == '__main__':
    OUT.mkdir(exist_ok=True)
    for name,fn in [('ACCUEIL',home),('DETAIL',detail),('MOBILE',mobiles),('ETATS',states)]:
        p=OUT / f'BELLE_RIVE_BR_C3_{name}_V1.svg'
        p.write_text(fn(),encoding='utf-8')
        print(p)
