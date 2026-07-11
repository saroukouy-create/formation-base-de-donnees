/* ==========================================================================
   COURS "BASES DE DONNÉES — DE ZÉRO À EXPERT"
   Institut de Formation Professionnelle CJEPE-BENIN
   Contenu structuré par module : objectifs (taxonomie de Bloom), leçon, TP, quiz.
   ========================================================================== */

const INSTITUTE = {
    name: "Institut de Formation Professionnelle CJEPE-BENIN",
    program: "Formation en Base de Données",
    city: "Cotonou, Bénin",
    phones: ["+229 01 40 32 10 84", "+229 01 53 20 10 03"],
    duration: "3 mois (formule intensive) — libre-service en ligne : à votre rythme",
    price: { inscription: "15 000 F CFA", formation: "80 000 F CFA" },
    modes: "Cours en journée, en soirée ou 100% en ligne",
    banner: "assets/banniere-institut.png"
};

const COURSE = {
    title: "Bases de Données — De Zéro à Expert",
    subtitle: "Conception, SQL, Normalisation, Administration & Sécurité, Projets pratiques",
    modules: [

    // =====================================================================
    // MODULE 0 — INTRODUCTION
    // =====================================================================
    {
        id: "intro",
        number: 0,
        title: "Introduction aux bases de données",
        level: "Débutant",
        duration: "1h30",
        summary: "Comprendre ce qu'est une base de données, à quoi elle sert, et le vocabulaire indispensable (SGBD, table, enregistrement, ACID).",
        objectives: [
            "Définir ce qu'est une base de données et un SGBD (Système de Gestion de Base de Données).",
            "Distinguer une base relationnelle d'un simple fichier (Excel, CSV).",
            "Expliquer le vocabulaire de base : table, ligne, colonne, clé primaire.",
            "Citer les propriétés ACID et leur rôle dans la fiabilité des transactions."
        ],
        sections: [
            {
                h: "Qu'est-ce qu'une base de données ?",
                html: `
                <p>Une <strong>base de données</strong> est un ensemble organisé d'informations, stocké de façon à pouvoir être consulté, ajouté, modifié ou supprimé facilement et de manière fiable. Un <strong>SGBD</strong> (Système de Gestion de Base de Données — <em>DBMS</em> en anglais) est le logiciel qui gère cet ensemble : MySQL, PostgreSQL, SQLite, MariaDB, Oracle, SQL Server…</p>
                <p>Analogie simple : imaginez un classeur Excel. Chaque <strong>onglet</strong> devient une <strong>table</strong>, chaque <strong>ligne</strong> devient un <strong>enregistrement</strong> (ou <em>tuple</em>), et chaque <strong>colonne</strong> devient un <strong>attribut</strong> (nom, prix, date…). La différence : un SGBD garantit l'intégrité, la sécurité, les accès simultanés par plusieurs utilisateurs et des volumes de données bien plus grands qu'un fichier.</p>
                <div class="callout callout-info">📌 <strong>Norme internationale :</strong> le langage SQL est normalisé par l'ISO/IEC sous la référence <strong>ISO/IEC 9075</strong>. Cela garantit qu'un même socle de commandes fonctionne (avec de légères variantes) sur la plupart des SGBD du marché.</div>
                `
            },
            {
                h: "Pourquoi une base de données relationnelle ?",
                html: `
                <p>Le modèle <strong>relationnel</strong>, inventé par <strong>Edgar F. Codd</strong> (IBM, 1970), organise les données en <strong>tables reliées entre elles</strong> plutôt qu'en un seul grand tableau. Cela évite la duplication d'information et garantit la cohérence : par exemple, l'adresse d'un client n'est écrite qu'une seule fois, même s'il a passé 50 commandes.</p>
                <table>
                    <thead><tr><th>Fichier Excel / CSV</th><th>Base de données relationnelle</th></tr></thead>
                    <tbody>
                        <tr><td>Un seul utilisateur à la fois (risque d'écrasement)</td><td>Accès simultané et sécurisé par plusieurs utilisateurs</td></tr>
                        <tr><td>Aucune vérification automatique des données</td><td>Contraintes (types, unicité, clés étrangères) appliquées automatiquement</td></tr>
                        <tr><td>Duplication fréquente des informations</td><td>Données normalisées, stockées une seule fois</td></tr>
                        <tr><td>Difficile au-delà de quelques milliers de lignes</td><td>Conçu pour des millions/milliards de lignes</td></tr>
                    </tbody>
                </table>
                `
            },
            {
                h: "Le modèle ACID",
                html: `
                <p>Le modèle <strong>ACID</strong> décrit les 4 garanties qu'un SGBD relationnel offre pour chaque transaction (un ensemble d'opérations traitées comme un tout indivisible) :</p>
                <div class="card-grid-like">
                <ul>
                    <li><strong>A — Atomicité :</strong> une transaction est exécutée entièrement, ou pas du tout (pas de virement bancaire "à moitié" fait).</li>
                    <li><strong>C — Cohérence :</strong> la base passe toujours d'un état valide à un autre état valide.</li>
                    <li><strong>I — Isolation :</strong> deux transactions simultanées ne se perturbent pas l'une l'autre.</li>
                    <li><strong>D — Durabilité :</strong> une fois validée (<code class="inline-code">COMMIT</code>), une transaction est conservée même en cas de panne.</li>
                </ul>
                </div>
                <div class="callout callout-tip">✅ <strong>À retenir :</strong> ACID est ce qui distingue une base de données "sérieuse" d'un simple fichier de stockage.</div>
                `
            },
            {
                h: "Les grandes familles de SGBD",
                html: `
                <p>On distingue principalement :</p>
                <ul>
                    <li><strong>SGBD relationnels (SQL)</strong> : MySQL, PostgreSQL, MariaDB, SQLite, Oracle, SQL Server — données en tables liées par des clés.</li>
                    <li><strong>SGBD NoSQL</strong> : MongoDB (documents), Redis (clé-valeur), Neo4j (graphes) — pour des besoins spécifiques (gros volumes non structurés, cache, réseaux sociaux…).</li>
                </ul>
                <p>Ce cours se concentre sur les bases <strong>relationnelles</strong>, qui restent le standard le plus utilisé dans le monde professionnel.</p>
                `
            }
        ],
        tp: {
            title: "TP 0 — Identifier les entités d'un cas réel",
            context: "Vous travaillez pour une petite librairie en ligne. Le gérant vous donne une feuille Excel où chaque ligne mélange client, livre acheté et date d'achat.",
            instructions: [
                "Listez toutes les informations présentes dans le classeur (nom client, email, titre du livre, prix, date...).",
                "Regroupez ces informations en catégories logiques (ex : tout ce qui concerne le client ensemble).",
                "Pour chaque catégorie, proposez un nom de table (ex : clients, livres, commandes).",
                "Identifiez, pour chaque table, quelle colonne pourrait servir d'identifiant unique (clé primaire).",
                "Rédigez une phrase expliquant le lien entre la table 'clients' et la table 'commandes'."
            ],
            solution: `
            <p><strong>Proposition de correction :</strong></p>
            <table>
                <thead><tr><th>Table</th><th>Colonnes</th><th>Clé primaire</th></tr></thead>
                <tbody>
                    <tr><td>clients</td><td>id, nom, email</td><td>id</td></tr>
                    <tr><td>livres</td><td>id, titre, prix, auteur</td><td>id</td></tr>
                    <tr><td>commandes</td><td>id, id_client, id_livre, date_achat</td><td>id</td></tr>
                </tbody>
            </table>
            <p>La table <code class="inline-code">commandes</code> relie <code class="inline-code">clients</code> et <code class="inline-code">livres</code> grâce aux colonnes <code class="inline-code">id_client</code> et <code class="inline-code">id_livre</code> (clés étrangères) : un client peut passer plusieurs commandes, et une commande porte sur un livre précis.</p>
            `
        },
        quiz: [
            {
                q: "Qu'est-ce qu'un SGBD ?",
                options: ["Un langage de programmation", "Un logiciel qui gère une base de données", "Un type de fichier Excel", "Un serveur web"],
                correct: 1,
                explain: "Un SGBD (Système de Gestion de Base de Données) est le logiciel (MySQL, PostgreSQL...) qui permet de créer, interroger et sécuriser une base de données."
            },
            {
                q: "Dans le modèle relationnel, comment appelle-t-on une ligne d'une table ?",
                options: ["Un attribut", "Un enregistrement (ou tuple)", "Une clé étrangère", "Un schéma"],
                correct: 1,
                explain: "Une ligne représente un enregistrement unique (aussi appelé tuple) ; une colonne représente un attribut."
            },
            {
                q: "Que signifie le 'A' dans ACID ?",
                options: ["Authentification", "Autonomie", "Atomicité", "Analyse"],
                correct: 2,
                explain: "Atomicité : une transaction s'exécute entièrement ou pas du tout, il n'y a pas d'état intermédiaire."
            },
            {
                q: "Qui a inventé le modèle relationnel ?",
                options: ["Bill Gates", "Edgar F. Codd", "Linus Torvalds", "Ada Lovelace"],
                correct: 1,
                explain: "Edgar F. Codd a publié le modèle relationnel en 1970 chez IBM ; il est à la base de tous les SGBD relationnels modernes."
            },
            {
                q: "Quel est l'avantage principal d'une base relationnelle par rapport à un fichier Excel partagé ?",
                options: ["Elle est gratuite", "Elle gère les accès concurrents et applique des contraintes automatiquement", "Elle n'a pas besoin d'ordinateur", "Elle affiche des graphiques automatiquement"],
                correct: 1,
                explain: "Un SGBD gère nativement les accès simultanés, l'intégrité des données et les gros volumes — un fichier Excel ne le fait pas de façon fiable."
            }
        ]
    },

    // =====================================================================
    // MODULE 1 — CONCEPTION & MODÉLISATION
    // =====================================================================
    {
        id: "modelisation",
        number: 1,
        title: "Conception & Modélisation (MCD, MLD, Normalisation)",
        level: "Débutant",
        duration: "2h30",
        summary: "Apprendre à concevoir une base de données sur papier avant d'écrire la moindre ligne de SQL : entités, associations, cardinalités, clés, formes normales.",
        objectives: [
            "Construire un Modèle Conceptuel de Données (MCD) avec la méthode Merise ou un diagramme Entité-Association (UML).",
            "Transformer un MCD en Modèle Logique de Données (MLD) relationnel.",
            "Distinguer clé primaire, clé étrangère et clé candidate.",
            "Appliquer les trois premières formes normales (1NF, 2NF, 3NF) pour éliminer les redondances."
        ],
        sections: [
            {
                h: "La démarche de conception",
                html: `
                <p>Concevoir une base de données suit une démarche en 3 étapes, héritée de la méthode française <strong>Merise</strong> (équivalent international : diagramme <strong>Entité-Association</strong>, ou <em>ER diagram</em>) :</p>
                <ol>
                    <li><strong>MCD (Modèle Conceptuel de Données)</strong> : on identifie les entités du monde réel (Client, Produit, Commande…) et leurs relations, sans se soucier de la technique.</li>
                    <li><strong>MLD (Modèle Logique de Données)</strong> : on traduit le MCD en tables, colonnes, clés primaires et étrangères.</li>
                    <li><strong>MPD (Modèle Physique de Données)</strong> : on écrit le SQL réel (types de données, index) pour un SGBD précis.</li>
                </ol>
                <div class="callout callout-info">📌 Cette démarche correspond au standard international <strong>ER Modeling</strong> popularisé par Peter Chen (1976), toujours enseigné et utilisé en entreprise aujourd'hui.</div>
                `
            },
            {
                h: "Entités, associations et cardinalités",
                html: `
                <p>Une <strong>entité</strong> est un objet du monde réel qu'on veut stocker (Client, Livre, Commande). Une <strong>association</strong> relie deux entités (un Client <em>passe</em> une Commande). Chaque association porte des <strong>cardinalités</strong> qui décrivent combien d'occurrences sont liées :</p>
                <table>
                    <thead><tr><th>Cardinalité</th><th>Signification</th><th>Exemple</th></tr></thead>
                    <tbody>
                        <tr><td>1,1</td><td>Exactement un</td><td>Une commande a exactement un client</td></tr>
                        <tr><td>0,1</td><td>Zéro ou un</td><td>Un client a au plus une carte de fidélité</td></tr>
                        <tr><td>0,n</td><td>Zéro ou plusieurs</td><td>Un client peut passer 0 à N commandes</td></tr>
                        <tr><td>1,n</td><td>Un ou plusieurs</td><td>Une commande contient au moins 1 produit</td></tr>
                    </tbody>
                </table>
                <p>Une relation <strong>plusieurs-à-plusieurs (N,N)</strong> — par exemple "un Étudiant s'inscrit à plusieurs Cours, un Cours a plusieurs Étudiants" — se traduit toujours par une <strong>table d'association</strong> (dite aussi table de jonction) au niveau logique.</p>
                `
            },
            {
                h: "Du MCD au MLD : les clés",
                html: `
                <p>Lors du passage au MLD, chaque entité devient une table, et chaque relation 1,n devient une <strong>clé étrangère</strong> (foreign key) placée du côté "n".</p>
                <div class="code-block">-- MCD : Client (1,n) --- passe --- (1,1) Commande
-- MLD :
clients (<u>id</u>, nom, email)
commandes (<u>id</u>, date_commande, <i>id_client</i> REFERENCES clients(id))</div>
                <ul>
                    <li><strong>Clé primaire (PK)</strong> : identifie un enregistrement de façon unique et jamais nulle (ex : <code class="inline-code">id</code>).</li>
                    <li><strong>Clé étrangère (FK)</strong> : référence la clé primaire d'une autre table pour créer le lien.</li>
                    <li><strong>Clé candidate</strong> : toute colonne (ou groupe de colonnes) qui pourrait servir de clé primaire (ex : email, unique en soi).</li>
                </ul>
                `
            },
            {
                h: "La normalisation : 1NF, 2NF, 3NF",
                html: `
                <p>La <strong>normalisation</strong> est un ensemble de règles (formes normales) qui éliminent les redondances et évitent les anomalies de mise à jour. C'est un standard académique et industriel incontournable.</p>
                <div class="callout callout-tip">
                <strong>1NF (Première Forme Normale) :</strong> chaque colonne contient une seule valeur atomique (pas de liste dans une cellule), et chaque ligne est unique.<br><br>
                <strong>2NF :</strong> respecte la 1NF + chaque colonne non-clé dépend de <em>toute</em> la clé primaire (utile surtout avec des clés composées).<br><br>
                <strong>3NF :</strong> respecte la 2NF + aucune colonne non-clé ne dépend d'une autre colonne non-clé (élimine les dépendances transitives).
                </div>
                <p><strong>Exemple concret (table non normalisée) :</strong></p>
                <div class="code-block">commandes(id, client_nom, client_email, produit, prix_produit)
<span class="cm">-- Problème : si le client change d'email, il faut le modifier sur CHAQUE commande !</span></div>
                <p><strong>Après normalisation (3NF) :</strong></p>
                <div class="code-block">clients(id, nom, email)
produits(id, nom, prix)
commandes(id, id_client, id_produit, date_commande)</div>
                <div class="callout callout-warn">⚠️ En pratique, une <strong>dénormalisation légère</strong> est parfois volontaire pour la performance (data warehouse, reporting) — mais elle doit être un choix conscient, jamais un oubli.</div>
                `
            }
        ],
        tp: {
            title: "TP 1 — Modéliser une plateforme de blog",
            context: "Vous devez concevoir la base de données d'un blog : des auteurs écrivent des articles, les lecteurs peuvent laisser des commentaires, et chaque article peut avoir plusieurs tags (mots-clés).",
            instructions: [
                "Identifiez les entités principales (Auteur, Article, Commentaire, Tag...).",
                "Déterminez les cardinalités entre chaque paire d'entités liées.",
                "Repérez la relation many-to-many (indice : Article ↔ Tag) et prévoyez la table d'association nécessaire.",
                "Rédigez le MLD complet (tables, colonnes, clés primaires et étrangères) en pseudo-SQL.",
                "Vérifiez que votre modèle respecte au moins la 3NF."
            ],
            solution: `
            <div class="code-block">auteurs(<u>id</u>, nom, email)
articles(<u>id</u>, titre, contenu, date_publication, <i>id_auteur</i> REFERENCES auteurs(id))
commentaires(<u>id</u>, contenu, date_commentaire, <i>id_article</i> REFERENCES articles(id), <i>nom_lecteur</i>)
tags(<u>id</u>, libelle)
article_tags(<i>id_article</i> REFERENCES articles(id), <i>id_tag</i> REFERENCES tags(id), PRIMARY KEY(id_article, id_tag))</div>
            <p><strong>Explication :</strong> la relation N,N entre <code class="inline-code">articles</code> et <code class="inline-code">tags</code> est résolue par la table d'association <code class="inline-code">article_tags</code>, dont la clé primaire est composée des deux clés étrangères. Ce modèle est en 3NF : aucune redondance, chaque information n'existe qu'à un seul endroit.</p>
            `
        },
        quiz: [
            {
                q: "Que devient une relation 'plusieurs-à-plusieurs' (N,N) lors du passage au MLD ?",
                options: ["Elle est ignorée", "Une nouvelle table d'association avec deux clés étrangères", "Une simple colonne texte", "Elle devient une clé primaire unique"],
                correct: 1,
                explain: "Une relation N,N ne peut pas être représentée directement dans un modèle relationnel : elle nécessite une table intermédiaire portant les deux clés étrangères."
            },
            {
                q: "La 1ère Forme Normale (1NF) exige que :",
                options: ["Chaque table ait au moins 3 colonnes", "Chaque colonne contienne une seule valeur atomique", "Il n'y ait aucune clé étrangère", "Toutes les colonnes soient des nombres"],
                correct: 1,
                explain: "La 1NF interdit les valeurs multiples dans une même cellule (ex: 'tag1, tag2, tag3' dans une colonne) : chaque valeur doit être atomique."
            },
            {
                q: "Une clé étrangère (foreign key) sert à :",
                options: ["Chiffrer les données", "Référencer la clé primaire d'une autre table", "Accélérer les sauvegardes", "Supprimer les doublons automatiquement"],
                correct: 1,
                explain: "La clé étrangère crée le lien logique entre deux tables en pointant vers la clé primaire d'une autre table."
            },
            {
                q: "Quel problème résout la normalisation ?",
                options: ["La lenteur du réseau internet", "Les redondances et anomalies de mise à jour", "Le manque d'espace disque uniquement", "Les fautes d'orthographe"],
                correct: 1,
                explain: "Normaliser une base évite qu'une même information (ex: l'email d'un client) soit dupliquée à plusieurs endroits, ce qui provoquerait des incohérences lors des mises à jour."
            },
            {
                q: "Dans la méthode Merise, quel modèle vient EN PREMIER dans la démarche de conception ?",
                options: ["Le MPD (Modèle Physique)", "Le MCD (Modèle Conceptuel)", "Le code SQL final", "Les index de performance"],
                correct: 1,
                explain: "On commence toujours par le MCD (analyse conceptuelle, sans se soucier de la technique), puis le MLD, puis le MPD."
            }
        ]
    },

    // =====================================================================
    // MODULE 2 — INSTALLATION DES SGBD
    // =====================================================================
    {
        id: "installation",
        number: 2,
        title: "Installer les principaux SGBD (SQLite, MySQL, MariaDB, PostgreSQL)",
        level: "Débutant",
        duration: "1h30",
        summary: "Installer et comparer les 4 SGBD les plus utilisés dans l'industrie, sans prérequis technique.",
        objectives: [
            "Comparer les caractéristiques de SQLite, MySQL, MariaDB et PostgreSQL.",
            "Installer un SGBD et son outil d'administration graphique (DB Browser, MySQL Workbench, pgAdmin).",
            "Choisir le SGBD adapté à un projet donné (mobile, site web, data warehouse…)."
        ],
        sections: [
            {
                h: "Les 4 SGBD à connaître",
                html: `
                <div class="card-grid-like">
                <ul>
                    <li><strong>📦 SQLite</strong> — Ultra-léger, sans serveur, un simple fichier <code class="inline-code">.db</code>. Idéal pour apprendre, les applications mobiles et le prototypage.</li>
                    <li><strong>🐬 MySQL</strong> — Le plus utilisé au monde pour les sites web (WordPress, e-commerce). Fonctionne en mode client/serveur.</li>
                    <li><strong>🦭 MariaDB</strong> — Fork open-source de MySQL, compatible avec les mêmes commandes, plus de moteurs de stockage.</li>
                    <li><strong>🐘 PostgreSQL</strong> — Le plus complet et le plus conforme au standard SQL/ISO, avec l'outil <strong>pgAdmin</strong>.</li>
                </ul>
                </div>
                <table>
                    <thead><tr><th>Critère</th><th>SQLite</th><th>MySQL</th><th>MariaDB</th><th>PostgreSQL</th></tr></thead>
                    <tbody>
                        <tr><td>Architecture</td><td>Fichier (embarqué)</td><td>Client/Serveur</td><td>Client/Serveur</td><td>Client/Serveur</td></tr>
                        <tr><td>Transactions ACID</td><td>Oui</td><td>Oui (InnoDB)</td><td>Oui</td><td>Oui (MVCC)</td></tr>
                        <tr><td>JSON natif</td><td>Extension</td><td>Oui</td><td>Oui</td><td>Oui (JSONB)</td></tr>
                        <tr><td>Interface graphique</td><td>DB Browser</td><td>MySQL Workbench</td><td>HeidiSQL</td><td>pgAdmin</td></tr>
                        <tr><td>Port par défaut</td><td>—</td><td>3306</td><td>3306</td><td>5432</td></tr>
                    </tbody>
                </table>
                `
            },
            {
                h: "Installation pas à pas",
                html: `
                <p><strong>📦 SQLite :</strong> téléchargez les outils sur <code class="inline-code">sqlite.org/download.html</code>, extrayez le zip, et utilisez <code class="inline-code">sqlite3.exe</code> — ou installez <strong>DB Browser for SQLite</strong> pour une interface graphique type Excel.</p>
                <p><strong>🐬 MySQL :</strong> téléchargez <em>MySQL Community Server</em> sur <code class="inline-code">mysql.com/downloads</code>, lancez l'installateur en laissant les options par défaut, notez le mot de passe <code class="inline-code">root</code>. MySQL Workbench s'installe automatiquement.</p>
                <p><strong>🦭 MariaDB :</strong> téléchargez sur <code class="inline-code">mariadb.org/download</code>, installez comme MySQL (mêmes réflexes, mêmes outils).</p>
                <p><strong>🐘 PostgreSQL :</strong> téléchargez l'"Interactive installer" sur <code class="inline-code">postgresql.org/download</code>, cochez <strong>pgAdmin</strong> pendant l'installation, notez le mot de passe de l'utilisateur <code class="inline-code">postgres</code>, laissez le port 5432.</p>
                <div class="callout callout-tip">💡 Vous pouvez installer les 4 SGBD sur le même ordinateur sans conflit : ils utilisent des ports différents.</div>
                `
            },
            {
                h: "Quand choisir quel SGBD ?",
                html: `
                <table>
                    <thead><tr><th>SGBD</th><th>Cas d'usage typiques</th></tr></thead>
                    <tbody>
                        <tr><td>SQLite</td><td>Apps mobiles, logiciels desktop légers, prototypage, tests</td></tr>
                        <tr><td>MySQL</td><td>Sites web, CMS (WordPress), e-commerce, hébergement mutualisé</td></tr>
                        <tr><td>MariaDB</td><td>Remplacement direct de MySQL, projets open-source, clusters</td></tr>
                        <tr><td>PostgreSQL</td><td>Applications critiques, data warehouse, géospatial (PostGIS)</td></tr>
                    </tbody>
                </table>
                `
            }
        ],
        tp: {
            title: "TP 2 — Installer SQLite et créer votre première base",
            context: "Vous allez installer DB Browser for SQLite et créer une base de données locale pour vous entraîner tout au long de ce cours.",
            instructions: [
                "Téléchargez et installez DB Browser for SQLite (gratuit, disponible pour Windows/Mac/Linux).",
                "Ouvrez l'application et créez une nouvelle base nommée `formation.db`.",
                "Créez une table `etudiants` avec les colonnes : id (entier, clé primaire), nom (texte), email (texte).",
                "Ajoutez 3 lignes de données de test via l'onglet 'Parcourir les données'.",
                "Enregistrez les modifications ('Write Changes')."
            ],
            solution: `
            <p><strong>Étapes de vérification :</strong></p>
            <div class="code-block">CREATE TABLE etudiants (
    id INTEGER PRIMARY KEY,
    nom TEXT NOT NULL,
    email TEXT UNIQUE
);

INSERT INTO etudiants (nom, email) VALUES
('Awa Koffi', 'awa@mail.com'),
('Jean Dossou', 'jean@mail.com'),
('Fatou Diallo', 'fatou@mail.com');</div>
            <p>Dans DB Browser, l'onglet "Exécuter le SQL" vous permet de coller directement ce code. Vérifiez ensuite dans "Parcourir les données" que les 3 lignes apparaissent bien.</p>
            `
        },
        quiz: [
            {
                q: "Quel SGBD ne nécessite AUCUN serveur et tient dans un simple fichier ?",
                options: ["MySQL", "PostgreSQL", "SQLite", "MariaDB"],
                correct: 2,
                explain: "SQLite est une base embarquée : toute la base tient dans un fichier .db, sans processus serveur à lancer."
            },
            {
                q: "Quel est le port par défaut de PostgreSQL ?",
                options: ["3306", "5432", "8080", "1433"],
                correct: 1,
                explain: "PostgreSQL écoute par défaut sur le port 5432, tandis que MySQL/MariaDB utilisent le port 3306."
            },
            {
                q: "Quel outil graphique est fourni avec l'installateur PostgreSQL ?",
                options: ["MySQL Workbench", "HeidiSQL", "pgAdmin", "DB Browser"],
                correct: 2,
                explain: "pgAdmin est l'outil d'administration officiel de PostgreSQL, inclus dans l'installateur standard."
            },
            {
                q: "MariaDB est :",
                options: ["Un langage de programmation", "Un fork open-source de MySQL, compatible avec les mêmes commandes", "Une extension de SQLite", "Un service cloud uniquement"],
                correct: 1,
                explain: "MariaDB a été créé par les développeurs originaux de MySQL après son rachat par Oracle ; il reste largement compatible."
            },
            {
                q: "Quel SGBD est le plus adapté à une application mobile embarquée (sans connexion réseau requise) ?",
                options: ["SQLite", "PostgreSQL en cluster", "MySQL en mode replication", "Oracle"],
                correct: 0,
                explain: "SQLite ne nécessite pas de serveur réseau : c'est le choix standard pour Android/iOS et les apps embarquées."
            }
        ]
    },

    // =====================================================================
    // MODULE 3 — SQL FONDAMENTAL
    // =====================================================================
    {
        id: "sql-fondamental",
        number: 3,
        title: "SQL Fondamental (DDL, DML, SELECT, filtres, tri)",
        level: "Débutant",
        duration: "3h",
        summary: "Maîtriser les commandes SQL de base pour créer des tables et manipuler des données : CREATE, INSERT, SELECT, UPDATE, DELETE.",
        objectives: [
            "Distinguer les catégories du langage SQL : DDL, DML, DCL, TCL.",
            "Créer et modifier des tables avec CREATE TABLE / ALTER TABLE.",
            "Écrire des requêtes SELECT avec filtres (WHERE), tri (ORDER BY) et limitation (LIMIT).",
            "Insérer, mettre à jour et supprimer des données en toute sécurité."
        ],
        sections: [
            {
                h: "Les 4 familles de commandes SQL",
                html: `
                <table>
                    <thead><tr><th>Famille</th><th>Nom complet</th><th>Commandes clés</th></tr></thead>
                    <tbody>
                        <tr><td><strong>DDL</strong></td><td>Data Definition Language</td><td><code class="inline-code">CREATE</code>, <code class="inline-code">ALTER</code>, <code class="inline-code">DROP</code></td></tr>
                        <tr><td><strong>DML</strong></td><td>Data Manipulation Language</td><td><code class="inline-code">SELECT</code>, <code class="inline-code">INSERT</code>, <code class="inline-code">UPDATE</code>, <code class="inline-code">DELETE</code></td></tr>
                        <tr><td><strong>DCL</strong></td><td>Data Control Language</td><td><code class="inline-code">GRANT</code>, <code class="inline-code">REVOKE</code></td></tr>
                        <tr><td><strong>TCL</strong></td><td>Transaction Control Language</td><td><code class="inline-code">COMMIT</code>, <code class="inline-code">ROLLBACK</code>, <code class="inline-code">SAVEPOINT</code></td></tr>
                    </tbody>
                </table>
                `
            },
            {
                h: "Créer une table (DDL)",
                html: `
                <div class="code-block"><span class="cm">-- Création de table avec contraintes</span>
CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_inscription DATE DEFAULT CURRENT_DATE
);

<span class="cm">-- Modifier une table existante</span>
ALTER TABLE clients ADD COLUMN telephone VARCHAR(20);

<span class="cm">-- Supprimer une table</span>
DROP TABLE ancienne_table;</div>
                <p>Les contraintes les plus courantes : <code class="inline-code">NOT NULL</code> (obligatoire), <code class="inline-code">UNIQUE</code> (pas de doublon), <code class="inline-code">PRIMARY KEY</code> (identifiant), <code class="inline-code">DEFAULT</code> (valeur par défaut), <code class="inline-code">CHECK</code> (validation d'une condition).</p>
                `
            },
            {
                h: "Manipuler les données (DML)",
                html: `
                <div class="code-block"><span class="cm">-- Insérer des données</span>
INSERT INTO clients (nom, email) VALUES ('Dupont', 'dupont@mail.com');

<span class="cm">-- Lire des données</span>
SELECT nom, email FROM clients WHERE date_inscription > '2025-01-01';

<span class="cm">-- Modifier des données</span>
UPDATE clients SET telephone = '0102030405' WHERE id = 1;

<span class="cm">-- Supprimer des données</span>
DELETE FROM clients WHERE id = 5;</div>
                <div class="callout callout-warn">⚠️ Un <code class="inline-code">UPDATE</code> ou <code class="inline-code">DELETE</code> <strong>sans clause WHERE</strong> s'applique à TOUTES les lignes de la table. Vérifiez toujours votre clause WHERE avant d'exécuter.</div>
                `
            },
            {
                h: "SELECT avancé : filtrer et trier",
                html: `
                <div class="code-block">SELECT nom, prix FROM produits
WHERE prix BETWEEN 10 AND 50
  AND categorie = 'Livres'
ORDER BY prix DESC
LIMIT 10;

<span class="cm">-- Opérateurs utiles : =, <>, >, <, LIKE, IN, IS NULL</span>
SELECT * FROM produits WHERE nom LIKE 'A%';       <span class="cm">-- commence par A</span>
SELECT * FROM produits WHERE categorie IN ('Livres','BD');
SELECT * FROM produits WHERE description IS NULL;</div>
                <p>L'ordre logique d'exécution d'une requête SELECT est : <code class="inline-code">FROM</code> → <code class="inline-code">WHERE</code> → <code class="inline-code">GROUP BY</code> → <code class="inline-code">HAVING</code> → <code class="inline-code">SELECT</code> → <code class="inline-code">ORDER BY</code> → <code class="inline-code">LIMIT</code>. Comprendre cet ordre est essentiel pour écrire du SQL correct.</p>
                `
            }
        ],
        tp: {
            title: "TP 3 — Gérer un catalogue de produits",
            context: "Vous devez créer et interroger une table de produits pour une boutique en ligne.",
            instructions: [
                "Créez une table `produits` avec : id, nom, prix (décimal), stock (entier), categorie.",
                "Insérez 6 produits d'au moins 3 catégories différentes.",
                "Écrivez une requête qui affiche les produits dont le stock est inférieur à 5, triés par prix croissant.",
                "Mettez à jour le stock d'un produit après une vente (diminuez-le de 1).",
                "Supprimez un produit dont le stock est à 0."
            ],
            solution: `
            <div class="code-block">CREATE TABLE produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(80) NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    categorie VARCHAR(50)
);

INSERT INTO produits (nom, prix, stock, categorie) VALUES
('Roman policier', 12.50, 3, 'Livres'),
('BD Aventure', 15.00, 8, 'BD'),
('Cahier A4', 2.00, 0, 'Papeterie'),
('Stylo plume', 9.90, 4, 'Papeterie'),
('Manga Tome 1', 7.50, 2, 'BD'),
('Encyclopédie', 45.00, 1, 'Livres');

SELECT nom, prix, stock FROM produits WHERE stock < 5 ORDER BY prix ASC;

UPDATE produits SET stock = stock - 1 WHERE id = 1;

DELETE FROM produits WHERE stock = 0;</div>
            `
        },
        quiz: [
            {
                q: "Quelle commande fait partie du DDL (Data Definition Language) ?",
                options: ["SELECT", "CREATE TABLE", "INSERT", "UPDATE"],
                correct: 1,
                explain: "CREATE, ALTER et DROP définissent la structure de la base : ils appartiennent au DDL."
            },
            {
                q: "Que se passe-t-il si vous exécutez `DELETE FROM clients;` sans clause WHERE ?",
                options: ["Rien, une erreur est levée", "Seule la première ligne est supprimée", "Toutes les lignes de la table sont supprimées", "La table elle-même est supprimée"],
                correct: 2,
                explain: "Sans WHERE, DELETE s'applique à toutes les lignes (la structure de la table reste, contrairement à DROP TABLE)."
            },
            {
                q: "Quel opérateur SQL permet de rechercher un motif texte (ex: commence par 'A') ?",
                options: ["IN", "LIKE", "BETWEEN", "IS NULL"],
                correct: 1,
                explain: "LIKE combiné aux jokers % et _ permet la recherche de motifs textuels : 'A%' signifie 'commence par A'."
            },
            {
                q: "Dans quel ordre logique une requête SELECT est-elle évaluée ?",
                options: ["SELECT puis FROM puis WHERE", "FROM puis WHERE puis SELECT", "WHERE puis SELECT puis FROM", "ORDER BY puis SELECT puis FROM"],
                correct: 1,
                explain: "Le moteur SQL évalue d'abord FROM (les tables), puis WHERE (filtrage), et seulement ensuite SELECT (colonnes à afficher)."
            },
            {
                q: "Quelle contrainte garantit qu'une colonne ne contient jamais deux fois la même valeur ?",
                options: ["NOT NULL", "DEFAULT", "UNIQUE", "CHECK"],
                correct: 2,
                explain: "UNIQUE interdit les doublons dans une colonne (contrairement à NOT NULL qui interdit seulement les valeurs vides)."
            }
        ]
    },

    // =====================================================================
    // MODULE 4 — SQL INTERMÉDIAIRE : JOINTURES & AGRÉGATIONS
    // =====================================================================
    {
        id: "sql-jointures",
        number: 4,
        title: "Jointures, sous-requêtes & fonctions d'agrégation",
        level: "Intermédiaire",
        duration: "3h",
        summary: "Combiner plusieurs tables et calculer des statistiques : INNER/LEFT JOIN, GROUP BY, HAVING, sous-requêtes.",
        objectives: [
            "Écrire des jointures INNER JOIN, LEFT JOIN et comprendre leur différence.",
            "Utiliser les fonctions d'agrégation COUNT, SUM, AVG, MIN, MAX avec GROUP BY.",
            "Filtrer des groupes avec HAVING (vs WHERE).",
            "Construire des sous-requêtes (subqueries) pour des besoins avancés."
        ],
        sections: [
            {
                h: "INNER JOIN vs LEFT JOIN",
                html: `
                <p>Une <strong>jointure</strong> combine les lignes de deux tables selon une condition (généralement une clé étrangère = clé primaire).</p>
                <div class="code-block"><span class="cm">-- INNER JOIN : uniquement les lignes qui correspondent dans les deux tables</span>
SELECT c.nom, cmd.date_commande
FROM clients c
INNER JOIN commandes cmd ON cmd.id_client = c.id;

<span class="cm">-- LEFT JOIN : toutes les lignes de la table de gauche, même sans correspondance</span>
SELECT c.nom, cmd.date_commande
FROM clients c
LEFT JOIN commandes cmd ON cmd.id_client = c.id;
<span class="cm">-- Un client sans commande apparaîtra quand même, avec NULL pour cmd.date_commande</span></div>
                <table>
                    <thead><tr><th>Type de jointure</th><th>Résultat</th></tr></thead>
                    <tbody>
                        <tr><td>INNER JOIN</td><td>Seulement les correspondances communes aux deux tables</td></tr>
                        <tr><td>LEFT JOIN</td><td>Toutes les lignes de la table de gauche + correspondances (ou NULL)</td></tr>
                        <tr><td>RIGHT JOIN</td><td>Toutes les lignes de la table de droite + correspondances (ou NULL)</td></tr>
                        <tr><td>FULL OUTER JOIN</td><td>Toutes les lignes des deux tables (non supporté nativement par MySQL)</td></tr>
                    </tbody>
                </table>
                `
            },
            {
                h: "Fonctions d'agrégation et GROUP BY",
                html: `
                <div class="code-block"><span class="cm">-- Nombre de commandes par client</span>
SELECT c.nom, COUNT(cmd.id) AS nb_commandes
FROM clients c
LEFT JOIN commandes cmd ON cmd.id_client = c.id
GROUP BY c.id, c.nom;

<span class="cm">-- Chiffre d'affaires total et moyen par catégorie</span>
SELECT categorie, SUM(prix) AS total, AVG(prix) AS moyenne, COUNT(*) AS nb_produits
FROM produits
GROUP BY categorie;</div>
                <p>Les fonctions d'agrégation les plus utilisées : <code class="inline-code">COUNT()</code>, <code class="inline-code">SUM()</code>, <code class="inline-code">AVG()</code>, <code class="inline-code">MIN()</code>, <code class="inline-code">MAX()</code>. Elles s'utilisent presque toujours avec <code class="inline-code">GROUP BY</code> dès qu'on veut un résultat "par catégorie".</p>
                `
            },
            {
                h: "HAVING vs WHERE",
                html: `
                <p><code class="inline-code">WHERE</code> filtre les lignes <strong>avant</strong> le regroupement ; <code class="inline-code">HAVING</code> filtre les groupes <strong>après</strong> le regroupement (on ne peut pas utiliser une fonction d'agrégation dans un WHERE).</p>
                <div class="code-block">SELECT categorie, COUNT(*) AS nb
FROM produits
WHERE prix > 5
GROUP BY categorie
HAVING COUNT(*) > 2;
<span class="cm">-- On ne garde que les catégories ayant plus de 2 produits à plus de 5€</span></div>
                `
            },
            {
                h: "Sous-requêtes (subqueries)",
                html: `
                <div class="code-block"><span class="cm">-- Produits plus chers que la moyenne</span>
SELECT nom, prix FROM produits
WHERE prix > (SELECT AVG(prix) FROM produits);

<span class="cm">-- Clients ayant déjà passé une commande</span>
SELECT nom FROM clients
WHERE id IN (SELECT id_client FROM commandes);</div>
                <p>Une sous-requête peut apparaître dans <code class="inline-code">WHERE</code>, <code class="inline-code">FROM</code> ou <code class="inline-code">SELECT</code>. Elle est souvent remplaçable par une jointure — les deux approches ont leurs avantages selon la lisibilité et la performance recherchées.</p>
                `
            }
        ],
        tp: {
            title: "TP 4 — Rapport de ventes multi-tables",
            context: "Vous disposez de trois tables : clients, produits, commandes (id_client, id_produit, quantite, date_commande). Le gérant veut un rapport de ventes.",
            instructions: [
                "Écrivez une requête listant chaque commande avec le nom du client et le nom du produit (jointures).",
                "Calculez le chiffre d'affaires total par client (prix × quantité), trié du plus gros acheteur au plus petit.",
                "Trouvez les clients qui n'ont JAMAIS passé de commande (LEFT JOIN + IS NULL).",
                "Affichez uniquement les produits ayant généré plus de 100 € de ventes cumulées (HAVING).",
                "Trouvez le produit le plus vendu en quantité totale."
            ],
            solution: `
            <div class="code-block"><span class="cm">-- 1. Détail des commandes</span>
SELECT c.nom AS client, p.nom AS produit, cmd.quantite, cmd.date_commande
FROM commandes cmd
JOIN clients c ON c.id = cmd.id_client
JOIN produits p ON p.id = cmd.id_produit;

<span class="cm">-- 2. CA total par client</span>
SELECT c.nom, SUM(p.prix * cmd.quantite) AS total_achats
FROM commandes cmd
JOIN clients c ON c.id = cmd.id_client
JOIN produits p ON p.id = cmd.id_produit
GROUP BY c.id, c.nom
ORDER BY total_achats DESC;

<span class="cm">-- 3. Clients sans commande</span>
SELECT c.nom FROM clients c
LEFT JOIN commandes cmd ON cmd.id_client = c.id
WHERE cmd.id IS NULL;

<span class="cm">-- 4. Produits générant plus de 100€</span>
SELECT p.nom, SUM(p.prix * cmd.quantite) AS ventes
FROM commandes cmd JOIN produits p ON p.id = cmd.id_produit
GROUP BY p.id, p.nom
HAVING SUM(p.prix * cmd.quantite) > 100;

<span class="cm">-- 5. Produit le plus vendu</span>
SELECT p.nom, SUM(cmd.quantite) AS qte_totale
FROM commandes cmd JOIN produits p ON p.id = cmd.id_produit
GROUP BY p.id, p.nom
ORDER BY qte_totale DESC
LIMIT 1;</div>
            `
        },
        quiz: [
            {
                q: "Quelle jointure retourne TOUS les clients, même ceux sans commande ?",
                options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN sans condition", "Aucune, c'est impossible"],
                correct: 1,
                explain: "LEFT JOIN conserve toutes les lignes de la table de gauche (clients), avec NULL pour les colonnes de la table de droite quand il n'y a pas de correspondance."
            },
            {
                q: "Peut-on écrire `WHERE COUNT(*) > 5` dans une requête SQL ?",
                options: ["Oui, toujours", "Non, il faut utiliser HAVING pour filtrer sur une fonction d'agrégation", "Oui, mais seulement avec MySQL", "Non, il faut utiliser ORDER BY"],
                correct: 1,
                explain: "WHERE s'exécute avant le regroupement (GROUP BY) donc ne peut pas utiliser le résultat d'une agrégation : c'est le rôle de HAVING."
            },
            {
                q: "Quelle fonction d'agrégation retourne le nombre de lignes ?",
                options: ["SUM()", "AVG()", "COUNT()", "MAX()"],
                correct: 2,
                explain: "COUNT() compte le nombre de lignes (ou de valeurs non nulles d'une colonne)."
            },
            {
                q: "Comment trouver les clients n'ayant jamais commandé, avec un LEFT JOIN ?",
                options: ["WHERE commandes.id IS NULL après le LEFT JOIN", "WHERE commandes.id IS NOT NULL", "GROUP BY commandes.id", "ORDER BY commandes.id DESC"],
                correct: 0,
                explain: "Après un LEFT JOIN, les clients sans commande ont des colonnes de la table 'commandes' à NULL : on les isole avec IS NULL."
            },
            {
                q: "Une sous-requête (subquery) peut être placée :",
                options: ["Uniquement dans WHERE", "Uniquement dans SELECT", "Dans WHERE, FROM ou SELECT selon le besoin", "Jamais dans une requête SELECT"],
                correct: 2,
                explain: "Une sous-requête est flexible : elle peut filtrer (WHERE), servir de table temporaire (FROM) ou calculer une colonne (SELECT)."
            }
        ]
    },

    // =====================================================================
    // MODULE 5 — SQL AVANCÉ
    // =====================================================================
    {
        id: "sql-avance",
        number: 5,
        title: "SQL Avancé : vues, index, transactions, procédures stockées",
        level: "Avancé",
        duration: "3h30",
        summary: "Passer au niveau professionnel : optimiser les performances, garantir la cohérence des transactions et automatiser la logique métier.",
        objectives: [
            "Créer et utiliser des vues (VIEW) pour simplifier des requêtes complexes.",
            "Comprendre le rôle des index et leur impact sur les performances.",
            "Maîtriser les transactions (BEGIN, COMMIT, ROLLBACK) pour garantir la cohérence.",
            "Rédiger des procédures stockées et des triggers de base."
        ],
        sections: [
            {
                h: "Les vues (VIEW)",
                html: `
                <p>Une <strong>vue</strong> est une requête SQL enregistrée, que l'on peut interroger comme une table virtuelle. Elle simplifie les requêtes complexes réutilisées souvent, et peut restreindre l'accès à certaines colonnes.</p>
                <div class="code-block">CREATE VIEW rapport_clients AS
SELECT c.nom, COUNT(cmd.id) AS nb_commandes, SUM(p.prix * cmd.quantite) AS total
FROM clients c
LEFT JOIN commandes cmd ON cmd.id_client = c.id
LEFT JOIN produits p ON p.id = cmd.id_produit
GROUP BY c.id, c.nom;

<span class="cm">-- Utilisation simple ensuite :</span>
SELECT * FROM rapport_clients WHERE total > 500;</div>
                `
            },
            {
                h: "Les index : accélérer les requêtes",
                html: `
                <p>Un <strong>index</strong> est une structure de données (souvent un arbre B-Tree) qui accélère considérablement la recherche sur une colonne, au prix d'un espace disque supplémentaire et d'un léger coût sur les écritures (INSERT/UPDATE).</p>
                <div class="code-block">CREATE INDEX idx_clients_email ON clients(email);

<span class="cm">-- Analyser le plan d'exécution pour vérifier l'utilisation de l'index</span>
EXPLAIN SELECT * FROM clients WHERE email = 'dupont@mail.com';</div>
                <div class="callout callout-warn">⚠️ Un index n'est utile que sur les colonnes fréquemment filtrées (WHERE) ou jointes (JOIN). Trop d'index ralentissent les écritures : il faut trouver le bon équilibre.</div>
                <div class="callout callout-tip">✅ La clé primaire est indexée automatiquement par le SGBD ; ce n'est pas la peine de la réindexer manuellement.</div>
                `
            },
            {
                h: "Transactions : BEGIN, COMMIT, ROLLBACK",
                html: `
                <p>Une <strong>transaction</strong> regroupe plusieurs opérations en un bloc indivisible (rappel du "A" d'ACID). Indispensable dès que plusieurs écritures doivent réussir ou échouer ensemble (ex : un virement bancaire).</p>
                <div class="code-block">BEGIN TRANSACTION;

UPDATE comptes SET solde = solde - 100 WHERE id = 1; <span class="cm">-- débit</span>
UPDATE comptes SET solde = solde + 100 WHERE id = 2; <span class="cm">-- crédit</span>

<span class="cm">-- Si tout s'est bien passé :</span>
COMMIT;

<span class="cm">-- En cas d'erreur détectée :</span>
ROLLBACK;</div>
                <p>Sans transaction, une panne entre les deux <code class="inline-code">UPDATE</code> ferait "disparaître" 100 € du système. Avec une transaction, soit les deux lignes s'appliquent, soit aucune (ROLLBACK).</p>
                `
            },
            {
                h: "Procédures stockées et triggers",
                html: `
                <p>Une <strong>procédure stockée</strong> encapsule de la logique métier directement dans la base de données, réutilisable depuis n'importe quelle application.</p>
                <div class="code-block"><span class="cm">-- Exemple MySQL/MariaDB</span>
DELIMITER //
CREATE PROCEDURE ajouter_client(IN p_nom VARCHAR(50), IN p_email VARCHAR(100))
BEGIN
    INSERT INTO clients (nom, email) VALUES (p_nom, p_email);
END //
DELIMITER ;

CALL ajouter_client('Awa Koffi', 'awa@mail.com');</div>
                <p>Un <strong>trigger</strong> (déclencheur) s'exécute automatiquement avant/après un INSERT, UPDATE ou DELETE :</p>
                <div class="code-block">CREATE TRIGGER maj_stock AFTER INSERT ON commandes
FOR EACH ROW
BEGIN
    UPDATE produits SET stock = stock - NEW.quantite WHERE id = NEW.id_produit;
END;</div>
                `
            }
        ],
        tp: {
            title: "TP 5 — Sécuriser un virement bancaire simplifié",
            context: "Une mini application bancaire gère une table `comptes(id, titulaire, solde)`. Vous devez garantir qu'un virement ne peut jamais faire disparaître ou apparaître de l'argent.",
            instructions: [
                "Créez la table `comptes` et insérez 2 comptes avec un solde initial de 500 chacun.",
                "Écrivez une transaction qui transfère 150 de compte 1 vers compte 2.",
                "Ajoutez une vérification : si le solde du compte 1 devient négatif, faites un ROLLBACK au lieu d'un COMMIT.",
                "Créez un index sur la colonne `titulaire` pour accélérer les recherches par nom.",
                "Créez une vue `soldes_positifs` qui liste uniquement les comptes avec un solde > 0."
            ],
            solution: `
            <div class="code-block">CREATE TABLE comptes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulaire VARCHAR(80),
    solde DECIMAL(10,2) DEFAULT 0
);
INSERT INTO comptes (titulaire, solde) VALUES ('Compte A', 500), ('Compte B', 500);

BEGIN TRANSACTION;
UPDATE comptes SET solde = solde - 150 WHERE id = 1;
UPDATE comptes SET solde = solde + 150 WHERE id = 2;
<span class="cm">-- Vérification applicative : SELECT solde FROM comptes WHERE id = 1;
-- Si solde < 0 alors ROLLBACK; sinon COMMIT;</span>
COMMIT;

CREATE INDEX idx_comptes_titulaire ON comptes(titulaire);

CREATE VIEW soldes_positifs AS
SELECT * FROM comptes WHERE solde > 0;</div>
            `
        },
        quiz: [
            {
                q: "Quel est le rôle principal d'un index ?",
                options: ["Chiffrer les données sensibles", "Accélérer la recherche sur une colonne", "Sauvegarder automatiquement la base", "Empêcher les injections SQL"],
                correct: 1,
                explain: "Un index est une structure qui accélère les recherches (WHERE, JOIN) sur la ou les colonnes indexées."
            },
            {
                q: "Que fait ROLLBACK dans une transaction ?",
                options: ["Il valide définitivement les changements", "Il annule toutes les opérations depuis le dernier BEGIN", "Il supprime la table concernée", "Il crée un nouvel index"],
                correct: 1,
                explain: "ROLLBACK annule toutes les modifications effectuées depuis le début de la transaction, comme si elles n'avaient jamais eu lieu."
            },
            {
                q: "Qu'est-ce qu'une VIEW (vue) en SQL ?",
                options: ["Une copie physique des données", "Une requête SQL enregistrée, interrogeable comme une table virtuelle", "Un type d'index spécial", "Un outil graphique d'administration"],
                correct: 1,
                explain: "Une vue ne stocke pas physiquement les données (sauf vue matérialisée) : elle exécute sa requête sous-jacente à chaque interrogation."
            },
            {
                q: "Quand un TRIGGER s'exécute-t-il ?",
                options: ["Seulement quand l'administrateur le lance manuellement", "Automatiquement avant/après un INSERT, UPDATE ou DELETE", "Une fois par jour à heure fixe", "Uniquement au démarrage du serveur"],
                correct: 1,
                explain: "Un trigger est un déclencheur automatique lié à un événement d'écriture sur une table (INSERT/UPDATE/DELETE)."
            },
            {
                q: "Pourquoi ne faut-il pas indexer TOUTES les colonnes d'une table ?",
                options: ["C'est interdit par le SQL standard", "Chaque index ralentit les écritures (INSERT/UPDATE/DELETE) et consomme de l'espace disque", "Les index ne fonctionnent que sur les clés primaires", "Cela empêche les jointures"],
                correct: 1,
                explain: "Chaque index doit être mis à jour à chaque écriture : trop d'index dégrade les performances d'écriture pour un gain de lecture marginal."
            }
        ]
    },

    // =====================================================================
    // MODULE 6 — CONNEXION BASE DE DONNÉES ↔ APPLICATION
    // =====================================================================
    {
        id: "connexion-app",
        number: 6,
        title: "Connecter une base de données à une application",
        level: "Intermédiaire",
        duration: "2h",
        summary: "Relier une base de données locale ou hébergée à un site web ou logiciel : drivers, paramètres de connexion, bonnes pratiques.",
        objectives: [
            "Expliquer le principe requête/réponse entre une application et un SGBD.",
            "Configurer une connexion locale et une connexion vers un hébergeur distant.",
            "Utiliser des requêtes préparées pour se protéger des injections SQL.",
            "Appliquer les bonnes pratiques de gestion des secrets (.env, .gitignore)."
        ],
        sections: [
            {
                h: "Le principe de connexion",
                html: `
                <p>Une application (site web, logiciel, app mobile) communique avec une base de données selon un principe simple en 3 étapes :</p>
                <ol>
                    <li>L'application <strong>se connecte</strong> au SGBD en indiquant hôte, port, base, utilisateur, mot de passe.</li>
                    <li>Elle <strong>envoie une requête SQL</strong> (ex : "donne-moi la liste des clients").</li>
                    <li>Le SGBD <strong>répond</strong> avec les données demandées.</li>
                </ol>
                <table>
                    <thead><tr><th>SGBD</th><th>Hôte local</th><th>Port</th><th>Driver (exemples)</th></tr></thead>
                    <tbody>
                        <tr><td>SQLite</td><td>— (fichier)</td><td>—</td><td><code class="inline-code">sqlite3</code> (Python), <code class="inline-code">PDO_SQLITE</code> (PHP)</td></tr>
                        <tr><td>MySQL / MariaDB</td><td>localhost</td><td>3306</td><td><code class="inline-code">mysql.connector</code>, <code class="inline-code">mysqli</code>, <code class="inline-code">mysql2</code> (Node)</td></tr>
                        <tr><td>PostgreSQL</td><td>localhost</td><td>5432</td><td><code class="inline-code">psycopg2</code>, <code class="inline-code">pg</code> (Node), <code class="inline-code">PDO_PGSQL</code></td></tr>
                    </tbody>
                </table>
                `
            },
            {
                h: "Connexion locale (exemple Python)",
                html: `
                <div class="code-block">import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="votre_mot_de_passe",
    database="ma_base"
)
cursor = conn.cursor()
cursor.execute("SELECT * FROM clients")
resultats = cursor.fetchall()</div>
                `
            },
            {
                h: "Connexion à une base hébergée",
                html: `
                <p>Lorsque votre site est hébergé (OVH, Hostinger, AlwaysData…), l'hébergeur vous fournit un hôte distant, un nom de base et des identifiants dans votre espace client.</p>
                <div class="code-block"><span class="cm">// Exemple PHP pour un site hébergé</span>
$host = 'mysql-votre-site.alwaysdata.net';
$dbname = 'votre_base_123';
$user = 'votre_utilisateur';
$pass = 'votre_mot_de_passe';
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);</div>
                <div class="callout callout-warn">⚠️ Ne mettez jamais vos identifiants en clair dans le code publié. Utilisez un fichier <code class="inline-code">.env</code>, exclu de Git via <code class="inline-code">.gitignore</code>.</div>
                `
            },
            {
                h: "Requêtes préparées : se protéger des injections SQL",
                html: `
                <p>Une <strong>injection SQL</strong> est une faille de sécurité (référencée <strong>OWASP Top 10 — A03:2021 Injection</strong>) qui permet à un attaquant d'insérer du code SQL malveillant via un formulaire mal sécurisé.</p>
                <div class="code-block"><span class="cm">-- ❌ DANGEREUX : concaténation directe</span>
"SELECT * FROM users WHERE email = '" + email_saisi + "'"
<span class="cm">-- Un attaquant peut saisir : ' OR '1'='1  pour contourner l'authentification</span>

<span class="cm">-- ✅ SÉCURISÉ : requête préparée avec paramètres</span>
cursor.execute("SELECT * FROM users WHERE email = %s", (email_saisi,))</div>
                <div class="callout callout-tip">✅ Règle d'or : ne JAMAIS construire une requête SQL par concaténation de chaînes avec une entrée utilisateur. Toujours utiliser des requêtes paramétrées / préparées.</div>
                `
            }
        ],
        tp: {
            title: "TP 6 — Sécuriser un formulaire de connexion",
            context: "Un formulaire web permet à un utilisateur de se connecter avec un email et un mot de passe. Le code actuel construit la requête par concaténation de chaînes.",
            instructions: [
                "Identifiez pourquoi le code fourni est vulnérable à une injection SQL.",
                "Réécrivez la requête en utilisant une requête préparée (paramétrée).",
                "Ajoutez la gestion d'erreur (try/except ou try/catch) autour de la connexion à la base.",
                "Créez un fichier `.env` contenant les identifiants de connexion.",
                "Ajoutez `.env` à un fichier `.gitignore` pour ne jamais le publier sur GitHub."
            ],
            solution: `
            <p><strong>Code vulnérable (à éviter) :</strong></p>
            <div class="code-block">query = "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'"</div>
            <p><strong>Code sécurisé :</strong></p>
            <div class="code-block">try:
    cursor.execute(
        "SELECT * FROM users WHERE email = %s AND password = %s",
        (email, password)
    )
    user = cursor.fetchone()
except mysql.connector.Error as err:
    print(f"Erreur de connexion à la base : {err}")</div>
            <p><strong>.env :</strong></p>
            <div class="code-block">DB_HOST=localhost
DB_USER=root
DB_PASSWORD=motdepasse_secret
DB_NAME=ma_base</div>
            <p><strong>.gitignore :</strong></p>
            <div class="code-block">.env
*.db
*.sqlite</div>
            `
        },
        quiz: [
            {
                q: "Que doit connaître une application pour se connecter à une base distante ?",
                options: ["Uniquement le nom de la base", "Hôte, port, nom de la base, utilisateur et mot de passe", "Seulement l'adresse IP du développeur", "Le numéro de version du SGBD"],
                correct: 1,
                explain: "Les 5 paramètres essentiels de connexion sont : hôte, port, base, utilisateur, mot de passe."
            },
            {
                q: "Pourquoi ne jamais concaténer directement une entrée utilisateur dans une requête SQL ?",
                options: ["Cela ralentit la requête", "Cela expose à une injection SQL (OWASP A03)", "Ce n'est pas supporté par MySQL", "Cela change le type de la colonne"],
                correct: 1,
                explain: "La concaténation permet à un attaquant d'injecter du code SQL arbitraire via le champ de saisie : c'est l'injection SQL, l'une des failles les plus critiques (OWASP Top 10)."
            },
            {
                q: "À quoi sert un fichier `.env` ?",
                options: ["À stocker le code source de l'application", "À stocker les identifiants sensibles hors du code versionné", "À remplacer la base de données", "À accélérer les requêtes SQL"],
                correct: 1,
                explain: "Le fichier .env stocke les secrets (mots de passe, clés API) séparément du code, et n'est jamais commité sur Git grâce à .gitignore."
            },
            {
                q: "GitHub peut-il héberger directement une base de données MySQL en fonctionnement ?",
                options: ["Oui, nativement", "Non, GitHub héberge du code, pas des bases de données actives", "Oui, mais uniquement pour PostgreSQL", "Oui, avec un abonnement payant"],
                correct: 1,
                explain: "GitHub stocke du code (dont des scripts SQL de structure), pas une base de données en fonctionnement — il faut un hébergeur (OVH, AlwaysData, etc.) pour cela."
            },
            {
                q: "Qu'est-ce qu'une requête préparée (prepared statement) ?",
                options: ["Une requête déjà exécutée et mise en cache", "Une requête où les valeurs sont passées séparément du texte SQL, empêchant l'injection", "Une requête écrite à l'avance dans un fichier texte", "Une sauvegarde automatique de la base"],
                correct: 1,
                explain: "Dans une requête préparée, le SGBD traite les paramètres comme des données pures, jamais comme du code SQL exécutable — ce qui neutralise les tentatives d'injection."
            }
        ]
    },

    // =====================================================================
    // MODULE 7 — ADMINISTRATION & SÉCURITÉ
    // =====================================================================
    {
        id: "administration-securite",
        number: 7,
        title: "Administration & Sécurité des bases de données",
        level: "Avancé",
        duration: "2h30",
        summary: "Gérer les utilisateurs, les droits d'accès, les sauvegardes et appliquer les bonnes pratiques de sécurité reconnues internationalement.",
        objectives: [
            "Créer des utilisateurs et gérer leurs privilèges avec GRANT/REVOKE.",
            "Appliquer le principe du moindre privilège (least privilege).",
            "Planifier des sauvegardes (backup) et restaurations.",
            "Identifier les principales menaces de sécurité (OWASP Top 10) liées aux bases de données."
        ],
        sections: [
            {
                h: "Gestion des utilisateurs et des droits (DCL)",
                html: `
                <div class="code-block"><span class="cm">-- Créer un utilisateur dédié à une application (jamais 'root' !)</span>
CREATE USER 'app_web'@'localhost' IDENTIFIED BY 'mot_de_passe_fort';

<span class="cm">-- Donner uniquement les droits nécessaires</span>
GRANT SELECT, INSERT, UPDATE ON ma_base.* TO 'app_web'@'localhost';

<span class="cm">-- Retirer un droit</span>
REVOKE DELETE ON ma_base.* FROM 'app_web'@'localhost';

FLUSH PRIVILEGES;</div>
                <div class="callout callout-info">📌 <strong>Principe du moindre privilège</strong> (standard de sécurité international, recommandé par le NIST et l'OWASP) : chaque utilisateur ou application ne doit disposer que des droits strictement nécessaires à sa fonction — jamais d'accès administrateur pour un simple site web.</div>
                `
            },
            {
                h: "Rôles et séparation des responsabilités",
                html: `
                <p>Dans un contexte professionnel, on définit généralement plusieurs rôles :</p>
                <table>
                    <thead><tr><th>Rôle</th><th>Droits typiques</th></tr></thead>
                    <tbody>
                        <tr><td>Administrateur (DBA)</td><td>Tous droits : création, sauvegarde, gestion des utilisateurs</td></tr>
                        <tr><td>Application (backend)</td><td>SELECT, INSERT, UPDATE, DELETE sur les tables métier uniquement</td></tr>
                        <tr><td>Lecture seule (reporting)</td><td>SELECT uniquement, souvent sur des vues</td></tr>
                        <tr><td>Invité / stagiaire</td><td>Accès restreint à un environnement de test</td></tr>
                    </tbody>
                </table>
                `
            },
            {
                h: "Sauvegardes et restauration",
                html: `
                <p>Une stratégie de sauvegarde fiable suit la règle internationale <strong>3-2-1</strong> : 3 copies des données, sur 2 supports différents, dont 1 hors site.</p>
                <div class="code-block"><span class="cm">-- MySQL / MariaDB : export complet</span>
mysqldump -u root -p ma_base > sauvegarde_2026-07-11.sql

<span class="cm">-- Restauration</span>
mysql -u root -p ma_base < sauvegarde_2026-07-11.sql

<span class="cm">-- PostgreSQL</span>
pg_dump ma_base > sauvegarde.sql
psql ma_base < sauvegarde.sql

<span class="cm">-- SQLite : simple copie du fichier</span>
cp ma_base.db ma_base_sauvegarde.db</div>
                <div class="callout callout-tip">✅ Automatisez les sauvegardes (tâche planifiée / cron) et testez régulièrement la restauration : une sauvegarde jamais testée n'est pas fiable.</div>
                `
            },
            {
                h: "Sécurité : menaces et bonnes pratiques",
                html: `
                <p>Les principales menaces reconnues par l'<strong>OWASP</strong> (Open Worldwide Application Security Project, référence internationale en sécurité applicative) touchant les bases de données :</p>
                <ul>
                    <li><strong>Injection SQL</strong> — se protéger avec des requêtes préparées (voir module 6).</li>
                    <li><strong>Mots de passe faibles ou par défaut</strong> — imposer des mots de passe forts, changer les identifiants par défaut (root sans mot de passe = danger).</li>
                    <li><strong>Excès de privilèges</strong> — appliquer le principe du moindre privilège.</li>
                    <li><strong>Données sensibles non chiffrées</strong> — chiffrer les mots de passe (bcrypt, argon2) et les données confidentielles.</li>
                    <li><strong>Absence de sauvegarde</strong> — mettre en place une politique de backup régulière et testée.</li>
                    <li><strong>Journalisation absente</strong> — activer les logs d'accès pour détecter les comportements anormaux.</li>
                </ul>
                `
            }
        ],
        tp: {
            title: "TP 7 — Sécuriser l'accès à une base de production",
            context: "Une application web utilise actuellement le compte 'root' pour se connecter à la base, ce qui est une faille de sécurité critique.",
            instructions: [
                "Créez un nouvel utilisateur `app_boutique` avec un mot de passe fort.",
                "Accordez-lui uniquement les droits SELECT, INSERT, UPDATE sur la base `boutique` (pas DELETE, ni DROP).",
                "Rédigez la commande pour créer une sauvegarde complète de la base `boutique`.",
                "Expliquez en 2-3 phrases pourquoi utiliser 'root' dans une application web est dangereux.",
                "Proposez 3 bonnes pratiques supplémentaires pour sécuriser cette base."
            ],
            solution: `
            <div class="code-block">CREATE USER 'app_boutique'@'localhost' IDENTIFIED BY 'X9!kLp2024#zR';
GRANT SELECT, INSERT, UPDATE ON boutique.* TO 'app_boutique'@'localhost';
FLUSH PRIVILEGES;

<span class="cm">-- Sauvegarde</span>
mysqldump -u root -p boutique > boutique_backup_2026-07-11.sql</div>
            <p><strong>Pourquoi 'root' est dangereux :</strong> le compte root a tous les droits, y compris DROP DATABASE et la gestion des autres utilisateurs. Si l'application est compromise (ex: injection SQL), l'attaquant hérite de TOUS les privilèges root, pouvant détruire ou voler l'intégralité de la base.</p>
            <p><strong>Bonnes pratiques supplémentaires :</strong> (1) chiffrer les mots de passe utilisateurs avec bcrypt, (2) activer les logs de connexion, (3) restreindre l'accès réseau à la base (firewall, IP autorisées uniquement).</p>
            `
        },
        quiz: [
            {
                q: "Que signifie le 'principe du moindre privilège' ?",
                options: ["Donner tous les droits à tous les utilisateurs pour simplifier", "N'accorder que les droits strictement nécessaires à chaque utilisateur/application", "Utiliser le compte root partout", "Ne jamais créer de nouveaux utilisateurs"],
                correct: 1,
                explain: "C'est un standard de sécurité reconnu (NIST, OWASP) : chaque compte ne doit avoir accès qu'à ce dont il a réellement besoin."
            },
            {
                q: "Quelle commande retire un droit précédemment accordé à un utilisateur ?",
                options: ["DROP", "REVOKE", "DELETE", "ALTER"],
                correct: 1,
                explain: "REVOKE annule un privilège accordé par GRANT."
            },
            {
                q: "Que recommande la règle de sauvegarde '3-2-1' ?",
                options: ["3 mots de passe, 2 utilisateurs, 1 base", "3 copies des données, sur 2 supports différents, dont 1 hors site", "3 sauvegardes par jour uniquement", "2 bases avec 1 sauvegarde partagée"],
                correct: 1,
                explain: "La règle 3-2-1 est un standard de résilience des données : 3 copies, 2 supports différents, 1 copie hors site (cloud ou site distant)."
            },
            {
                q: "Pourquoi est-il dangereux d'utiliser le compte 'root' dans le code d'une application web ?",
                options: ["Ce n'est pas dangereux si le mot de passe est long", "Root a tous les droits : une faille dans l'app compromettrait toute la base", "Root est plus lent que les autres comptes", "Root ne peut pas faire de SELECT"],
                correct: 1,
                explain: "Si l'application (avec un accès root) est compromise, l'attaquant obtient un contrôle total sur la base — d'où l'importance d'un compte applicatif aux droits limités."
            },
            {
                q: "Quel organisme international référence les principales menaces de sécurité applicative (dont l'injection SQL) ?",
                options: ["ISO uniquement", "OWASP", "W3C", "IEEE"],
                correct: 1,
                explain: "L'OWASP (Open Worldwide Application Security Project) publie le célèbre 'OWASP Top 10', référence mondiale des risques de sécurité applicative, incluant l'injection SQL."
            }
        ]
    },

    // =====================================================================
    // MODULE 8 — PROJET PRATIQUE FINAL
    // =====================================================================
    {
        id: "projet-final",
        number: 8,
        title: "Projet pratique final : de la conception à la mise en production",
        level: "Expert",
        duration: "4h",
        summary: "Mettre en pratique l'ensemble des compétences acquises sur un projet complet : conception, création, sécurisation et connexion applicative.",
        objectives: [
            "Mener une conception complète (MCD → MLD → SQL) sur un cas réel.",
            "Implémenter une base de données normalisée, indexée et sécurisée.",
            "Documenter un schéma de base de données pour une équipe (schema.sql).",
            "Valider ses compétences par un projet de bout en bout, comme en entreprise."
        ],
        sections: [
            {
                h: "Cahier des charges du projet",
                html: `
                <p>Vous êtes mandaté pour concevoir la base de données d'une <strong>plateforme de formation en ligne</strong> (proche de ce site !) répondant aux besoins suivants :</p>
                <ul>
                    <li>Des <strong>étudiants</strong> s'inscrivent avec un nom, un email et un mot de passe (haché).</li>
                    <li>Des <strong>formateurs</strong> créent des <strong>cours</strong>, eux-mêmes composés de plusieurs <strong>modules</strong>.</li>
                    <li>Un étudiant peut s'<strong>inscrire</strong> à plusieurs cours (relation N,N).</li>
                    <li>Chaque module se termine par un <strong>quiz</strong> ; on enregistre le <strong>score</strong> obtenu par chaque étudiant à chaque quiz.</li>
                    <li>Un étudiant reçoit une <strong>attestation</strong> quand il a terminé tous les modules d'un cours avec une moyenne suffisante.</li>
                </ul>
                `
            },
            {
                h: "Méthodologie attendue (standard de gestion de projet)",
                html: `
                <ol>
                    <li><strong>Analyse</strong> : lister toutes les entités et leurs attributs à partir du cahier des charges.</li>
                    <li><strong>MCD</strong> : dessiner les entités, associations et cardinalités.</li>
                    <li><strong>MLD</strong> : transformer en tables, clés primaires/étrangères, résoudre les relations N,N.</li>
                    <li><strong>Vérification de la normalisation</strong> : s'assurer d'être au moins en 3NF.</li>
                    <li><strong>Implémentation SQL</strong> : écrire le <code class="inline-code">schema.sql</code> complet avec contraintes et index.</li>
                    <li><strong>Sécurisation</strong> : créer un utilisateur applicatif à privilèges limités.</li>
                    <li><strong>Documentation</strong> : commenter le schéma pour qu'une autre équipe puisse le reprendre.</li>
                </ol>
                <div class="callout callout-info">📌 Cette méthodologie correspond au cycle de conception utilisé en entreprise (souvent formalisé en <strong>UML</strong> pour la documentation officielle d'un projet).</div>
                `
            },
            {
                h: "Squelette de correction (à compléter vous-même avant de consulter)",
                html: `
                <div class="code-block">CREATE TABLE etudiants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(80) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    mot_de_passe_hash VARCHAR(255) NOT NULL,
    date_inscription DATE DEFAULT CURRENT_DATE
);

CREATE TABLE formateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(80) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE cours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre VARCHAR(150) NOT NULL,
    id_formateur INTEGER REFERENCES formateurs(id)
);

CREATE TABLE modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre VARCHAR(150) NOT NULL,
    ordre INTEGER,
    id_cours INTEGER REFERENCES cours(id)
);

<span class="cm">-- Relation N,N : inscriptions</span>
CREATE TABLE inscriptions (
    id_etudiant INTEGER REFERENCES etudiants(id),
    id_cours INTEGER REFERENCES cours(id),
    date_inscription DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (id_etudiant, id_cours)
);

CREATE TABLE resultats_quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_etudiant INTEGER REFERENCES etudiants(id),
    id_module INTEGER REFERENCES modules(id),
    score DECIMAL(5,2),
    date_passage DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inscriptions_etudiant ON inscriptions(id_etudiant);
CREATE INDEX idx_resultats_etudiant ON resultats_quiz(id_etudiant);</div>
                `
            }
        ],
        tp: {
            title: "TP Final — Livrer le projet complet",
            context: "C'est votre mission de synthèse : produire un livrable professionnel complet, comme attendu en entreprise ou en jury de certification.",
            instructions: [
                "Dessinez (sur papier ou un outil comme draw.io) le MCD complet du cahier des charges ci-dessus.",
                "Rédigez le fichier `schema.sql` complet (tables, clés, contraintes, index) — comparez ensuite avec le squelette fourni.",
                "Écrivez une requête qui calcule, pour chaque étudiant, sa moyenne générale sur tous ses quiz passés.",
                "Écrivez une requête qui liste les étudiants ayant terminé un cours donné avec une moyenne ≥ 70% (condition d'attestation).",
                "Créez un utilisateur `app_formation` avec des droits limités (pas de DROP ni de gestion des utilisateurs).",
                "Rédigez un court `README.md` expliquant la structure de la base pour une équipe qui reprendrait le projet."
            ],
            solution: `
            <div class="code-block"><span class="cm">-- Moyenne par étudiant</span>
SELECT e.nom, AVG(r.score) AS moyenne_generale
FROM etudiants e
JOIN resultats_quiz r ON r.id_etudiant = e.id
GROUP BY e.id, e.nom;

<span class="cm">-- Étudiants ayant réussi un cours (moyenne >= 70 sur tous les modules du cours)</span>
SELECT e.nom, c.titre, AVG(r.score) AS moyenne
FROM etudiants e
JOIN resultats_quiz r ON r.id_etudiant = e.id
JOIN modules m ON m.id = r.id_module
JOIN cours c ON c.id = m.id_cours
WHERE c.id = 1
GROUP BY e.id, e.nom, c.titre
HAVING AVG(r.score) >= 70;

<span class="cm">-- Utilisateur applicatif restreint</span>
CREATE USER 'app_formation'@'localhost' IDENTIFIED BY 'MotDePasse_F0rt!';
GRANT SELECT, INSERT, UPDATE ON formation.* TO 'app_formation'@'localhost';</div>
            <p>Ce TP final combine <strong>modélisation</strong> (module 1), <strong>SQL fondamental et avancé</strong> (modules 3-5), et <strong>sécurité</strong> (module 7) : c'est exactement le type d'exercice demandé lors d'un entretien technique ou d'une certification professionnelle en base de données.</p>
            `
        },
        quiz: [
            {
                q: "Dans le cahier des charges, la relation entre 'étudiants' et 'cours' est de type :",
                options: ["1,1", "1,n uniquement", "N,N (plusieurs-à-plusieurs)", "Aucune relation directe"],
                correct: 2,
                explain: "Un étudiant peut s'inscrire à plusieurs cours, et un cours accueille plusieurs étudiants : c'est une relation N,N résolue par la table 'inscriptions'."
            },
            {
                q: "Pourquoi stocke-t-on `mot_de_passe_hash` et non `mot_de_passe` en clair ?",
                options: ["Pour gagner de l'espace disque", "Pour la sécurité : même en cas de fuite de données, le mot de passe réel reste protégé", "Parce que SQL ne supporte pas le texte long", "Ce n'est pas obligatoire, c'est juste une convention"],
                correct: 1,
                explain: "Le hachage (bcrypt, argon2...) est une pratique de sécurité standard : jamais de mot de passe en clair en base, même pour les administrateurs."
            },
            {
                q: "Quelle table résout la relation many-to-many entre étudiants et cours ?",
                options: ["modules", "resultats_quiz", "inscriptions", "formateurs"],
                correct: 2,
                explain: "La table 'inscriptions' porte les deux clés étrangères (id_etudiant, id_cours) et matérialise la relation N,N."
            },
            {
                q: "Quelle étape vient AVANT l'écriture du SQL dans la méthodologie de conception ?",
                options: ["La sauvegarde de production", "Le MCD et le MLD", "La création des index", "Le déploiement chez l'hébergeur"],
                correct: 1,
                explain: "On modélise toujours (MCD puis MLD) avant d'écrire le SQL définitif — c'est la démarche professionnelle standard."
            },
            {
                q: "Que doit contenir un utilisateur applicatif comme `app_formation` en production ?",
                options: ["Tous les droits, y compris DROP DATABASE", "Uniquement les droits nécessaires à l'application (ex: SELECT, INSERT, UPDATE)", "Aucun droit du tout", "Les droits d'administration des autres utilisateurs"],
                correct: 1,
                explain: "Conformément au principe du moindre privilège (module 7), un compte applicatif ne doit avoir que les droits requis par son usage réel."
            }
        ]
    }

    ]
};
