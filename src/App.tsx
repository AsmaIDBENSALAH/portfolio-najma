import { FormEvent, useEffect, useState } from 'react'

type Creation = {
  id: number
  title: string
  category: string
  image: string
  description: string
  flavors: string
  techniques: string
  context: string
  detailImages?: string[]
  tall?: boolean
}


const BASE_URL = import.meta.env.BASE_URL;

const creations: Creation[] = [
  { id: 1, title: 'Tarte mango', category: 'Tartes', image: `${BASE_URL}creations/tarte-mangue-01.webp`, detailImages: [`${BASE_URL}creations/tarte-mangue-02.webp`], description: 'Une tarte graphique associant un disque fruité brillant à un pochage régulier.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Fonçage, pochage, glaçage et finition', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 2, title: 'Croissants', category: 'Viennoiseries', image: `${BASE_URL}creations/croissant-01.webp`, detailImages: [`${BASE_URL}creations/croissants-03.webp`, `${BASE_URL}creations/croissant-02.webp`], description: 'Des croissants dorés au feuilletage développé, présentés entiers et en coupe.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Tourage, façonnage, pousse et cuisson', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 3, title: 'Éclairs au chocolat', category: 'Petites pâtisseries', image: `${BASE_URL}creations/eclairs-chocolat.webp`, detailImages: [`${BASE_URL}creations/eclair-chocolat-detail.webp`], description: 'Une série d’éclairs réguliers à la finition chocolat brillante.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Pâte à choux, garnissage et glaçage', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 4, title: 'Macaron passion', category: 'Macarons', image: `${BASE_URL}creations/macarons-01.webp`, detailImages: [`${BASE_URL}creations/macarons-02.webp`], description: 'Des coques régulières et garnies, accompagnées d’une vue du travail de montage.', flavors: 'Parfum et composition à confirmer avec Najma', techniques: 'Macaronnage, pochage, cuisson et garnissage', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 5, title: 'Royal', category: 'Entremets', image: `${BASE_URL}creations/entremets-chocolat.webp`, description: 'Un entremets au glaçage miroir profond, souligné par un décor de disques en chocolat.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Montage, glaçage miroir et décor chocolat', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 6, title: 'Tarte aux pommes', category: 'Tartes', image: `${BASE_URL}creations/tarte-pommes.webp`, description: 'Une tarte aux pommes au dressage concentrique précis et à la finition brillante.', flavors: 'Pomme — composition complémentaire à confirmer', techniques: 'Fonçage, découpe, dressage et cuisson', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 7, title: 'Millefeuilles classiques', category: 'Petites pâtisseries', image: `${BASE_URL}creations/millefeuille.webp`, description: 'Des millefeuilles individuels aux couches nettes et au décor marbré traditionnel.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Feuilletage, crème, montage et marbrage', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 8, title: 'Religieuses au chocolat', category: 'Petites pâtisseries', image: `${BASE_URL}creations/religieuses-chocolat.webp`, description: 'Une production de religieuses au chocolat montée avec régularité et précision.', flavors: 'Chocolat — composition complémentaire à confirmer', techniques: 'Pâte à choux, garnissage, glaçage et montage', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 9, title: 'Éclairs glacés', category: 'Petites pâtisseries', image: `${BASE_URL}creations/eclairs-glacage.webp`, description: 'Des éclairs allongés à la finition claire, brillante et délicatement ponctuée.', flavors: 'Parfum et composition à confirmer avec Najma', techniques: 'Pâte à choux, garnissage et glaçage', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 10, title: 'Tarte aux abricots', category: 'Tartes', image: `${BASE_URL}creations/tarte-abricots.webp`, detailImages: [`${BASE_URL}creations/tarte-abricots-02.webp`], description: 'Une tarte fruitée généreuse, décorée d’abricots et d’éclats de pistache.', flavors: 'Abricot et pistache — composition à confirmer', techniques: 'Fonçage, cuisson, nappage et finition', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 11, title: 'Tarte crumble aux cerises', category: 'Tartes', image: `${BASE_URL}creations/tarte-crumble-cerises.webp`, description: 'Une tarte rustique au crumble fin, ponctuée de cerises et de pistaches.', flavors: 'Cerise et pistache — composition à confirmer', techniques: 'Fonçage, crumble, cuisson et décor', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 12, title: 'Millefeuille rond', category: 'Créations', image: `${BASE_URL}creations/millefeuille-rond.webp`, description: 'Une interprétation ronde du millefeuille, généreusement garnie et décorée d’un marbrage rayonnant.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Feuilletage, pochage, montage et marbrage', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 13, title: 'Tarte meringuée', category: 'Tartes', image: `${BASE_URL}creations/tarte-meringuee.webp`, description: 'Une tarte recouverte d’un pochage de meringue régulier et délicatement coloré.', flavors: 'Parfum et composition à confirmer avec Najma', techniques: 'Fonçage, garnissage, pochage et coloration', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 14, title: 'Flan', category: 'Tartes', image: `${BASE_URL}creations/flan-vanille.webp`, description: 'Une tarte à l’appareil lisse et brillant, finie par une gousse de vanille.', flavors: 'Vanille — composition complémentaire à confirmer', techniques: 'Fonçage, appareil crémeux, cuisson et finition', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 15, title: 'Assortiment feuilleté', category: 'Viennoiseries', image: `${BASE_URL}creations/assortiment-feuillete.webp`, description: 'Un assortiment de pièces feuilletées aux formes variées et à la dorure régulière.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Tourage, détaillage, façonnage et cuisson', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 16, title: 'Petits entremets chocolat', category: 'Entremets', image: `${BASE_URL}creations/petits-entremets-chocolat.webp`, description: 'Deux petits entremets individuels à la finition miroir et au décor chocolat.', flavors: 'Chocolat — composition complémentaire à confirmer', techniques: 'Montage, glaçage miroir et décor chocolat', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 17, title: 'Fraisier', category: 'Tartes', image: `${BASE_URL}creations/tarte-fraises-pochee.webp`, description: 'Une tarte généreusement pochée, ponctuée de fraises fraîches.', flavors: 'Fraise — composition complémentaire à confirmer', techniques: 'Fonçage, garnissage, pochage et décor', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 18, title: 'Pains aux raisins', category: 'Viennoiseries', image: `${BASE_URL}creations/pains-raisins.webp`, description: 'Des viennoiseries en spirale travaillées en format individuel.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Tourage, façonnage, pousse et cuisson', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },

  { id: 19, title: 'Entremets aux fraises', category: 'Entremets', image: `${BASE_URL}creations/entremets-fraises.webp`, description: 'Un entremets à la finition rouge brillante, généreusement décoré de fraises fraîches.', flavors: 'Fraise — composition complémentaire à confirmer', techniques: 'Montage, glaçage, découpe et décor fruité', context: 'Réalisation de Najma — contexte et date à compléter' },

  { id: 20, title: 'Gâteau Moka', category: 'Créations', image: `${BASE_URL}creations/gateau-praline.webp`, description: 'Un gâteau de partage au pochage texturé, fini avec des éclats et des éléments chocolatés.', flavors: 'Composition exacte à confirmer avec Najma', techniques: 'Montage, pochage, masquage et finition', context: 'Réalisation de Najma — contexte et date à compléter', tall: true },
];

