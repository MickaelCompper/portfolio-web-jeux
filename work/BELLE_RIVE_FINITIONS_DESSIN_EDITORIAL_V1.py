"""Génération de planches SVG fixes uniquement, sans interface fonctionnelle."""
from pathlib import Path
from html import escape

OUT=Path(__file__).resolve().parents[1]/'outputs'
INK='#203B42'; BLUE='#174F62'; PAPER='#F7F4EC'; LINE='#C7CDC4'
def r(x,y,w,h,c,stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"'+(f' stroke="{stroke}"' if stroke else '')+'/>'
def t(x,y,s,n=18,c=INK,serif=False):
    return f'<text x="{x}" y="{y}" font-family="{("Georgia" if serif else "Segoe UI")}" font-size="{n}" fill="{c}">{escape(s)}</text>'
def ls(x,y,ss,n=18,dy=27,c=INK): return ''.join(t(x,y+i*dy,s,n,c) for i,s in enumerate(ss))
def button(x,y,s,w=230): return r(x,y,w,45,BLUE)+t(x+14,y+29,s,16,'#FFFFFF')
def field(x,y,label,value,w=620):
    return t(x,y,label,16)+r(x,y+12,w,43,'#FFFFFF',LINE)+t(x+14,y+40,value,17)
def panel(x,y,num,title,meta):
    return r(x,y,760,495,PAPER)+r(x,y,760,42,INK)+t(x+22,y+27,'BELLE-RIVE / ÉDITION LOCALE — VUE FIXE',13,'#FFFFFF')+t(x+24,y+85,num+'  '+title,28,INK,True)+t(x+24,y+116,meta,14)
def frame(body,title,h=1880):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="1700" height="{h}" viewBox="0 0 1700 {h}" role="img"><title>{escape(title)}</title><desc>Six compositions statiques, sans saisie ni lien actif. Données fictives.</desc>'+r(0,0,1700,h,'#E2E6DF')+body+'</svg>'

def desktop():
    a=t(70,61,'BELLE-RIVE / SÉQUENCE ÉDITORIALE PROPOSÉE',23)+t(70,101,'D-03 • États successifs ou variantes nommées • Aucun formulaire actif, aucun secret généré',18)
    pos=[(70,155),(870,155),(70,700),(870,700),(70,1245),(870,1245)]
    x,y=pos[0]; a+=panel(x,y,'01','Ouvrir l’édition','Connexion locale • point de départ de la séquence')
    a+=ls(x+24,y+158,['Saisissez le secret affiché dans votre terminal local.','Il ne s’agit pas d’un compte usager.'],17)
    a+=field(x+24,y+239,'Secret de lancement','Champ vide — aucun secret dans la maquette')
    a+=t(x+24,y+322,'Le collage et les outils d’assistance restent autorisés.',15)+button(x+24,y+353,'Ouvrir l’édition')
    a+=ls(x+24,y+437,['Focus initial : titre ; puis libellé, champ, action.','Échec : message lié au champ, pas de secret réaffiché.'],14,23)
    x,y=pos[1]; a+=panel(x,y,'02','Préparer le brouillon','IP-01 • base publique r1 • variante S1')
    a+=r(x+24,y+139,712,37,'#DCE5D6')+t(x+36,y+164,'BROUILLON — NON PUBLIÉ • version publique r1 inchangée',15)
    a+=field(x+24,y+207,'Date de l’exception','18 novembre 2026',300)
    a+=field(x+346,y+207,'Période affectée','14 h–17 h',365)
    a+=ls(x+24,y+300,['Accueil fermé de 14 h à 17 h.','Ouverture du matin maintenue de 9 h à 12 h.'],18)
    a+=button(x+24,y+350,'Enregistrer le brouillon')+t(x+286,y+380,'Préparer la publication →',16,BLUE)
    a+=ls(x+24,y+437,['État représenté après saisie : modifications non enregistrées.','Après succès seulement : « Brouillon enregistré », date réelle.'],14,23)
    x,y=pos[2]; a+=panel(x,y,'03','Corriger avant publication','Variante S9 • période manquante • aucune publication effectuée')
    a+=r(x+24,y+139,712,99,'#F1E3DC')+ls(x+40,y+171,['La publication est bloquée : 1 champ à corriger.','Renseignez la période affectée.'],18,29,'#783B28')
    a+=field(x+24,y+278,'Période affectée — obligatoire','Champ vide',620)
    a+=t(x+24,y+352,'Indiquez les heures de début et de fin de la fermeture.',16,'#783B28')
    a+=button(x+24,y+377,'Vérifier les informations')
    a+=ls(x+24,y+453,['Focus : synthèse d’erreurs → champ concerné ; saisie conservée.'],14,23)
    x,y=pos[3]; a+=panel(x,y,'04','Confirmer la publication','Après correction et enregistrement • résumé relu avant action')
    a+=ls(x+24,y+162,['Vous allez remplacer la version publique r1 de la fiche mairie.','Nouvelle exception : 18 novembre 2026, 14 h–17 h fermé.','Matin maintenu : 9 h–12 h.','La version précédente restera conservée.'],18,33)
    a+=button(x+24,y+332,'Publier cette révision',245)+t(x+300,y+362,'Revenir au brouillon',16,BLUE)
    a+=ls(x+24,y+428,['Focus : titre, résumé puis action explicite ; pas de publication au focus.','L’action transmet une opération identifiée ; double clic sans doublon.'],14,23)
    x,y=pos[4]; a+=panel(x,y,'05','Publication à vérifier','Branche d’incertitude • réponse perdue • résultat encore inconnu')
    a+=r(x+24,y+139,712,95,'#F2E9CC')+ls(x+40,y+171,['La confirmation n’a pas été reçue.','La publication a peut-être été enregistrée.'],18,29)
    a+=ls(x+24,y+278,['Vérifiez le résultat avant de recommencer.','Référence d’exemple : OP-DEMO-02, sans valeur de secret.'],17)
    a+=button(x+24,y+349,'Vérifier le résultat')
    a+=ls(x+24,y+431,['Focus : titre ; aucune annonce « échec » ou « succès » inventée.','Après redémarrage : reconnexion, puis recherche de cette opération.'],14,23)
    x,y=pos[5]; a+=panel(x,y,'06','Révision publiée','Résultat confirmé • scénario S2 • pas une publication réelle')
    a+=r(x+24,y+139,712,77,'#DCE5D6')+t(x+40,y+184,'La révision r2 est publiée dans le scénario.',23,INK,True)
    a+=ls(x+24,y+263,['Exception : 18 novembre 2026, après-midi fermé.','Matin maintenu de 9 h à 12 h.','La révision r1 reste dans l’historique.'],18,30)
    a+=button(x+24,y+365,'Consulter la fiche publique',265)
    a+=ls(x+24,y+449,['Horodatage réel à afficher seulement après exécution réussie.'],14)
    a+=ls(70,1792,['Lecture : 01 → 02 → 04 → 06. La vue 03 est une erreur à corriger ; la vue 05 est une branche d’incertitude.','La sortie et la déconnexion restent disponibles dans le futur outil ; aucune donnée réelle, aucun test produit ici.'],17,29)
    return frame(a,'Belle-Rive — six vues éditoriales fixes')

if __name__=='__main__':
    p=OUT/'BELLE_RIVE_FINITIONS_EDITORIAL_V1.svg'; p.write_text(desktop(),encoding='utf-8'); print(p)
