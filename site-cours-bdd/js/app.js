/* ==========================================================================
   MOTEUR DYNAMIQUE DU SITE DE FORMATION
   Institut de Formation Professionnelle CJEPE-BENIN
   Gère : routing par hash, progression (localStorage), rendu des modules,
   moteur de quiz noté, TP avec correction, certificat final.
   ========================================================================== */

(function () {
    "use strict";

    const STORAGE_KEY = "cjepe_bdd_course_progress_v1";
    const THEME_KEY = "cjepe_bdd_theme";
    const PASS_THRESHOLD = 70; // % requis pour valider un quiz

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* ---------------------------------------------------------------- */
    /* PROGRESSION (localStorage)                                        */
    /* ---------------------------------------------------------------- */
    function loadProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }
    function saveProgress(p) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    }
    function getModuleProgress(id) {
        const p = loadProgress();
        return p[id] || { lessonDone: false, tpDone: false, quizScore: 0, quizPassed: false };
    }
    function setModuleProgress(id, patch) {
        const p = loadProgress();
        p[id] = Object.assign({ lessonDone: false, tpDone: false, quizScore: 0, quizPassed: false }, p[id], patch);
        saveProgress(p);
        return p[id];
    }
    function isModuleDone(id) {
        return !!getModuleProgress(id).quizPassed;
    }
    function overallProgress() {
        const total = COURSE.modules.length;
        const done = COURSE.modules.filter((m) => isModuleDone(m.id)).length;
        return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
    }

    /* ---------------------------------------------------------------- */
    /* UV (unité de valeur) — une UV par module                          */
    /* ---------------------------------------------------------------- */
    function uvNumber(m) {
        return m.number + 1;
    }
    function isLastModule(m) {
        return m.number === COURSE.modules.length - 1;
    }
    function moduleUvValidated(id) {
        return isModuleDone(id);
    }

    /* ---------------------------------------------------------------- */
    /* THEME                                                             */
    /* ---------------------------------------------------------------- */
    function initTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) document.documentElement.setAttribute("data-theme", saved);
        $("#themeToggle").addEventListener("click", () => {
            const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
            const next = cur === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem(THEME_KEY, next);
            $("#themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
        });
        $("#themeToggle").textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    }

    /* ---------------------------------------------------------------- */
    /* HELPERS HTML                                                       */
    /* ---------------------------------------------------------------- */
    function esc(str) {
        const div = document.createElement("div");
        div.textContent = String(str == null ? "" : str);
        return div.innerHTML;
    }

    function moduleTotalCounts() {
        const tpCount = COURSE.modules.length; // 1 TP par module
        const quizCount = COURSE.modules.reduce((s, m) => s + m.quiz.length, 0);
        return { moduleCount: COURSE.modules.length, tpCount, quizCount };
    }

    /* ---------------------------------------------------------------- */
    /* SIDEBAR                                                            */
    /* ---------------------------------------------------------------- */
    function renderSidebar(activeId) {
        const nav = $("#navList");
        nav.innerHTML = COURSE.modules
            .map((m) => {
                const done = isModuleDone(m.id);
                const active = activeId === m.id;
                return `
                <li>
                    <button class="nav-item ${active ? "active" : ""} ${done ? "done" : ""}" data-route="module/${m.id}">
                        <span class="nav-num">${done ? "" : m.number}</span>
                        <span class="nav-title">${esc(m.title)}</span>
                    </button>
                </li>`;
            })
            .join("");

        const { done, total, pct } = overallProgress();
        $("#sidebarProgressLabel").textContent = `${done} / ${total} modules`;
        $("#sidebarProgressPct").textContent = `${pct}%`;
        $("#sidebarProgressFill").style.width = pct + "%";
        $("#globalProgressBar").style.width = pct + "%";
    }

    function filterSidebar(term) {
        term = term.trim().toLowerCase();
        $$("#navList .nav-item").forEach((btn) => {
            const txt = btn.textContent.toLowerCase();
            btn.parentElement.style.display = !term || txt.includes(term) ? "" : "none";
        });
    }

    /* ---------------------------------------------------------------- */
    /* VIEW: HOME                                                         */
    /* ---------------------------------------------------------------- */
    function renderHome() {
        const { moduleCount, tpCount, quizCount } = moduleTotalCounts();
        const { pct } = overallProgress();

        $("#view-home").innerHTML = `
        <section class="hero">
            <div>
                <span class="hero-eyebrow">🎓 ${esc(INSTITUTE.name)}</span>
                <h1>Bases de données<br>De <span>Zéro</span> à <span>Expert</span></h1>
                <p class="lead">${esc(COURSE.subtitle)}. Un parcours structuré en ${moduleCount} <strong>UV</strong> (unités de valeur), conforme aux standards internationaux (ISO/IEC 9075, OWASP, modèle ACID) : chaque UV se termine par un TP pratique puis un quiz noté, les ${moduleCount} UV validées débloquant votre attestation finale.</p>
                <div class="hero-cta">
                    <button class="btn btn-primary" data-route="module/${COURSE.modules[0].id}">▶ Commencer le module 0</button>
                    <button class="btn btn-ghost" data-route="plan">📋 Voir le plan complet</button>
                </div>
            </div>
            <div class="hero-image">
                <img src="${INSTITUTE.banner}" alt="Affiche de la formation Base de Données — Institut CJEPE-BENIN">
            </div>
        </section>

        <div class="stats-row">
            <div class="stat-card"><div class="num">${moduleCount}</div><div class="lbl">Modules</div></div>
            <div class="stat-card"><div class="num">${tpCount}</div><div class="lbl">TP pratiques</div></div>
            <div class="stat-card"><div class="num">${quizCount}</div><div class="lbl">Questions de quiz</div></div>
            <div class="stat-card"><div class="num">${pct}%</div><div class="lbl">Votre progression</div></div>
        </div>

        <div class="section-title">
            <h2>🗺️ Votre parcours d'apprentissage</h2>
            <p>Suivez les modules dans l'ordre pour progresser de zéro à expert</p>
        </div>
        <div class="path-grid" id="homePathGrid"></div>

        <div class="about-box">
            <div>
                <span class="hero-eyebrow" style="background:var(--orange-100);color:var(--orange-600);border-color:var(--orange-400);">🏫 À propos de l'institut</span>
                <h2 style="color:var(--navy-800); margin:0.6rem 0;">${esc(INSTITUTE.name)}</h2>
                <p style="color:var(--gray-600);">${esc(INSTITUTE.program)} — ${esc(INSTITUTE.duration)}.</p>
                <ul class="contact-list">
                    <li>📍 ${esc(INSTITUTE.city)}</li>
                    <li>📞 ${INSTITUTE.phones.map(esc).join(" · ")}</li>
                    <li>🕒 ${esc(INSTITUTE.modes)}</li>
                    <li>💳 Inscription : <strong>${esc(INSTITUTE.price.inscription)}</strong> — Formation : <strong>${esc(INSTITUTE.price.formation)}</strong></li>
                </ul>
                <div style="margin-top:1.2rem;">
                    <button class="btn btn-outline btn-sm" data-route="certificate">🏆 Voir mon attestation</button>
                </div>
            </div>
            <img src="${INSTITUTE.banner}" alt="Institut de Formation Professionnelle CJEPE-BENIN">
        </div>
        `;

        $("#homePathGrid").innerHTML = COURSE.modules
            .map((m) => {
                const done = isModuleDone(m.id);
                return `
                <div class="path-card ${done ? "done" : ""}" data-route="module/${m.id}">
                    <div class="top-row">
                        <span class="path-num">${done ? "✓" : m.number}</span>
                        <span class="level-chip level-${m.level}">${esc(m.level)}</span>
                    </div>
                    <span class="uv-badge ${done ? "done" : ""}">${done ? "✓" : "🎓"} UV${uvNumber(m)}</span>
                    <h3>${esc(m.title)}</h3>
                    <p class="desc">${esc(m.summary)}</p>
                    <div class="meta">
                        <span>⏱ ${esc(m.duration)}</span>
                        <span>❓ ${m.quiz.length} questions</span>
                    </div>
                </div>`;
            })
            .join("");
    }

    /* ---------------------------------------------------------------- */
    /* VIEW: PLAN                                                         */
    /* ---------------------------------------------------------------- */
    function renderPlan() {
        $("#view-plan").innerHTML = `
        <div class="module-header">
            <div class="breadcrumb">Accueil / Plan de formation</div>
            <h1>📋 Plan complet de la formation</h1>
            <p style="color:rgba(255,255,255,0.85); max-width:60ch;">Le parcours suit la progression officielle de l'institut, en ${COURSE.modules.length} UV (unités de valeur) : Conception de bases de données → SQL & Requêtes avancées → Normalisation & Modélisation → Administration & Sécurité → Projets pratiques.</p>
        </div>
        <div class="plan-timeline" id="planTimeline"></div>
        `;
        $("#planTimeline").innerHTML = COURSE.modules
            .map((m) => {
                const done = isModuleDone(m.id);
                return `
                <div class="plan-item ${done ? "done" : ""}" data-i="${done ? "✓" : m.number}">
                    <div class="plan-card" data-route="module/${m.id}">
                        <span class="uv-badge ${done ? "done" : ""}" style="margin-bottom:0.4rem;">${done ? "✓" : "🎓"} UV${uvNumber(m)}</span>
                        <h3>${esc(m.title)}</h3>
                        <p>${esc(m.summary)} · ⏱ ${esc(m.duration)} · <span class="level-chip level-${m.level}">${esc(m.level)}</span></p>
                    </div>
                </div>`;
            })
            .join("");
    }

    /* ---------------------------------------------------------------- */
    /* VIEW: CERTIFICATE                                                  */
    /* ---------------------------------------------------------------- */
    function renderCertificate() {
        const { done, total, pct } = overallProgress();
        const allDone = done === total;
        const savedName = localStorage.getItem("cjepe_bdd_learner_name") || "";

        $("#view-certificate").innerHTML = `
        <div class="module-header">
            <div class="breadcrumb">Accueil / Attestation</div>
            <h1>🏆 Votre attestation de réussite</h1>
            <p style="color:rgba(255,255,255,0.85);">Progression actuelle : ${done}/${total} UV validées (${pct}%). Une UV est validée lorsque son cours est lu, son TP réalisé et son quiz réussi avec au moins ${PASS_THRESHOLD}%.</p>
        </div>
        ${
            allDone
                ? `
            <div class="lesson-card">
                <label style="font-weight:700; font-size:0.9rem; color:var(--navy-800);">Votre nom complet (pour l'attestation)</label><br>
                <input id="learnerName" type="text" value="${esc(savedName)}" placeholder="Ex : Awa KOFFI" style="margin-top:0.5rem; width:100%; max-width:400px; padding:0.7rem 1rem; border-radius:10px; border:1.5px solid var(--gray-200); font-size:0.95rem;">
                <div style="margin-top:1rem; display:flex; gap:0.8rem;">
                    <button class="btn btn-primary btn-sm" id="genCertBtn">🎉 Générer mon attestation</button>
                    <button class="btn btn-outline btn-sm" id="printCertBtn">🖨️ Imprimer</button>
                </div>
                <div class="certificate" id="certOutput" style="display:none;">
                    <div class="cert-watermark"><img src="Institut-de-Formation-Professionnelle-CJEPE-BENIN-2.png" alt=""></div>
                    <div class="cert-inner">
                        <div class="cert-letterhead">
                            <img src="Institut-de-Formation-Professionnelle-CJEPE-BENIN-2.png" alt="Logo CJEPE-BENIN">
                            <div class="cert-letterhead-text">
                                <div class="cert-org">${esc(INSTITUTE.name)}</div>
                                <div class="cert-org-sub">${esc(INSTITUTE.city)}</div>
                            </div>
                        </div>
                        <h2>Attestation de Réussite</h2>
                        <p>Certifie que</p>
                        <div class="cert-name" id="certName">—</div>
                        <p>a validé avec succès les ${total} unités de valeur (UV) de la formation</p>
                        <h3 style="color:var(--orange-600); margin:0.4rem 0 1rem;">« ${esc(COURSE.title)} »</h3>
                        <p>Cours, TP pratiques et quiz de chaque UV, y compris le projet pratique final, conformément aux standards SQL (ISO/IEC 9075) et aux bonnes pratiques internationales de sécurité des bases de données.</p>
                        <p style="margin-top:1.5rem; font-size:0.8rem;">${esc(INSTITUTE.city)} · Délivrée le <span id="certDate"></span></p>
                        <div class="cert-number">Attestation CJEPE-BDD-____-____</div>
                    </div>
                </div>
            </div>`
                : `
            <div class="lesson-card">
                <p style="font-size:1rem; margin-bottom:1rem; text-align:center;">🔒 Validez les <strong>${total} UV</strong> (cours + TP + quiz ≥ ${PASS_THRESHOLD}%), dont le projet pratique final, pour débloquer votre attestation.</p>
                <div class="progress-track" style="max-width:400px; margin:0 auto 1rem;"><div class="progress-fill" style="width:${pct}%"></div></div>
                <ul class="uv-list">
                    ${COURSE.modules
                        .map((m) => {
                            const ok = isModuleDone(m.id);
                            return `<li class="${ok ? "ok" : ""}"><span class="uv-dot"></span>
                                <span class="uv-name">UV${uvNumber(m)} — ${esc(m.title)}</span>
                                <span class="uv-state">${ok ? "Validée ✓" : "À valider"}</span></li>`;
                        })
                        .join("")}
                </ul>
                <div style="text-align:center; margin-top:1.2rem;">
                    <button class="btn btn-primary btn-sm" data-route="plan">Voir les UV restantes</button>
                </div>
            </div>`
        }
        `;

        if (allDone) {
            $("#genCertBtn").addEventListener("click", () => {
                const name = $("#learnerName").value.trim() || "Étudiant(e)";
                localStorage.setItem("cjepe_bdd_learner_name", name);
                $("#certName").textContent = name;
                $("#certDate").textContent = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
                $("#certOutput").style.display = "block";
                $("#certOutput").scrollIntoView({ behavior: "smooth", block: "center" });
            });
            $("#printCertBtn").addEventListener("click", () => window.print());
        }
    }

    /* ---------------------------------------------------------------- */
    /* VIEW: MODULE (Cours / TP / Quiz)                                   */
    /* ---------------------------------------------------------------- */
    function renderModule(id, tab) {
        const idx = COURSE.modules.findIndex((m) => m.id === id);
        if (idx === -1) return navigate("home");
        const m = COURSE.modules[idx];
        const prev = COURSE.modules[idx - 1];
        const next = COURSE.modules[idx + 1];
        const prog = getModuleProgress(id);
        tab = tab || "lesson";
        const uvNum = uvNumber(m);
        const uvOk = moduleUvValidated(id);
        const lastModule = isLastModule(m);

        $("#view-module").innerHTML = `
        <div class="module-header">
            <div class="breadcrumb">Accueil / Module ${m.number}</div>
            <h1>${esc(m.title)}</h1>
            <p style="color:rgba(255,255,255,0.85); max-width:65ch;">${esc(m.summary)}</p>
            <div class="meta-row">
                <span class="chip">⏱ ${esc(m.duration)}</span>
                <span class="chip">🎯 ${esc(m.level)}</span>
                <span class="chip">❓ ${m.quiz.length} questions</span>
                ${prog.quizPassed ? `<span class="chip" style="background:var(--green-600);">✓ Module validé (${prog.quizScore}%)</span>` : ""}
            </div>
        </div>

        <div class="uv-block ${lastModule ? "uv-final" : ""}">
            <div class="uv-head">
                <b>🎓 UV${uvNum}${lastModule ? " — unité de valeur finale" : ""}</b>
                <span class="uv-status ${uvOk ? "ok" : ""}">${uvOk ? "Validée ✓" : "Non validée"}</span>
            </div>
            <p class="uv-crit">Validée quand : le cours est lu, le TP est réalisé, et le quiz est réussi à ${PASS_THRESHOLD}% minimum.</p>
            ${lastModule ? `<p class="uv-crit">C'est la dernière UV du parcours — le projet pratique final. Une fois validée avec les ${COURSE.modules.length - 1} précédentes, votre attestation est disponible.</p><button class="cert-link" data-route="certificate" style="background:none; border:none; padding:0; cursor:pointer;">🏆 Voir mon attestation →</button>` : ""}
        </div>

        <div class="tabs" id="moduleTabs">
            <button class="tab-btn" data-tab="lesson">📖 Cours</button>
            <button class="tab-btn" data-tab="tp">🛠️ TP</button>
            <button class="tab-btn" data-tab="quiz">📝 Quiz</button>
        </div>

        <div class="tab-panel" data-panel="lesson">
            <div class="objectives-box">
                <h4>🎯 Objectifs pédagogiques</h4>
                <ul>${m.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
            </div>
            <div class="lesson-card">
                ${m.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.html}`).join("")}
            </div>
            <div class="tp-checkbox-row">
                <input type="checkbox" id="lessonDoneCheck" ${prog.lessonDone ? "checked" : ""}>
                <label for="lessonDoneCheck">J'ai lu et compris ce cours</label>
            </div>
        </div>

        <div class="tab-panel" data-panel="tp">
            <div class="tp-card">
                <h2 style="color:var(--navy-800); margin-bottom:0.8rem;">${esc(m.tp.title)}</h2>
                <div class="tp-context">
                    <h4>📌 Contexte</h4>
                    <p>${esc(m.tp.context)}</p>
                </div>
                <ol class="tp-steps">
                    ${m.tp.instructions.map((step, i) => `<li><span class="step-num">${i + 1}</span><span>${esc(step)}</span></li>`).join("")}
                </ol>
                <button class="solution-toggle" id="toggleSolutionBtn">👁️ Afficher la solution</button>
                <div class="solution-box" id="solutionBox">${m.tp.solution}</div>
                <div class="tp-checkbox-row">
                    <input type="checkbox" id="tpDoneCheck" ${prog.tpDone ? "checked" : ""}>
                    <label for="tpDoneCheck">J'ai réalisé ce TP</label>
                </div>
            </div>
        </div>

        <div class="tab-panel" data-panel="quiz">
            <div class="quiz-card">
                <div class="quiz-intro">
                    <div>
                        <h2 style="color:var(--navy-800);">📝 Quiz du module ${m.number}</h2>
                        <p>Répondez aux ${m.quiz.length} questions puis validez. Score minimum pour valider le module : ${PASS_THRESHOLD}%.</p>
                    </div>
                    ${prog.quizPassed ? `<span class="chip" style="background:var(--green-600); color:white;">✓ Réussi (${prog.quizScore}%)</span>` : ""}
                </div>
                <form id="quizForm">
                    ${m.quiz
                        .map(
                            (q, qi) => `
                    <div class="quiz-question" data-qi="${qi}">
                        <div class="q-title"><span class="q-num-badge">${qi + 1}</span>${esc(q.q)}</div>
                        <div class="quiz-options">
                            ${q.options
                                .map(
                                    (opt, oi) => `
                            <label class="quiz-option" data-oi="${oi}">
                                <input type="radio" name="q${qi}" value="${oi}" required>
                                <span>${esc(opt)}</span>
                            </label>`
                                )
                                .join("")}
                        </div>
                        <div class="q-explanation" data-qi="${qi}">💡 ${esc(q.explain)}</div>
                    </div>`
                        )
                        .join("")}
                    <div class="quiz-actions">
                        <button type="submit" class="btn btn-primary">✅ Valider mes réponses</button>
                        <button type="button" class="btn btn-outline" id="resetQuizBtn">🔄 Recommencer</button>
                    </div>
                </form>
                <div class="quiz-result" id="quizResult"></div>
            </div>
        </div>

        <div class="module-nav-footer">
            ${prev ? `<button class="btn btn-outline" data-route="module/${prev.id}">← ${esc(prev.title)}</button>` : `<span></span>`}
            ${next ? `<button class="btn btn-primary" data-route="module/${next.id}">${esc(next.title)} →</button>` : `<button class="btn btn-primary" data-route="certificate">🏆 Voir mon attestation</button>`}
        </div>
        `;

        // Tabs
        $$("#moduleTabs .tab-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.tab === tab);
            btn.addEventListener("click", () => {
                location.hash = `#module/${id}/${btn.dataset.tab}`;
            });
        });
        $$("#view-module .tab-panel").forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.panel === tab);
        });

        // Lesson checkbox
        $("#lessonDoneCheck").addEventListener("change", (e) => {
            setModuleProgress(id, { lessonDone: e.target.checked });
            renderSidebar(id);
        });

        // TP solution toggle
        $("#toggleSolutionBtn").addEventListener("click", () => {
            const box = $("#solutionBox");
            box.classList.toggle("show");
            $("#toggleSolutionBtn").textContent = box.classList.contains("show") ? "🙈 Masquer la solution" : "👁️ Afficher la solution";
        });
        $("#tpDoneCheck").addEventListener("change", (e) => {
            setModuleProgress(id, { tpDone: e.target.checked });
            renderSidebar(id);
        });

        // Quiz engine
        const form = $("#quizForm");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let correctCount = 0;
            m.quiz.forEach((q, qi) => {
                const selected = form.querySelector(`input[name="q${qi}"]:checked`);
                const questionEl = form.querySelector(`.quiz-question[data-qi="${qi}"]`);
                const options = $$(".quiz-option", questionEl);
                const selectedIdx = selected ? Number(selected.value) : -1;
                const isCorrect = selectedIdx === q.correct;
                if (isCorrect) correctCount++;
                options.forEach((optEl) => {
                    const oi = Number(optEl.dataset.oi);
                    optEl.classList.remove("correct", "incorrect");
                    if (oi === q.correct) optEl.classList.add("correct");
                    else if (oi === selectedIdx) optEl.classList.add("incorrect");
                });
                questionEl.querySelector(".q-explanation").classList.add("show");
            });
            const score = Math.round((correctCount / m.quiz.length) * 100);
            const passed = score >= PASS_THRESHOLD;
            setModuleProgress(id, { quizScore: score, quizPassed: passed });
            renderSidebar(id);

            const resultBox = $("#quizResult");
            resultBox.className = "quiz-result show " + (passed ? "pass" : "fail");
            resultBox.innerHTML = `
                <div class="score-circle">${score}%</div>
                <div>
                    <strong style="display:block; font-size:1.05rem; margin-bottom:0.2rem;">
                        ${passed ? "🎉 Module validé !" : "❌ Pas encore validé"}
                    </strong>
                    <span style="font-size:0.87rem; color:var(--gray-600);">
                        ${correctCount} / ${m.quiz.length} bonnes réponses.
                        ${passed ? "Vous pouvez passer au module suivant." : `Il faut au moins ${PASS_THRESHOLD}% pour valider : relisez le cours et retentez.`}
                    </span>
                </div>`;
            resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        $("#resetQuizBtn").addEventListener("click", () => {
            form.reset();
            $$(".quiz-option", form).forEach((o) => o.classList.remove("correct", "incorrect"));
            $$(".q-explanation", form).forEach((e) => e.classList.remove("show"));
            $("#quizResult").className = "quiz-result";
            $("#quizResult").innerHTML = "";
        });
    }

    /* ---------------------------------------------------------------- */
    /* ROUTING                                                            */
    /* ---------------------------------------------------------------- */
    function setActiveView(name) {
        $$(".view").forEach((v) => v.classList.remove("active"));
        const el = $("#view-" + name);
        if (el) el.classList.add("active");
        $$(".header-nav button").forEach((b) => b.classList.toggle("active", b.dataset.route === name));
    }

    function navigate(hashRoute) {
        location.hash = "#" + hashRoute;
    }

    function route() {
        const raw = location.hash.replace(/^#/, "") || "home";
        const parts = raw.split("/");
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
        closeMobileSidebar();

        if (parts[0] === "module" && parts[1]) {
            renderModule(parts[1], parts[2]);
            renderSidebar(parts[1]);
            setActiveView("module");
        } else if (parts[0] === "plan") {
            renderPlan();
            renderSidebar(null);
            setActiveView("plan");
        } else if (parts[0] === "certificate") {
            renderCertificate();
            renderSidebar(null);
            setActiveView("certificate");
        } else {
            renderHome();
            renderSidebar(null);
            setActiveView("home");
        }
    }

    /* ---------------------------------------------------------------- */
    /* MOBILE SIDEBAR                                                     */
    /* ---------------------------------------------------------------- */
    function openMobileSidebar() {
        $(".sidebar").classList.add("open");
        $("#sidebarOverlay").classList.add("show");
    }
    function closeMobileSidebar() {
        $(".sidebar").classList.remove("open");
        $("#sidebarOverlay").classList.remove("show");
    }

    /* ---------------------------------------------------------------- */
    /* GLOBAL CLICK DELEGATION (data-route)                               */
    /* ---------------------------------------------------------------- */
    document.addEventListener("click", (e) => {
        const el = e.target.closest("[data-route]");
        if (el) {
            navigate(el.dataset.route);
        }
    });

    /* ---------------------------------------------------------------- */
    /* INIT                                                               */
    /* ---------------------------------------------------------------- */
    function init() {
        initTheme();
        $("#menuToggle").addEventListener("click", openMobileSidebar);
        $("#sidebarOverlay").addEventListener("click", closeMobileSidebar);
        $("#sidebarSearch").addEventListener("input", (e) => filterSidebar(e.target.value));
        window.addEventListener("hashchange", route);
        route();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