const categories = ['Tout', 'Entremets', 'Tartes', 'Viennoiseries', 'Macarons', 'Petites pâtisseries', 'Créations']

const skillGroups = [
  { number: '01', title: 'Techniques de pâtisserie', text: 'De la pesée précise aux finitions soignées.', items: ['Préparations pâtissières', 'Crèmes & garnitures', 'Montage d’entremets', 'Chocolaterie', 'Macarons'] },
  { number: '02', title: 'Créativité & présentation', text: 'L’équilibre du goût au service d’une esthétique juste.', items: ['Dressage des desserts', 'Composition visuelle', 'Saveurs & textures', 'Décoration', 'Création'] },
  { number: '03', title: 'Rigueur professionnelle', text: 'Une organisation adaptée aux exigences de la production.', items: ['Hygiène & sécurité', 'Gestion du temps', 'Travail en équipe', 'Matières premières', 'Précision'] },
  { number: '04', title: 'Valorisation du produit', text: 'Une double sensibilité produit et relation client.', items: ['Communication', 'Présentation produit', 'Relation client', 'Promotion'] },
]

const experiences = [
  { date: 'Oct. 2026', place: 'Paris, France', company: 'Boutique Delmontel', role: 'Stagiaire en pâtisserie', missions: ['Préparation des produits pâtissiers', 'Présentation et finition', 'Gestion des matières premières', 'Participation à la production quotidienne'], future: true },
  { date: 'Nov. 2024 — Mars 2025', place: 'Agadir, Maroc', company: 'Nijad Food', role: 'Stagiaire au service de pâtisserie', missions: ['Préparation des produits pâtissiers', 'Présentation et finition', 'Gestion des matières premières', 'Participation à la production quotidienne'] },
  { date: 'Mars — Sept. 2024', place: 'Agadir, Maroc', company: 'Café Boulangerie & Pâtisserie', role: 'Stagiaire au service de pâtisserie', missions: ['Préparation des ingrédients', 'Réalisation des préparations', 'Décoration et finition', 'Organisation du poste de travail'] },
  { date: 'Déc. 2022 — Oct. 2023', place: 'Agadir, Maroc', company: 'Les Jardins d’Agadir', role: 'Stagiaire au service de pâtisserie', missions: ['Préparation et pesée', 'Préparations pâtissières', 'Présentation et finition', 'Gestion des matières premières'] },
  { date: 'Fév. — Oct. 2022', place: 'Agadir, Maroc', company: 'Hôtel Argana Agadir', role: 'Stagiaire au service de pâtisserie', missions: ['Mesure et mélange', 'Préparation des pâtisseries', 'Présentation et finition', 'Organisation des matières premières'] },
]

