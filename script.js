document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navRight = document.getElementById("nav-right");
    const searchToggle = document.getElementById("search-toggle");
    const searchForm = document.getElementById("search-form");
    const header = document.getElementById("site-header");

    // Menú móvil
    if (navToggle && navRight) {
        navToggle.addEventListener("click", () => {
            navRight.classList.toggle("nav-open");
            navToggle.classList.toggle("nav-toggle-open");
        });
    }

    // --- BUSCADOR ---
    if (searchToggle && searchForm) {
        searchToggle.addEventListener("click", () => {
            const isOpen = searchForm.classList.contains("search-open");
            const input = searchForm.querySelector("input");
            if (!isOpen) {
                searchForm.classList.add("search-open");
                if (input) input.focus();
            } else {
                if (input && input.value.trim() !== "") {
                    searchForm.dispatchEvent(
                        new Event("submit", { bubbles: true, cancelable: true })
                    );
                } else {
                    searchForm.classList.remove("search-open");
                }
            }
        });
    }

    // Mapeo de palabras de búsqueda -> secciones detalle.html
    const searchIndex = [
        // TOP MENU
        { seccion: "centro", terms: ["el centro", "centro"] },
        { seccion: "programas", terms: ["programas", "programa"] },
        { seccion: "historias", terms: ["historias", "historia", "historias reales"] },
        { seccion: "equipo", terms: ["equipo", "ministros", "gabinete", "liderazgo"] },
        {
            seccion: "sobre-nosotros",
            terms: ["acerca de nosotros", "sobre nosotros", "sobre la alianza", "sobre apls"]
        },
        { seccion: "apoyanos", terms: ["apoyanos", "apóyanos", "donaciones", "donar", "apoyo"] },

        // TIENDA
        { seccion: "tienda", terms: ["tienda", "shop", "tienda de la fundación", "la tienda"] },

        // FUNDACIÓN
        { seccion: "acerca", terms: ["acerca de", "fundación", "la fundación", "el partido"] },
        {
            seccion: "mision-valores",
            terms: ["mision", "misión", "valores", "mision y valores", "misión y valores"]
        },
        { seccion: "liderazgo", terms: ["liderazgo", "lideres", "líderes", "direccion"] },
        {
            seccion: "direccion-partido",
            terms: [
                "direccion del partido",
                "dirección del partido",
                "direccion del partido apls",
                "dirección del partido apls"
            ]
        },
        {
            seccion: "plan-gubernamental",
            terms: ["plan gubernamental", "plan de gobierno", "plan de gobierno apls"]
        },
        {
            seccion: "prensa-medios",
            terms: ["prensa", "medios", "prensa y medios", "noticias", "medios de comunicación"]
        },
        {
            seccion: "administracion",
            terms: ["administracion", "administración", "la administracion", "la administración"]
        },

        // FINANCIERA
        {
            seccion: "informes-anuales",
            terms: ["informes anuales", "informes", "reporte anual"]
        },
        {
            seccion: "info-financiera",
            terms: ["informacion financiera", "información financiera", "finanzas", "financiera"]
        },

        // INVOLÚCRATE
        {
            seccion: "formas-donar",
            terms: ["formas de donar", "como donar", "forma de donar"]
        },
        {
            seccion: "oportunidades-laborales",
            terms: ["oportunidades laborales", "empleo", "trabajo", "vacantes"]
        },
        {
            seccion: "info-proveedor",
            terms: [
                "informacion del proveedor",
                "información del proveedor",
                "proveedor",
                "proveedores"
            ]
        },
        {
            seccion: "organizar-evento",
            terms: ["organizar un evento", "evento", "organizar evento"]
        },
        {
            seccion: "suscripcion-boletines",
            terms: [
                "suscripcion a boletines",
                "suscripción a boletines",
                "boletines",
                "newsletter"
            ]
        },
        { seccion: "faq", terms: ["preguntas frecuentes", "faq", "dudas"] },
        {
            seccion: "contacto",
            terms: ["contacto", "contactar", "contactanos", "contáctanos"]
        }
    ];

    // Lógica de búsqueda
    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = searchForm.querySelector("input");
            if (!input) return;
            const query = input.value.trim().toLowerCase();
            if (query === "") return;

            let targetSeccion = null;

            for (const item of searchIndex) {
                for (const term of item.terms) {
                    if (query.includes(term.toLowerCase())) {
                        targetSeccion = item.seccion;
                        break;
                    }
                }
                if (targetSeccion) break;
            }

            if (targetSeccion) {
                window.location.href = "detalle.html?seccion=" + encodeURIComponent(targetSeccion);
            } else {
                alert("No se encontró ninguna sección relacionada con tu búsqueda.");
            }
        });
    }

    // Scroll suave para enlaces internos (index.html)
    const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
            const offset = elementTop - headerHeight - 10;

            window.scrollTo({
                top: offset,
                behavior: "smooth"
            });

            if (navRight && navRight.classList.contains("nav-open")) {
                navRight.classList.remove("nav-open");
                navToggle.classList.remove("nav-toggle-open");
            }
        });
    });

    // --------- CONTENIDOS DE detalle.html ---------
    const params = new URLSearchParams(window.location.search);
    const seccion = params.get("seccion");

    const titleEl = document.getElementById("detail-title");
    const categoryEl = document.getElementById("detail-category");
    const introEl = document.getElementById("detail-intro");
    const bodyEl = document.getElementById("detail-body");

    if (seccion && titleEl && categoryEl && introEl && bodyEl) {
        const dataMap = {
            // TOP MENU
            centro: {
                category: "El centro",
                title: "El centro de la APLS",
                intro:
                    "La Alianza por la Soberanía (APLS) nace porque la mayoría de los dominicanos estamos cansados de lo mismo: promesas que no se cumplen, políticos que aparecen solo en campaña y un país donde la gente tiene que luchar sola para avanzar.",
                body: `
                    <p>
                        Somos un grupo de ciudadanos comunes: estudiantes, trabajadores, jóvenes con visión,
                        personas que conocen de cerca lo que vive el dominicano todos los días. No respondemos
                        a intereses externos ni a grupos escondidos. Nuestro compromiso es directo con el pueblo
                        y con el país.
                    </p>
                    <p>
                        La APLS surge porque creemos que la soberanía no es solo frontera; es educación de calidad,
                        salud que funcione, seguridad en la calle, empleo real, apoyo a los agricultores, transporte
                        digno, protección del medio ambiente y un gobierno que respete cada peso del ciudadano.
                    </p>
                    <p>
                        No buscamos llegar al poder para estar bien. Queremos que el país esté bien.
                    </p>
                    <p>
                        Un país donde el progreso no sea un privilegio, donde la corrupción no sea normal,
                        donde la juventud tenga futuro sin emigrar y donde la gente tenga tranquilidad y esperanza.
                    </p>
                    <p>
                        La APLS es un movimiento limpio, transparente y cercano. No somos un partido tradicional:
                        somos dominicanos organizándose para hacer lo que muchos no han hecho. Aquí no prometemos
                        lo imposible, pero sí nos comprometemos a trabajar con honestidad, escuchar a la gente y
                        actuar por el bien común.
                    </p>
                    <p>
                        Venimos a cambiar la forma en que se hace política en la República Dominicana.
                        Venimos a unir, a construir y a proteger lo que es nuestro.
                    </p>
                    <p>
                        Somos la APLS, un partido hecho por la gente, para la gente… con los pies en la tierra
                        y el corazón en la nación.
                    </p>
                `
            },

            programas: {
                category: "Programas",
                title: "Programas transformadores de la APLS",
                intro:
                    "La Alianza por la Soberanía apuesta por soluciones que cambian la vida de la gente. Nuestros programas están diseñados para romper ciclos, modernizar el país y atacar los problemas de raíz.",
                body: `
                    <p><strong>No son promesas. Son cambios estructurales.</strong></p>

                    <h3>1. Programa “RD Digital para Todos”</h3>
                    <p>
                        Internet gratuito en parques, escuelas y zonas rurales; creación del “ID Digital Dominicano”
                        para unificar documentos y servicios; plataformas digitales para eliminar filas en las
                        instituciones y capacitación tecnológica para todas las edades.
                    </p>

                    <h3>2. Programa “Cero Corrupción en 24 Horas”</h3>
                    <p>
                        Transparencia total: todas las compras del Estado visibles en tiempo real, sueldos y contratos
                        publicados, cámaras en almacenes y hospitales, y un sistema de denuncias anónimas protegido por ley.
                    </p>

                    <h3>3. Programa “Barrios que Progresan”</h3>
                    <p>
                        Asfaltado, iluminación, agua potable, centros comunitarios 24/7 y apoyo directo a colmados,
                        talleres y emprendedores para que los barrios se conviertan en motores del país.
                    </p>

                    <h3>4. Programa “RD Produce”</h3>
                    <p>
                        Revolución agrícola con tecnología, eliminación de intermediarios, compras directas a productores
                        y atracción de jóvenes al campo con proyectos modernos y rentables.
                    </p>

                    <h3>5. Programa “Juventud Productiva RD”</h3>
                    <p>
                        Consejos juveniles con voz real, becas por mérito, programas de innovación, formación técnica
                        y alianzas con empresas para garantizar el primer empleo.
                    </p>

                    <h3>6. Programa “Salud al Minuto”</h3>
                    <p>
                        Micro-centros de emergencia en cada municipio, ambulancias geolocalizadas, telemedicina para
                        zonas remotas y abastecimiento constante de medicamentos esenciales.
                    </p>

                    <h3>7. Programa “Seguridad Inteligente 360°”</h3>
                    <p>
                        Cámaras inteligentes, patrullaje basado en datos, botones de emergencia comunitarios y formación
                        en resolución de conflictos desde las escuelas.
                    </p>

                    <p><strong>Esto sí cambia el país. Esto sí marca un antes y un después.</strong></p>

                    <hr class="section-divider" />

                    <h3>Imágenes de referencia de programas</h3>
                    <ul class="program-images-text">
                        <li>
                            <strong>Programa “Red Vial Digna RD”:</strong> carretera recién asfaltada, vecinos sonriendo y
                            maquinaria retirándose al fondo.
                        </li>
                        <li>
                            <strong>Programa “Clínicas Comunitarias 24/7”:</strong> clínica cercana atendiendo de día y de noche
                            a los residentes de los barrios.
                        </li>
                        <li>
                            <strong>Programa “Juventud Productiva RD”:</strong> jóvenes aprendiendo oficios técnicos y habilidades
                            digitales en aulas modernas.
                        </li>
                        <li>
                            <strong>Programa “Agua Limpia para Todos”:</strong> comunidades rurales recibiendo agua filtrada
                            y segura.
                        </li>
                        <li>
                            <strong>Programa “Barrio Seguro y Humano”:</strong> canchas iluminadas, lámparas nuevas y
                            policías comunitarios integrados al vecindario.
                        </li>
                    </ul>

                    <div class="programs-footer-text">
                        <h4>Alianza por la Soberanía — APLS</h4>
                        <p>
                            La APLS es un partido que trabaja por soluciones reales para la gente. Cada programa nace de
                            escuchar directamente a las comunidades, entender sus desafíos y actuar con responsabilidad,
                            transparencia y compromiso social. Nuestro objetivo no es prometer, es transformar. Con
                            soberanía, trabajo y dignidad, estamos construyendo la República Dominicana que todos
                            merecemos.
                        </p>
                    </div>
                `
            },

            historias: {
                category: "Historias reales",
                title: "Historias reales de cambio",
                intro:
                    "Detrás de cada obra, hay personas que recuperan su tranquilidad. Estas son dos historias reales que muestran cómo la APLS acompaña a las comunidades.",
                body: `
                    <h3>El barrio que volvió a caminar tranquilo</h3>
                    <p>
                        Por años, los hoyos, el lodo y el polvo hicieron casi imposible el paso de vehículos e incluso
                        ambulancias. Cuando la APLS llegó, no llegó con excusas: llegó con maquinaria, planificación
                        y respeto por la comunidad.
                    </p>
                    <p>
                        Con vecinos emocionados a los lados, Jean Luis cortó la cinta del nuevo asfaltado:
                        “Esto no es un favor, es un derecho”, dijo. El aplauso fue sincero. Por primera vez en mucho
                        tiempo, la gente vio una obra hecha sin bulla, sin robo y sin espera eterna. Una calle nueva
                        marcó el inicio de un cambio real.
                    </p>

                    <figure class="story-block">
                        <img
                            class="story-photo"
                            src="img/WhatsApp Image 2025-11-28 at 10.11.28 PM.jpeg"
                            alt="Inauguración de calle asfaltada con vecinos aplaudiendo"
                        />
                        <figcaption class="story-caption">
                            Inauguración de una nueva calle asfaltada junto a los moradores del barrio.
                        </figcaption>
                    </figure>

                    <h3>Cuando la salud volvió a ser un derecho</h3>
                    <p>
                        Doña Carmen llevaba meses sin poder pagar sus consultas. El dolor en sus piernas no la dejaba
                        dormir. Hanna, Rosangel y Marcos, miembros de la APLS, llegaron a su comunidad para acompañarla
                        en todo el proceso médico.
                    </p>
                    <p>
                        Hanna le dio apoyo y calma, Marcos gestionó directamente con el doctor para agilizar la atención,
                        y Rosangel se aseguró de que cada paso fuera humano y respetuoso. Doña Carmen salió del centro
                        médico con sus estudios hechos, medicamentos garantizados y una sonrisa que hacía tiempo no
                        mostraba.
                    </p>
                    <p>
                        “Ustedes sí se acuerdan de uno”, dijo ella. “Siempre”, respondieron. Pequeños gestos que hacen un
                        gran cambio: así trabaja la APLS.
                    </p>

                    <figure class="story-block">
                        <img
                            class="story-photo"
                            src="img/WhatsApp Image 2025-11-28 at 10.11.38 PM.jpeg"
                            alt="Equipo médico atendiendo a una adulta mayor en una clínica comunitaria"
                        />
                        <figcaption class="story-caption">
                            Equipo médico y comunitario acompañando a una envejeciente en una clínica local.
                        </figcaption>
                    </figure>
                `
            },

            "sobre-nosotros": {
                category: "Alianza por la Soberanía",
                title: "Quiénes somos y qué buscamos lograr",
                intro:
                    "La APLS es un movimiento político dominicano creado para cambiar la forma en que se hace política en nuestro país. Representamos a la gente que trabaja, estudia y lucha cada día.",
                body: `
                    <p>
                        Nuestro propósito es claro: construir una República Dominicana donde la soberanía no sea solo
                        una palabra, sino un compromiso con el bienestar de la gente. Para nosotros, soberanía significa
                        tener un país donde se respete la dignidad de cada persona, donde la justicia funcione, donde el
                        dinero del pueblo se use correctamente y donde el progreso llegue a todas las comunidades.
                    </p>
                    <p>
                        La APLS busca transformar el país con políticas públicas que realmente cambien vidas: programas
                        que modernicen la educación, fortalezcan la salud, dignifiquen el trabajo, mejoren la seguridad
                        y apoyen a quienes más lo necesitan. Queremos un Estado transparente, eficiente y cercano.
                    </p>
                    <p>
                        Nuestra visión es una nación donde los dominicanos no tengan que emigrar para encontrar
                        oportunidades; donde los jóvenes puedan crecer sin miedo; donde los envejecientes reciban
                        respeto; donde las comunidades marginadas sean atendidas y donde la corrupción deje de ser
                        costumbre.
                    </p>
                    <p>
                        Somos la APLS: un partido serio, honesto, humano y comprometido. No venimos a prometer lo que
                        no se puede; venimos a trabajar, a escuchar y a transformar. Nuestro objetivo es devolverle al
                        pueblo lo que siempre ha sido suyo: su país, su voz y su futuro.
                    </p>
                `
            },

            apoyanos: {
                category: "Apóyanos",
                title: "Apóyanos",
                intro:
                    "La APLS se sostiene con un modelo financiero transparente basado en aportes pequeños, actividades comunitarias y donaciones responsables.",
                body: `
                    <p>
                        <strong>1. Aportes voluntarios de miembros y simpatizantes</strong><br />
                        El 68% de nuestros fondos proviene de pequeñas contribuciones hechas por ciudadanos que
                        apoyan nuestro proyecto. Ningún aporte individual supera los RD$15,000, garantizando
                        independencia y evitando compromisos indebidos.
                    </p>
                    <p>
                        <strong>2. Actividades comunitarias y recaudaciones públicas</strong><br />
                        Un 22% de nuestros recursos se obtiene mediante actividades abiertas: rifas, ventas sociales,
                        caminatas solidarias, ventas sociales y eventos culturales cuyo único fin es recaudar para programas comunitarios.
                    </p>
                    <p>
                        <strong>3. Donaciones institucionales transparentes</strong><br />
                        Un 10% proviene de instituciones privadas que apoyan proyectos sociales, siempre bajo contratos
                        revisados y publicados. Ninguna entidad vinculada al partido recibe beneficios a cambio.
                    </p>

                    <p><strong>Distribución de los fondos:</strong></p>
                    <ul>
                        <li>Programas sociales y comunitarios: 43%</li>
                        <li>Formación y capacitación ciudadana: 21%</li>
                        <li>Operaciones internas del partido: 19%</li>
                        <li>Infraestructura, materiales y logística: 11%</li>
                        <li>Fondo de reserva y emergencias: 6%</li>
                    </ul>

                    <p>
                        Nuestros estados financieros se publican trimestralmente para garantizar total transparencia.
                        Cada peso que entra a la APLS tiene dueño: el pueblo dominicano. Aquí no hay maletines, ni
                        cheques por debajo de la mesa. Hay trabajo, esfuerzo y un país que queremos ver mejor.
                    </p>
                `
            },

            // EQUIPO
            equipo: {
                category: "Equipo",
                title: "Equipo de ministros y responsables APLS",
                intro:
                    "La APLS está formada por personas reales, comprometidas con servir al país desde la honestidad y el trabajo. Este es parte del equipo que impulsa nuestras propuestas.",
                body: `
                    <div class="team-section">
                        <p class="team-intro">
                            Cada rostro aquí representa un ministerio, una responsabilidad y una historia de servicio.
                            Juntos forman un equipo diverso que comparte un mismo objetivo:
                            construir una República Dominicana más justa, segura y soberana.
                        </p>

                        <div class="team-grid">
                            <!-- Presidente -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-01 at 9.45.17 PM.jpeg"
                                        alt="Jean Luis - Presidente de la APLS"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Jean Luis</h3>
                                    <p class="team-role">Presidente de la APLS</p>
                                </div>
                            </article>

                            <!-- Secretario General -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-01 at 9.46.08 PM.jpeg"
                                        alt="Bryan Fernández - Secretario General de la APLS"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Bryan Fernández</h3>
                                    <p class="team-role">Secretario General de la APLS</p>
                                </div>
                            </article>

                            <!-- Vicepresidente -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-01 at 9.46.27 PM.jpeg"
                                        alt="Marcos Adrián - Vicepresidente de la APLS"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Marcos Adrián</h3>
                                    <p class="team-role">Vicepresidente de la APLS</p>
                                </div>
                            </article>

                            <!-- Giltza Hanna - Agricultura -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-27 at 10.42.43 PM.jpeg"
                                        alt="Giltza Hanna - Ministra de Agricultura"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Giltza Hanna Martinez</h3>
                                    <p class="team-role">Ministra de Agricultura</p>
                                </div>
                            </article>

                            <!-- Awdry Nolasco - Medio Ambiente -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-27 at 12.11.49 PM.jpeg"
                                        alt="Awdry Nolasco - Ministro de Medio Ambiente"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Awdry Nolasco</h3>
                                    <p class="team-role">Ministro de Medio Ambiente</p>
                                </div>
                            </article>

                            <!-- Leandro García - Trabajo -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-28 at 7.15.51 PM.jpeg"
                                        alt="Leandro García - Ministro de Trabajo"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Leandro García</h3>
                                    <p class="team-role">Ministro de Trabajo</p>
                                </div>
                            </article>

                            <!-- Esmerlin Martínez Fabián - Educación -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-28 at 7.16.44 PM.jpeg"
                                        alt="Esmerlin Martínez Fabián - Ministro de Educación"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Esmerlin Martínez Fabián</h3>
                                    <p class="team-role">Ministro de Educación</p>
                                </div>
                            </article>

                            <!-- Nairobi Rodríguez - Cultura -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-28 at 7.28.53 PM.jpeg"
                                        alt="Nairobi Rodríguez - Ministra de Cultura"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Nairobi Rodríguez</h3>
                                    <p class="team-role">Ministra de Cultura</p>
                                </div>
                            </article>

                            <!-- Rosangel Paulino - Turismo -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-01 at 11.02.42 PM.jpeg"
                                        alt="Rosangel Paulino - Ministra de Turismo"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Rosangel Paulino</h3>
                                    <p class="team-role">Ministra de Turismo</p>
                                </div>
                            </article>

                            <!-- Coralia Cruceta - Deportes -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-01 at 11.08.27 PM.jpeg"
                                        alt="Coralia Cruceta - Ministra de Deportes"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Coralia Cruceta</h3>
                                    <p class="team-role">Ministra de Deportes</p>
                                </div>
                            </article>

                            <!-- Yanellys Vásquez - Salud Pública -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-04 at 8.46.10 PM.jpeg"
                                        alt="Yanellys Vásquez - Ministra de Salud Pública"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Yanellys Vásquez</h3>
                                    <p class="team-role">Ministra de Salud Pública</p>
                                </div>
                            </article>

                            <!-- Jesús Manuel Polanco - Juventud -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-28 at 7.48.05 PM.jpeg"
                                        alt="Jesús Manuel Polanco - Ministro de la Juventud"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Jesús Manuel Polanco</h3>
                                    <p class="team-role">Ministro de la Juventud</p>
                                </div>
                            </article>

                            <!-- Jhostyn Manuel - Economía -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-28 at 8.22.56 PM.jpeg"
                                        alt="Jhostyn Manuel - Ministro de Economía"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Jhostyn Manuel</h3>
                                    <p class="team-role">Ministro de Economía</p>
                                </div>
                            </article>

                            <!-- José Daniel Di Valerio - Interior y Policía -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-28 at 11.03.17 PM.jpeg"
                                        alt="José Daniel Di Valerio - Ministro de Interior y Policía"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">José Daniel Di Valerio</h3>
                                    <p class="team-role">Ministro de Interior y Policía</p>
                                </div>
                            </article>

                            <!-- Alberto López - Energía -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-29 at 6.20.49 PM.jpeg"
                                        alt="Alberto López - Ministro de Energía"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Alberto López</h3>
                                    <p class="team-role">Ministro de Energía</p>
                                </div>
                            </article>

                            <!-- Justin Dominici - Energía y minas -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-12-08 at 8.30.58 PM.jpeg"
                                        alt="Justin Dominici - Ministro de Energía y Minas"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Justin Dominici</h3>
                                    <p class="team-role">Ministro de Energía y Minas</p>
                                </div>
                            </article>

                            <!-- Abel Tejada - Obras Públicas -->
                            <article class="team-card">
                                <div class="team-photo-wrapper">
                                    <img
                                        src="img/WhatsApp Image 2025-11-29 at 6.34.39 PM.jpeg"
                                        alt="Abel Tejada - Ministro de Obras Públicas"
                                        class="team-photo"
                                    />
                                </div>
                                <div class="team-info">
                                    <h3 class="team-name">Abel Tejada</h3>
                                    <p class="team-role">Ministro de Obras Públicas</p>
                                </div>
                            </article>
                        </div>

                        <p class="team-closing">
                            Este es solo el comienzo. La APLS sigue sumando líderes, técnicos y voluntarios que creen
                            en una política limpia, cercana y enfocada en resultados reales para la gente.
                        </p>
                    </div>
                `
            },

            // TIENDA
            tienda: {
                category: "La Fundación",
                title: "La tienda de la APLS",
                intro:
                    "Nuestra tienda es un espacio simbólico donde cada artículo representa una causa: la educación, el medio ambiente, la justicia y la participación ciudadana.",
                body: `
                    <p>
                        En la tienda encontrarás camisetas, tazas, materiales educativos y artículos especiales
                        diseñados para llevar el mensaje de la APLS a cada rincón del país.
                    </p>
                    <p>
                        Muy pronto abriremos nuestro catálogo en línea con envíos nacionales. Mientras tanto, puedes
                        escribirnos a <a href="mailto:JeanLuis@apls.org">JeanLuis@apls.org</a> para pedidos o
                        información.
                    </p>
                `
            },

            // FUNDACIÓN
            acerca: {
                category: "La Fundación",
                title: "Acerca del partido — APLS",
                intro:
                    "La APLS es un movimiento político creado para transformar la República Dominicana desde la base: la gente.",
                body: `
                    <p>
                        Somos un partido que trabaja con hechos, no con promesas vacías. Apostamos a un país donde la
                        soberanía se viva todos los días: en la educación, en la economía, en la seguridad y en las
                        oportunidades de cada dominicano.
                    </p>
                    <p>
                        Desde el presidente Jean Luis hasta cada miembro del partido, la APLS representa una nueva
                        manera de hacer política: cercana, responsable y enfocada en resultados reales para el pueblo.
                    </p>
                `
            },

            "mision-valores": {
                category: "La Fundación",
                title: "Nuestra misión y valores",
                intro:
                    "La misión de la APLS es construir una República Dominicana donde cada ciudadano tenga acceso real a oportunidades, servicios dignos y un gobierno transparente.",
                body: `
                    <p>
                        <strong>Transparencia:</strong> decimos lo que hacemos y hacemos lo que decimos. Cada acción
                        se rinde con claridad al pueblo.
                    </p>
                    <p>
                        <strong>Compromiso social:</strong> las decisiones se toman pensando primero en las
                        comunidades y en la gente común, no en los intereses particulares.
                    </p>
                    <p>
                        <strong>Integridad:</strong> actuamos con rectitud, evitando prácticas que ensucian la política
                        y frenan el progreso del país.
                    </p>
                    <p>
                        <strong>Justicia y equidad:</strong> promovemos un país donde todos tengan acceso a
                        oportunidades sin importar su origen o condición económica.
                    </p>
                    <p>
                        <strong>Participación ciudadana:</strong> creemos que un buen gobierno se construye
                        escuchando a la gente y trabajando junto a ella.
                    </p>
                    <p>
                        <strong>Soberanía nacional:</strong> defendemos los recursos, la identidad, la cultura y las
                        decisiones del país con responsabilidad y visión de futuro.
                    </p>
                `
            },

            liderazgo: {
                category: "La Fundación",
                title: "Liderazgo",
                intro:
                    "La APLS está dirigida por un equipo diverso de profesionales, jóvenes, líderes comunitarios y ciudadanos comprometidos.",
                body: `
                    <p>
                        Desde la dirección ejecutiva hasta los “ministerios” internos, cada responsable aporta su
                        experiencia para construir un proyecto político moderno y serio, centrado en el progreso del
                        país.
                    </p>
                    <ul>
                        <li><strong>Jean Luis</strong> — Presidente del partido.</li>
                        <li><strong>Marcos Adrián</strong> — Vicepresidente del partido.</li>
                        <li><strong>Bryan Fernández</strong> — Secretario General.</li>
                        <li><strong>Rosangel Paulino</strong> — Ministerio de Turismo.</li>
                        <li><strong>Coralia Cruceta</strong> — Ministerio de Deportes.</li>
                        <li><strong>Awdry Nolasco</strong> — Ministerio de Medio Ambiente.</li>
                        <li><strong>Giltza Hanna</strong> — Ministerio de Agricultura.</li>
                        <li><strong>Leandro García</strong> — Ministerio de Trabajo.</li>
                        <li><strong>Esmerlin Martínez</strong> — Ministerio de Educación.</li>
                        <li><strong>Nairobi Rodríguez</strong> — Ministerio de Cultura.</li>
                        <li><strong>Yanellys Vásquez</strong> — Ministerio de Salud Pública.</li>
                        <li><strong>Jesús Manuel Polanco</strong> — Ministerio de la Juventud.</li>
                        <li><strong>Jhostyn Manuel</strong> — Ministerio de Economía.</li>
                        <li><strong>José Daniel Di Valerio</strong> — Ministerio de Interior y Policía.</li>
                        <li><strong>Alberto López</strong> — Ministerio de Energía.</li>
                        <li><strong>Justin Dominici</strong> — Ministerio de Energía y Minas.</li>
                        <li><strong>Abel Tejada</strong> — Ministerio de Obras Públicas.</li>
                    </ul>
                `
            },

            // *** NUEVO CONTENIDO DIRECCIÓN DEL PARTIDO ***
            "direccion-partido": {
                category: "La Fundación",
                title: "La dirección del partido",
                intro:
                    "La dirección del partido APLS define la visión, misión y los objetivos estratégicos que guían nuestro proyecto de transformación nacional.",
                body: `
                    <h3>Visión general</h3>
                    <p>
                        Con el firme propósito de transformar nuestra nación, presentamos este plan de gobierno como
                        la base de un proyecto renovador que responde a los desafíos del presente y del futuro.
                        Apostamos por una sociedad más justa, inclusiva y sostenible, donde cada ciudadano tenga la
                        oportunidad de prosperar.
                    </p>
                    <p>
                        Nuestro compromiso se fundamenta en valores de transparencia, innovación y equidad. La
                        dirección del partido asume la responsabilidad de garantizar que cada decisión política esté
                        alineada con estos principios y con las necesidades reales del pueblo dominicano.
                    </p>

                    <h3>Misión</h3>
                    <p>
                        Nuestra misión es liderar un cambio profundo que fortalezca las instituciones, promueva la
                        igualdad de oportunidades y garantice el bienestar integral de la población. Trabajaremos para
                        construir un país moderno, competitivo y solidario, donde la voz de cada ciudadano cuente en
                        la toma de decisiones.
                    </p>
                    <p>
                        La dirección del partido coordina este proceso, asegurando que las políticas públicas, los
                        programas sociales y las reformas estructurales respondan a una visión de largo plazo, sin
                        perder de vista la realidad cotidiana de las familias dominicanas.
                    </p>

                    <h3>Principales objetivos y nuevas propuestas</h3>
                    <p>
                        Para materializar esta visión y misión, la dirección de la APLS impulsa una agenda compuesta
                        por cinco grandes ejes estratégicos que organizan las nuevas propuestas de gobierno.
                    </p>

                    <h4>1. Desarrollo económico innovador</h4>
                    <ul>
                        <li>
                            Impulsar un modelo económico basado en la digitalización, la economía verde y la innovación
                            tecnológica, dejando atrás esquemas dependientes y poco productivos.
                        </li>
                        <li>
                            Crear incentivos reales para startups y emprendedores, fomentando la economía creativa y
                            el desarrollo de industrias sostenibles en todo el territorio nacional.
                        </li>
                        <li>
                            Establecer programas de capacitación en habilidades digitales para jóvenes y adultos,
                            de manera que la población pueda integrarse a los nuevos mercados laborales del siglo XXI.
                        </li>
                    </ul>

                    <h4>2. Educación del futuro</h4>
                    <ul>
                        <li>
                            Implementar un sistema educativo adaptado a las demandas actuales, con énfasis en
                            tecnología, idiomas, pensamiento crítico y resolución de problemas.
                        </li>
                        <li>
                            Garantizar acceso universal a plataformas digitales educativas y conectividad estable en
                            todo el territorio, reduciendo la brecha entre zonas urbanas y rurales.
                        </li>
                        <li>
                            Crear alianzas con universidades y empresas para impulsar programas de formación dual
                            que combinen teoría y práctica, facilitando la inserción laboral de los estudiantes.
                        </li>
                    </ul>

                    <h4>3. Salud y bienestar integral</h4>
                    <ul>
                        <li>
                            Modernizar la infraestructura sanitaria con tecnología avanzada, sistemas de gestión
                            digital y servicios de telemedicina para comunidades alejadas.
                        </li>
                        <li>
                            Desarrollar programas nacionales de salud mental y prevención de enfermedades crónicas,
                            incorporando campañas educativas y acompañamiento profesional.
                        </li>
                        <li>
                            Garantizar el acceso gratuito a medicamentos esenciales y a la atención primaria como
                            derecho básico, priorizando a la población más vulnerable.
                        </li>
                    </ul>

                    <h4>4. Inclusión social y equidad</h4>
                    <ul>
                        <li>
                            Implementar políticas que reduzcan la desigualdad, con programas de apoyo a madres
                            solteras, personas con discapacidad y adultos mayores.
                        </li>
                        <li>
                            Promover la equidad de género en todos los niveles, incluyendo el liderazgo político y
                            empresarial, asegurando que las mujeres tengan acceso real a espacios de decisión.
                        </li>
                        <li>
                            Crear un sistema de protección social digital que agilice ayudas y subsidios, evitando
                            intermediarios y garantizando que el apoyo llegue a quien realmente lo necesita.
                        </li>
                    </ul>

                    <h4>5. Sostenibilidad y acción climática</h4>
                    <ul>
                        <li>
                            Convertir la transición energética en prioridad nacional, impulsando las energías
                            renovables, la movilidad eléctrica y la eficiencia energética en instituciones y hogares.
                        </li>
                        <li>
                            Establecer leyes estrictas contra la contaminación y programas de reciclaje masivo para
                            proteger ríos, costas, suelos y aire.
                        </li>
                        <li>
                            Incentivar proyectos de reforestación y protección de la biodiversidad, entendiendo que
                            el desarrollo verdadero solo es posible si cuidamos los recursos de las futuras generaciones.
                        </li>
                    </ul>

                    <p>
                        Todo este marco estratégico, definido por la dirección del partido, sirve como brújula para
                        las decisiones políticas, legislativas y administrativas de la APLS. No se trata solo de
                        ideas, sino de un camino claro para transformar la República Dominicana con orden, coherencia
                        y responsabilidad histórica.
                    </p>
                `
            },

            // *** NUEVO CONTENIDO PLAN GUBERNAMENTAL ***
            "plan-gubernamental": {
                category: "Programas",
                title: "Plan de gobierno general — APLS",
                intro:
                    "La Alianza por la Soberanía presenta un Plan de Gobierno orientado a transformar la República Dominicana con honestidad, eficiencia y resultados medibles.",
                body: `
                    <p>
                        La Alianza por la Soberanía (APLS) presenta un Plan de Gobierno centrado en transformar la
                        República Dominicana con honestidad, eficiencia y resultados medibles. Nuestro enfoque parte
                        de un eje transversal fundamental: la transparencia, la digitalización del Estado y la
                        eliminación total del clientelismo político.
                    </p>
                    <p>
                        Creemos firmemente que un país solo avanza cuando cada peso del pueblo se maneja con claridad
                        y cuando cada institución rinde cuentas sin excusas. Por eso impulsaremos un sistema de
                        presupuesto abierto en tiempo real, donde cualquier ciudadano podrá ver cómo se usan los
                        recursos públicos, eliminando duplicidades, gastos innecesarios y prácticas corruptas.
                    </p>

                    <h3>Economía y desarrollo productivo</h3>
                    <p>
                        En el ámbito de la economía y el desarrollo productivo, la APLS trabajará para construir una
                        economía diversificada, fuerte y justa. Impulsaremos la creación de empleos formales mediante
                        programas de primer empleo para jóvenes, el fortalecimiento de la producción nacional y el
                        apoyo directo al sector agropecuario con créditos blandos, tecnología de riego y acceso a
                        nuevos mercados.
                    </p>
                    <p>
                        Apostamos a la soberanía alimentaria, al turismo ecológico como motor de desarrollo regional
                        y a una transición energética que reduzca la dependencia de combustibles fósiles, bajando los
                        costos de la energía para el pueblo. Nuestro objetivo es claro: que el trabajo digno vuelva a
                        ser la base del progreso nacional.
                    </p>

                    <h3>Seguridad ciudadana moderna y cercana</h3>
                    <p>
                        En cuanto a la seguridad ciudadana, transformaremos el modelo actual en un sistema moderno,
                        preventivo y cercano a la comunidad. Fortaleceremos a la Policía Nacional con mejores sueldos,
                        capacitación ética, herramientas tecnológicas y sistemas digitales de denuncia.
                    </p>
                    <p>
                        Implementaremos sistemas inteligentes de vigilancia, prevención del delito con apoyo de
                        tecnologías avanzadas y un enfoque fuerte en la participación comunitaria. La seguridad no
                        será solo represión: será prevención, organización social y confianza entre el ciudadano y las
                        autoridades.
                    </p>

                    <h3>Educación para el siglo XXI</h3>
                    <p>
                        La educación será uno de los pilares más firmes de nuestro gobierno. La APLS impulsará una
                        educación inclusiva, tecnológica y alineada con las demandas del siglo XXI. Apostamos a
                        laboratorios en las escuelas, centros regionales de innovación, capacitación continua de los
                        docentes y programas de becas nacionales e internacionales.
                    </p>
                    <p>
                        Además, integraremos el deporte escolar como herramienta de desarrollo físico, mental y
                        social, vinculando la educación con el empleo y el emprendimiento juvenil. Queremos una
                        generación de jóvenes preparados, críticos y capaces de liderar el futuro del país.
                    </p>

                    <h3>Salud como derecho, no como privilegio</h3>
                    <p>
                        En el área de la salud, garantizaremos un sistema accesible, humano y preventivo. Fortaleceremos
                        la atención primaria en comunidades rurales y zonas vulnerables, modernizaremos los hospitales,
                        digitalizaremos los expedientes médicos y llevaremos jornadas de salud a todo el país.
                    </p>
                    <p>
                        Se impulsará una Red Nacional de Emergencias Comunitarias para responder de forma rápida y
                        eficiente ante cualquier situación. La salud dejará de ser un privilegio para convertirse en
                        un derecho garantizado y protegido por el Estado.
                    </p>

                    <h3>Protección del medio ambiente y sostenibilidad</h3>
                    <p>
                        La protección del medio ambiente será una prioridad nacional. La APLS impulsará un gran plan
                        de reciclaje, reforestación, recuperación de ríos y eliminación de vertederos contaminantes.
                    </p>
                    <p>
                        Fomentaremos el uso de energías limpias, el cuidado de las playas, la restauración de
                        arrecifes y la movilidad ecológica. Nuestro compromiso es claro: desarrollo sí, pero sin
                        destruir los recursos que pertenecen a las futuras generaciones.
                    </p>

                    <h3>Desarrollo social, juventud y cultura</h3>
                    <p>
                        En materia de desarrollo social, trabajaremos para reducir las desigualdades, fortalecer la
                        juventud, proteger a las familias vulnerables y descentralizar la cultura. Apoyaremos el
                        emprendimiento juvenil, el empleo digno, el deporte comunitario y la participación ciudadana.
                    </p>
                    <p>
                        La inversión social será protegida como una prioridad del Estado, garantizando que llegue a
                        quienes realmente la necesitan sin intermediarios políticos ni condicionamientos partidarios.
                    </p>

                    <h3>Infraestructura, transporte y vivienda</h3>
                    <p>
                        En cuanto a la infraestructura, el transporte y la vivienda, la APLS apuesta a un país mejor
                        conectado y más equitativo. Impulsaremos sistemas de transporte moderno, seguro y sostenible,
                        la digitalización del tránsito, el mantenimiento preventivo de carreteras y la planificación
                        urbana con visión de futuro.
                    </p>
                    <p>
                        El desarrollo no puede quedarse solo en las grandes ciudades: debe llegar a cada comunidad del
                        país, llevando dignidad, servicios básicos y oportunidades para todos.
                    </p>

                    <h3>Mensaje final al pueblo</h3>
                    <p>
                        Este Plan de Gobierno no nace de discursos bonitos; nace de la realidad que vive el pueblo
                        dominicano. La APLS no viene a improvisar, viene a gobernar con planificación, con datos, con
                        corazón y con compromiso.
                    </p>
                    <p>
                        Nuestro propósito es devolverle al ciudadano la confianza en el Estado, garantizar derechos,
                        abrir oportunidades y demostrar que sí es posible un país gestionado con honestidad, eficiencia
                        y justicia social.
                    </p>
                    <p>
                        La APLS no promete lo imposible.<br />
                        Promete trabajar sin fallar.<br />
                        Y cumplirle al pueblo, sin excusas.
                    </p>
                `
            },

            "prensa-medios": {
                category: "La Fundación",
                title: "Prensa y medios",
                intro:
                    "La APLS mantiene una comunicación clara, directa y transparente con la ciudadanía.",
                body: `
                    <p>
                        En esta área se comparten comunicados oficiales, boletines informativos, entrevistas,
                        apariciones en medios y material audiovisual sobre las actividades del partido. Toda la
                        información se publica con un objetivo: que la población sepa qué estamos haciendo y cómo
                        avanzan los proyectos en cada comunidad.
                    </p>

                    <h3>Línea editorial</h3>
                    <p>
                        Nuestra línea editorial se basa en tres principios: veracidad, cercanía y rendición de cuentas.
                        La APLS no utiliza la comunicación para propaganda vacía, sino para explicar decisiones,
                        escuchar críticas y mostrar resultados medibles en el territorio.
                    </p>

                    <h3>Canales oficiales</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Canal</th>
                                <th>Propósito principal</th>
                                <th>Frecuencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Boletín digital APLS</td>
                                <td>Informar sobre programas, actividades y rendición de cuentas.</td>
                                <td>Semanal</td>
                            </tr>
                            <tr>
                                <td>Redes sociales (@APLSRD)</td>
                                <td>Cercanía con la gente, cobertura en tiempo real de operativos y visitas.</td>
                                <td>Diaria</td>
                            </tr>
                            <tr>
                                <td>Notas de prensa</td>
                                <td>Comunicados formales dirigidos a medios nacionales e internacionales.</td>
                                <td>Según agenda</td>
                            </tr>
                            <tr>
                                <td>Ruedas de prensa comunitarias</td>
                                <td>Responder directamente a preguntas de la prensa y de los vecinos.</td>
                                <td>Mensual</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Mapa básico de comunicación</h3>
                    <p>
                        Toda información sigue un flujo claro: primero se valida con el equipo técnico, luego se
                        presenta a la Dirección de Comunicación y finalmente se publica por los canales oficiales.
                        Esto evita rumores, filtraciones malintencionadas y datos sin contexto.
                    </p>

                    <p>
                        Para solicitudes de prensa, entrevistas o materiales gráficos, los medios pueden escribir a
                        <strong>prensa@apls.org.do</strong> o contactar a la Dirección de Comunicación de forma directa.
                    </p>
                `
            },

            administracion: {
                category: "La Fundación",
                title: "La administración",
                intro:
                    "La administración de la APLS está diseñada para garantizar eficiencia, responsabilidad y transparencia en cada decisión.",
                body: `
                    <p>
                        La estructura administrativa de la APLS combina equipos técnicos, liderazgo político y
                        representación comunitaria. El objetivo es que cada peso, cada programa y cada decisión
                        tengan un responsable claro y un resultado que se pueda medir.
                    </p>

                    <h3>Áreas principales de gestión</h3>
                    <ul>
                        <li><strong>Dirección Ejecutiva:</strong> coordina la estrategia general del partido y da seguimiento a los programas.</li>
                        <li><strong>Secretaría General:</strong> administra la documentación interna, actas, resoluciones y reglamentos.</li>
                        <li><strong>Consejo Ministerial:</strong> integra a los ministros y responsables de área para coordinar acciones en territorio.</li>
                        <li><strong>Unidad de Planificación y Desarrollo:</strong> diseña proyectos, cronogramas y matrices de resultados.</li>
                        <li><strong>Unidad de Transparencia y Control Interno:</strong> supervisa el uso de los recursos y el cumplimiento de normas éticas.</li>
                    </ul>

                    <h3>Flujo de decisiones</h3>
                    <ol>
                        <li>La comunidad identifica una necesidad y la presenta a la estructura local de la APLS.</li>
                        <li>La Unidad de Planificación y Desarrollo analiza viabilidad, costo y alcance social.</li>
                        <li>El Consejo Ministerial aprueba el programa y asigna un equipo responsable.</li>
                        <li>Se ejecuta el proyecto con acompañamiento comunitario y reportes periódicos.</li>
                        <li>La Unidad de Transparencia audita resultados y publica un informe público.</li>
                    </ol>

                    <p>
                        De esta forma, la administración no se queda en papeles: se conecta directamente con los barrios,
                        los campos y las familias que necesitan soluciones reales.
                    </p>
                `
            },

            // FINANCIERA
            "informes-anuales": {
                category: "Financiera",
                title: "Informes anuales",
                intro:
                    "Los informes anuales de la APLS presentan los resultados, el impacto social y el uso de los recursos durante cada año.",
                body: `
                    <p>
                        Cada informe anual resume lo que hicimos, cómo se usaron los fondos y qué metas se cumplieron.
                        Son documentos públicos, escritos en lenguaje claro, para que cualquier persona pueda entender
                        en qué se invierte el esfuerzo y el dinero de la APLS.
                    </p>

                    <h3>Contenido típico de un informe anual</h3>
                    <ul>
                        <li>Mensaje del Presidente y del Secretario General.</li>
                        <li>Resumen de programas ejecutados y comunidades impactadas.</li>
                        <li>Resultados medibles en educación, salud, juventud y seguridad.</li>
                        <li>Detalle de ingresos y gastos, con gráficos y cuadros comparativos.</li>
                        <li>Metas para el siguiente año y compromisos de mejora.</li>
                    </ul>

                    <h3>Ejemplo de resumen comparativo</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Año</th>
                                <th>Programas ejecutados</th>
                                <th>Comunidades alcanzadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023</td>
                                <td>27 programas</td>
                                <td>95 comunidades</td>
                            </tr>
                            <tr>
                                <td>2024</td>
                                <td>34 programas</td>
                                <td>128 comunidades</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        Muy pronto podrás consultar y descargar los informes en formato digital desde esta misma
                        sección, organizados por año y por tema, para facilitar el análisis y el seguimiento.
                    </p>
                `
            },

            "info-financiera": {
                category: "Financiera",
                title: "Información financiera",
                intro:
                    "La APLS mantiene un compromiso firme con la transparencia en el manejo de los recursos.",
                body: `
                    <p>
                        La información financiera de la APLS muestra de manera clara de dónde vienen los fondos,
                        cómo se administran y en qué se invierten. No hay espacios para maletines ni acuerdos
                        ocultos: cada aporte debe dejar un rastro verificable.
                    </p>

                    <h3>Principios de manejo financiero</h3>
                    <ul>
                        <li><strong>Transparencia total:</strong> registro y publicación periódica de ingresos y gastos.</li>
                        <li><strong>Control interno fuerte:</strong> doble verificación de pagos y contratos.</li>
                        <li><strong>Prioridad social:</strong> la mayor parte del presupuesto va a programas en comunidades.</li>
                        <li><strong>Reserva responsable:</strong> fondo de emergencias para situaciones imprevistas.</li>
                    </ul>

                    <h3>Distribución orientativa del presupuesto</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Área</th>
                                <th>Porcentaje aproximado</th>
                                <th>Ejemplo de uso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Programas sociales y comunitarios</td>
                                <td>43%</td>
                                <td>Operativos médicos, iluminación de barrios, apoyo a estudiantes.</td>
                            </tr>
                            <tr>
                                <td>Formación y capacitación</td>
                                <td>21%</td>
                                <td>Talleres, cursos técnicos, jornadas de liderazgo juvenil.</td>
                            </tr>
                            <tr>
                                <td>Operación interna del partido</td>
                                <td>19%</td>
                                <td>Alquiler de locales, servicios básicos, personal administrativo.</td>
                            </tr>
                            <tr>
                                <td>Infraestructura y logística</td>
                                <td>11%</td>
                                <td>Transporte, equipos, material de trabajo en territorio.</td>
                            </tr>
                            <tr>
                                <td>Fondo de reserva y emergencias</td>
                                <td>6%</td>
                                <td>Respuesta rápida ante desastres naturales o situaciones urgentes.</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        Esta sección se actualizará de manera periódica con reportes, cuadros y gráficos que permitan
                        a cualquier dominicano revisar, cuestionar y supervisar el uso de los recursos de la APLS.
                    </p>
                `
            },

            // INVOLÚCRATE
            "formas-donar": {
                category: "Involúcrate",
                title: "Formas de donar",
                intro:
                    "Cada aporte, por pequeño que sea, ayuda a impulsar proyectos que benefician directamente a las comunidades.",
                body: `
                    <p>
                        La APLS trabaja con un modelo de financiamiento limpio y transparente. Prefiere muchos aportes
                        pequeños antes que pocos cheques condicionados. Así protegemos la independencia del partido
                        y evitamos compromisos ocultos que perjudiquen al pueblo.
                    </p>

                    <h3>Modalidades de aporte</h3>
                    <ul>
                        <li><strong>Donación única:</strong> contribuciones puntuales para apoyar un programa específico.</li>
                        <li><strong>Aporte mensual recurrente:</strong> débito automático o transferencia programada para sostener proyectos a largo plazo.</li>
                        <li><strong>Aportes en especie:</strong> materiales para operativos médicos, útiles escolares, alimentos o insumos comunitarios.</li>
                        <li><strong>Campañas solidarias:</strong> actividades organizadas en barrios y comunidades para recaudar fondos y concienciar.</li>
                    </ul>

                    <h3>Ejemplos de impacto estimado</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo de aporte</th>
                                <th>Monto de referencia</th>
                                <th>Impacto aproximado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Donación única</td>
                                <td>RD$ 500</td>
                                <td>Compra de medicamentos básicos para un operativo comunitario.</td>
                            </tr>
                            <tr>
                                <td>Aporte mensual</td>
                                <td>RD$ 1,000</td>
                                <td>Beca parcial para un joven en cursos técnicos o comunitarios.</td>
                            </tr>
                            <tr>
                                <td>Campaña solidaria</td>
                                <td>RD$ 10,000+</td>
                                <td>Iluminación de un tramo de calle, apoyo a comedores o recuperación de espacios.</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        Próximamente, la plataforma digital de la APLS permitirá registrar cada aporte con un comprobante
                        descargable y un resumen de los proyectos que se financiaron gracias a tu apoyo.
                    </p>
                `
            },

            "oportunidades-laborales": {
                category: "Involúcrate",
                title: "Oportunidades laborales",
                intro:
                    "En la APLS creemos que el talento dominicano merece oportunidades reales para crecer y aportar al país.",
                body: `
                    <p>
                        La APLS abre plazas de trabajo y pasantías en áreas técnicas, sociales y administrativas.
                        Buscamos personas con vocación de servicio, disciplina y compromiso con una política limpia.
                    </p>

                    <h3>Áreas donde puedes aplicar</h3>
                    <ul>
                        <li>Programas comunitarios (salud, juventud, deporte, cultura).</li>
                        <li>Gestión de datos, tecnología y soporte digital.</li>
                        <li>Comunicación, diseño gráfico y producción audiovisual.</li>
                        <li>Logística, planificación y apoyo en eventos.</li>
                        <li>Investigación social y levantamiento de información en territorio.</li>
                    </ul>

                    <h3>Proceso de selección</h3>
                    <ol>
                        <li>Registro en la plataforma de oportunidades laborales de la APLS.</li>
                        <li>Revisión de perfil según experiencia, formación y valores éticos.</li>
                        <li>Entrevistas individuales y, en algunos casos, dinámicas de grupo.</li>
                        <li>Evaluación final por parte del equipo técnico y la Dirección correspondiente.</li>
                        <li>Notificación, inducción y acompañamiento en los primeros meses de trabajo.</li>
                    </ol>

                    <p>
                        Todas las vacantes se publican con descripción clara, tipo de contrato, lugar de trabajo y
                        rango salarial estimado. No se aceptan recomendaciones que violen la igualdad de oportunidades
                        ni se permiten cobros para acceder a una plaza.
                    </p>
                `
            },

            "info-proveedor": {
                category: "Involúcrate",
                title: "Información del proveedor",
                intro:
                    "La APLS trabaja con proveedores que cumplen criterios claros de calidad, transparencia y responsabilidad social.",
                body: `
                    <p>
                        Las empresas y suplidores que colaboran con la APLS son seleccionados mediante procesos
                        abiertos y verificables. Se priorizan proveedores que generen empleo local, respeten los
                        derechos laborales y ofrezcan condiciones justas para el Estado y la comunidad.
                    </p>

                    <h3>Requisitos generales</h3>
                    <ul>
                        <li>Registro mercantil y documentación fiscal al día.</li>
                        <li>Historial comprobable de cumplimiento de contratos.</li>
                        <li>Políticas internas de respeto a los trabajadores y al medio ambiente.</li>
                        <li>Ausencia de sanciones graves por corrupción o malas prácticas comerciales.</li>
                    </ul>

                    <h3>Pasos para convertirse en proveedor APLS</h3>
                    <ol>
                        <li>Completar el formulario de registro de proveedores en la plataforma oficial.</li>
                        <li>Adjuntar documentación legal, referencia bancaria y portafolio de servicios.</li>
                        <li>Evaluación técnica y económica por parte de la Unidad de Compras.</li>
                        <li>Inscripción en el registro oficial de suplidores aprobados.</li>
                        <li>Participación en procesos de cotización, licitación o compra directa según el caso.</li>
                    </ol>

                    <p>
                        Toda la información sobre procesos de compras, adjudicaciones y contratos será publicada en
                        la sección de Información financiera para facilitar la fiscalización ciudadana.
                    </p>
                `
            },

            "organizar-evento": {
                category: "Involúcrate",
                title: "Organizar un evento",
                intro:
                    "Ponemos a disposición de juntas de vecinos, organizaciones y comunidades la posibilidad de coordinar actividades junto a la APLS.",
                body: `
                    <p>
                        Los eventos comunitarios son una de las mejores herramientas para escuchar a la gente y
                        construir soluciones en conjunto. La APLS colabora con comunidades en charlas, operativos,
                        encuentros juveniles, actividades deportivas y jornadas culturales.
                    </p>

                    <h3>Tipos de eventos que apoyamos</h3>
                    <ul>
                        <li>Conversatorios sobre seguridad, juventud, empleo y educación.</li>
                        <li>Operativos médicos y jornadas de prevención de salud.</li>
                        <li>Rescate y limpieza de espacios públicos y cañadas.</li>
                        <li>Torneos deportivos y actividades recreativas para la juventud.</li>
                        <li>Encuentros con líderes comunitarios y mesas de trabajo barriales.</li>
                    </ul>

                    <h3>Flujo básico para solicitar un evento</h3>
                    <ol>
                        <li>La comunidad completa un formulario con el tipo de actividad y el objetivo del evento.</li>
                        <li>El equipo de la APLS revisa la solicitud, recursos necesarios y fecha tentativa.</li>
                        <li>Se coordina una visita previa para conocer el lugar y ajustar la logística.</li>
                        <li>Se ejecuta el evento con participación activa de la comunidad.</li>
                        <li>Se elabora un pequeño informe con fotos, resultados y próximos pasos.</li>
                    </ol>

                    <p>
                        De esta manera, cada actividad deja algo más que fotos: deja acuerdos, compromisos y planes
                        concretos para seguir mejorando la vida en el barrio o comunidad.
                    </p>
                `
            },

            "suscripcion-boletines": {
                category: "Involúcrate",
                title: "Suscripción a boletines",
                intro: "Mantente informado sobre cada paso que damos.",
                body: `
                    <p>
                        Los boletines de la APLS son una herramienta para que cualquier ciudadano pueda seguir de
                        cerca los proyectos, decisiones y resultados del partido. No son cadenas de spam: son
                        resúmenes claros, ordenados y verificados.
                    </p>

                    <h3>¿Qué recibirás al suscribirte?</h3>
                    <ul>
                        <li>Resumen semanal de actividades en barrios y comunidades.</li>
                        <li>Historias reales de personas beneficiadas por los programas.</li>
                        <li>Explicaciones sencillas de decisiones políticas y propuestas legislativas.</li>
                        <li>Convocatorias a encuentros, consultas ciudadanas y eventos abiertos.</li>
                        <li>Enlaces a informes financieros y documentos de transparencia.</li>
                    </ul>

                    <h3>Ejemplo de calendario temático</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Mes</th>
                                <th>Enfoque principal del boletín</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Enero</td>
                                <td>Balance del año anterior y metas para el nuevo período.</td>
                            </tr>
                            <tr>
                                <td>Abril</td>
                                <td>Programas de juventud y formación técnica.</td>
                            </tr>
                            <tr>
                                <td>Agosto</td>
                                <td>Transparencia, informes financieros y control ciudadano.</td>
                            </tr>
                            <tr>
                                <td>Noviembre</td>
                                <td>Historias de comunidades transformadas por la APLS.</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        Tu correo solo se utilizará para estos fines informativos. No será vendido, cedido ni utilizado
                        para campañas ajenas a la APLS. Puedes cancelar tu suscripción en cualquier momento.
                    </p>
                `
            },

            faq: {
                category: "Involúcrate",
                title: "Preguntas frecuentes",
                intro: "Resolvemos las dudas más comunes sobre la APLS y nuestra forma de trabajar.",
                body: `
                    <ol class="faq-list">
                        <li>
                            <strong>¿Qué es la APLS?</strong><br />
                            Es un partido político dominicano formado por jóvenes, profesionales y ciudadanos que
                            creen en transparencia, soberanía y justicia social.
                        </li>
                        <li>
                            <strong>¿Cómo puedo unirme?</strong><br />
                            Desde la sección “Involúcrate” puedes registrarte como voluntario, colaborador o miembro
                            formal de proyectos específicos.
                        </li>
                        <li>
                            <strong>¿Dónde veo los programas?</strong><br />
                            En la sección “Programas” encontrarás nuestras propuestas sociales, económicas y
                            comunitarias.
                        </li>
                        <li>
                            <strong>¿Aceptan donaciones?</strong><br />
                            Sí, a través de la sección “Formas de donar”, con mecanismos seguros y transparentes.
                        </li>
                        <li>
                            <strong>¿Dónde veo los informes financieros?</strong><br />
                            En la sección “Financiera” están disponibles los informes anuales y la información
                            financiera.
                        </li>
                    </ol>
                `
            },

            contacto: {
                category: "Involúcrate",
                title: "Contacto",
                intro: "Para la APLS, la comunicación directa con la gente es una prioridad.",
                body: `
                    <p>
                        <strong>Correo institucional:</strong><br />
                        <a href="mailto:contacto@apls.org.do">contacto@apls.org.do</a>
                    </p>
                    <p>
                        <strong>Línea de atención al ciudadano:</strong><br />
                        (809) 555-2025 — Información rápida, apoyo comunitario y seguimiento de actividades.
                    </p>
                    <p>
                        <strong>Oficina central (dirección ficticia):</strong><br />
                        Av. Libertad Nacional #14, Sector Centro Cívico, Santo Domingo, R.D.<br />
                        Horario: lunes a viernes, 9:00 a.m. – 4:00 p.m.
                    </p>
                    <p>
                        <strong>Redes oficiales:</strong><br />
                        Facebook, Instagram, X (Twitter) y TikTok como <strong>@APLSRD</strong>.
                    </p>
                    <p>
                        También contamos con un formulario de contacto en la web para sugerencias, propuestas y
                        participación comunitaria.
                    </p>
                    <p>
                        La APLS está aquí para escuchar, orientar y trabajar junto a la gente. Tu voz también
                        construye esta nación.
                    </p>
                `
            }
        };

        const data = dataMap[seccion];

        if (data) {
            categoryEl.textContent = data.category;
            titleEl.textContent = data.title;
            introEl.textContent = data.intro;
            bodyEl.innerHTML = data.body;
            document.title = data.title + " - Alianza por la Soberanía";
        } else {
            categoryEl.textContent = "Sección no encontrada";
            titleEl.textContent = "Contenido no disponible";
            introEl.textContent =
                "La sección solicitada no existe o ha sido movida. Verifica el enlace o regresa al inicio.";
            bodyEl.innerHTML =
                "<p>No encontramos información para esta sección. Vuelve al menú principal para elegir otra opción.</p>";
            document.title = "Sección no encontrada - Alianza por la Soberanía";
        }
    }
});