const education = [
  { place: 'Yssingeaux, France', school: 'École Ducasse — ENSP', degree: 'Formation actuelle en pâtisserie', note: 'Intitulé du programme et dates à compléter', current: true },
  { place: 'Agadir, Maroc', school: 'Institut Spécialisé de Technologie en Hôtellerie et de Tourisme Founty — OFPPT', degree: 'Diplôme en Pâtisserie-Chocolaterie', note: 'Techniques de pâtisserie et de chocolaterie' },
  { place: 'Maroc', school: 'Académie des Applications', degree: 'Diplôme en pâtisserie', note: 'Formation spécialisée en macarons' },
  { place: 'Maroc', school: 'Association MALADH', degree: 'Diplôme en pâtisserie', note: 'Développement de la femme et de la famille' },
  { place: 'Agadir, Maroc', school: 'École Supérieure de Technologie d’Agadir', degree: 'DUT — Techniques de Commercialisation et de Communication', note: 'Communication, commercialisation et valorisation des produits' },
  { place: 'Maroc', school: 'Lycée Omar El Kheyam', degree: 'Baccalauréat en Sciences expérimentales', note: 'Mention Bien' },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={diagonal ? 'arrow diagonal' : 'arrow'}>→</span>
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState('Tout')
  const [selected, setSelected] = useState<Creation | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [selected])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = String(form.get('subject') || 'Contact depuis le portfolio')
    const body = [
      `Nom : ${String(form.get('name') || '')}`,
      `E-mail : ${String(form.get('email') || '')}`,
      `Entreprise : ${String(form.get('company') || 'Non renseignée')}`,
      '',
      String(form.get('message') || ''),
    ].join('\n')
    setSent(true)
    event.currentTarget.reset()
    window.location.href = `mailto:najmafarrich@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  const filtered = category === 'Tout' ? creations : creations.filter((item) => item.category === category)

  return (
    <>
      <header className="navbar">
        <a className="brand" href="#accueil" aria-label="Najma Farrich, accueil"><span>NF</span><strong>Najma Farrich</strong></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu"><span /><span /></button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigation principale">
          {[['À propos', 'a-propos'], ['Savoir-faire', 'competences'], ['Créations', 'creations'], ['Parcours', 'parcours']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Me contacter <Arrow diagonal /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <div className="hero-kicker"><span /> Portfolio professionnel · Pâtisserie</div>
            <h1>Najma<br /><em>Farrich</em></h1>
            <p className="hero-role">Pâtissière · Passionnée de gastronomie<br />et de création pâtissière</p>
            <blockquote>« L’art de la pâtisserie, là où la précision rencontre la créativité. »</blockquote>
            <div className="hero-actions"><a className="button primary" href="#creations">Découvrir mes créations <Arrow /></a><a className="text-link" href="#contact">Me contacter <Arrow diagonal /></a></div>
          </div>
          <div className="hero-image-wrap">
            <img src="/creations/entremets-chocolat-hero.webp" alt="Entremets au chocolat réalisé par Najma Farrich" />
            <span className="image-label">Création de Najma · Entremets chocolat</span>
            <div className="hero-stamp"><span>En formation</span><strong>ENSP</strong><span>Yssingeaux · France</span></div>
          </div>
          <div className="availability"><span className="pulse" /><p><strong>Disponible</strong> Stage & opportunités professionnelles en France</p></div>
        </section>

        <section className="manifesto">
          <p className="eyebrow">01 · Portrait</p>
          <p className="manifesto-text">Créer avec <em>précision</em>, apprendre avec exigence et faire de chaque dessert une expérience qui se regarde autant qu’elle se déguste.</p>
        </section>

        <section className="about section" id="a-propos">
          <div className="about-image"><img src="/creations/macarons-02.webp" alt="Macarons en cours de garnissage pendant une séance de travail" loading="lazy" /><p>En cours de réalisation — photographie fournie par Najma<br />À remplacer par son portrait professionnel lorsqu’il sera disponible</p></div>
          <div className="about-copy">
            <SectionHeading eyebrow="02 · À propos" title="Une passion pour la pâtisserie, un engagement pour l’excellence." />
            <p className="lead">Actuellement en formation à l’École Ducasse — École Nationale Supérieure de Pâtisserie à Yssingeaux, je perfectionne chaque jour mon geste, ma créativité et mon sens du détail.</p>
            <div className="two-cols"><p>Mes expériences en hôtels, boulangeries et pâtisseries m’ont donné une compréhension concrète de la production : préparation, organisation, finition et présentation.</p><p>Mon parcours en commercialisation et communication complète ce savoir-faire par une attention particulière à la valorisation du produit et à la relation client.</p></div>
            <div className="about-facts"><div><strong>5</strong><span>expériences<br />professionnelles</span></div><div><strong>6</strong><span>formations<br />complémentaires</span></div><div><strong>FR</strong><span>basée<br />en France</span></div></div>
          </div>
        </section>

        <section className="skills section" id="competences">
          <SectionHeading eyebrow="03 · Savoir-faire" title="Le geste précis, l’œil créatif." intro="Une pratique construite entre fondamentaux techniques, sens esthétique et exigences du travail en laboratoire." />
          <div className="skills-grid">{skillGroups.map((group) => <article className="skill-card" key={group.number}><span className="skill-number">{group.number}</span><div className="skill-icon" aria-hidden="true">{group.number === '01' ? '✣' : group.number === '02' ? '◇' : group.number === '03' ? '○' : '⌁'}</div><h3>{group.title}</h3><p>{group.text}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>

        <section className="gallery section" id="creations">
          <div className="gallery-heading"><SectionHeading eyebrow="04 · Sélection" title="Mes créations" intro="Une sélection de réalisations de Najma : entremets, tartes, viennoiseries, macarons et petites pâtisseries travaillés avec précision." /><p className="photo-notice">Photographies originales fournies par Najma. Noms, compositions et contextes restent modifiables.</p></div>
          <div className="filters" role="group" aria-label="Filtrer les créations">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="gallery-grid">{filtered.map((creation, index) => <button className={`creation-card ${creation.tall ? 'tall' : ''}`} key={creation.id} onClick={() => setSelected(creation)} aria-label={`Voir le détail de ${creation.title}`}><img src={creation.image} alt={`${creation.title}, réalisation de Najma Farrich`} loading={index > 2 ? 'lazy' : undefined} /><span className="creation-overlay"><span className="creation-category">{creation.category}</span><strong>{creation.title}</strong><span className="creation-more">Voir la fiche <Arrow diagonal /></span></span></button>)}</div>
        </section>

        <section className="experience section" id="parcours">
          <SectionHeading eyebrow="05 · Expérience" title="Un parcours ancré dans la pratique." intro="Au fil de mes expériences en hôtellerie, boulangerie et pâtisserie, j’ai renforcé ma rigueur, mon organisation et ma capacité d’adaptation aux exigences des cuisines professionnelles." />
          <div className="timeline">{experiences.map((item, index) => <article className="timeline-row" key={item.company}><div className="timeline-index">{String(index + 1).padStart(2, '0')}</div><div className="timeline-date">{item.date}<span>{item.place}</span></div><div className="timeline-main"><h3>{item.company}</h3><p className="role">{item.role}</p>{item.future }</div><ul>{item.missions.map((mission) => <li key={mission}>{mission}</li>)}</ul></article>)}</div>
        </section>

        <section className="education section">
          <div className="education-intro"><SectionHeading eyebrow="06 · Formation" title="Apprendre, pratiquer, se perfectionner." /><p>Un parcours polyvalent qui associe pâtisserie, chocolaterie, créativité et valorisation commerciale du produit.</p></div>
          <div className="education-list">{education.map((item, index) => <article className={item.current ? 'education-item current' : 'education-item'} key={item.school}><div className="education-marker">{item.current ? 'Actuel' : String(index + 1).padStart(2, '0')}</div><div><span className="place">{item.place}</span><h3>{item.school}</h3><strong>{item.degree}</strong><p>{item.note} · Dates à compléter</p></div></article>)}</div>
        </section>

        <section className="reasons section">
          <SectionHeading eyebrow="07 · Collaboration" title="Pourquoi travailler avec moi ?" />
          <div className="reasons-grid">{[['01', 'Expérience pratique', 'Plusieurs immersions en pâtisserie, hôtellerie et boulangerie.'], ['02', 'Créativité & esthétique', 'Une attention particulière portée aux finitions, aux saveurs et aux textures.'], ['03', 'Parcours polyvalent', 'Pâtisserie, chocolaterie, macarons, commercialisation et communication.'], ['04', 'Progression continue', 'Une formation actuelle à l’ENSP et l’envie constante de perfectionner mes techniques.']].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <SectionHeading eyebrow="08 · Contact" title="Créons ensemble de belles expériences gourmandes." />
            <p className="lead">Actuellement en formation à l’École Ducasse — ENSP en France, je recherche de nouvelles opportunités de stage et d’emploi en pâtisserie.</p>
            <p>Je serais ravie de rejoindre une équipe passionnée, de contribuer à vos créations et de continuer à développer mes compétences au sein de votre établissement.</p>
            <dl><div><dt>Localisation</dt><dd>France</dd></div><div><dt>E-mail</dt><dd><a href="mailto:najmafarrich@gmail.com">najmafarrich@gmail.com</a></dd></div><div><dt>Téléphone</dt><dd><a href="tel:+33661629430">+33 6 61 62 94 30</a></dd></div><div><dt>LinkedIn</dt><dd><a href="https://ma.linkedin.com/in/najma-farrich-586a391a5" target="_blank" rel="noreferrer">Profil de Najma Farrich <Arrow diagonal /></a></dd></div></dl>
            <div className="contact-actions"><a className="button outline" href="/cv-najma-farrich.pdf" download>Télécharger mon CV <Arrow /></a><a className="button outline" href="mailto:najmafarrich@gmail.com">Écrire un e-mail <Arrow diagonal /></a><a className="button outline" href="https://ma.linkedin.com/in/najma-farrich-586a391a5" target="_blank" rel="noreferrer">Voir LinkedIn <Arrow diagonal /></a></div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row"><label>Nom complet<input name="name" required placeholder="Votre nom" /></label><label>Adresse e-mail<input name="email" type="email" required placeholder="vous@entreprise.fr" /></label></div>
            <label>Entreprise ou établissement<input name="company" placeholder="Nom de l’établissement" /></label>
            <label>Sujet<input name="subject" required placeholder="Proposition de stage, emploi..." /></label>
            <label>Message<textarea name="message" required minLength={20} rows={5} placeholder="Parlez-moi de votre opportunité..." /></label>
            <button className="button primary submit" type="submit">Envoyer le message <Arrow /></button>
            {sent && <p className="success" role="status">Votre message a été préparé dans votre application de messagerie. Il ne reste plus qu’à l’envoyer à Najma.</p>}
          </form>
        </section>
      </main>

      <footer><a className="brand footer-brand" href="#accueil"><span>NF</span><strong>Najma Farrich</strong></a><p>Pâtissière · Formation ENSP · France</p><p>Portfolio professionnel · <a href="#accueil">Retour en haut ↑</a></p></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Fermer">×</button><div className="modal-visuals"><div className="modal-image"><img src={selected.image} alt={`${selected.title}, réalisation de Najma Farrich`} /></div>{selected.detailImages && <div className="modal-detail-images">{selected.detailImages.map((image, index) => <img key={image} src={image} alt={`${selected.title}, vue complémentaire ${index + 1}`} />)}</div>}</div><div className="modal-content"><p className="eyebrow">{selected.category} · Réalisation de Najma</p><h2 id="modal-title">{selected.title}</h2><p className="lead">{selected.description}</p><p className="creation-story">Cette création met en valeur la maîtrise de Najma en matière de {selected.techniques.toLowerCase()}. Elle témoigne de sa précision, de sa régularité et de son attention portée aux textures, aux volumes et à la qualité des finitions.</p><small>Photographies originales fournies par Najma.</small></div></article></div>}
    </>
  )
}
