/* =========================================================
   DELAINE.MAKEUP
   SCRIPT.JS
   Navegação, animações, marcações e administração
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MENU
    ===================================================== */

    const menuToggle = document.querySelector("#menuToggle");
    const navMenu = document.querySelector("#navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });


        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        });

    }


    /* =====================================================
       2. HEADER AO FAZER SCROLL
    ===================================================== */

    const header = document.querySelector("#siteHeader");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();

    }


    /* =====================================================
       3. SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       4. ANO AUTOMÁTICO
    ===================================================== */

    const currentYear =
        document.querySelector("#currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       5. BOTÃO VOLTAR AO TOPO
    ===================================================== */

    const backToTop =
        document.querySelector("#backToTop");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        };


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       6. ANIMAÇÕES
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".animate, .fade-up, .fade-left, .fade-right, .zoom-in, .reveal, .service-card, .gallery-item"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       7. FORMULÁRIO DE MARCAÇÃO
    ===================================================== */

    const bookingForm =
        document.querySelector("#bookingForm");


    if (bookingForm) {

        const dateInput =
            document.querySelector("#bookingDate");


        /* Data mínima = hoje */

        if (dateInput) {

            const today =
                new Date();

            const year =
                today.getFullYear();

            const month =
                String(
                    today.getMonth() + 1
                ).padStart(2, "0");

            const day =
                String(
                    today.getDate()
                ).padStart(2, "0");


            dateInput.min =
                `${year}-${month}-${day}`;

        }


        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .querySelector("#clientName")
                        ?.value
                        .trim();


                const phone =
                    document
                        .querySelector("#clientPhone")
                        ?.value
                        .trim();


                const email =
                    document
                        .querySelector("#clientEmail")
                        ?.value
                        .trim();


                const date =
                    document
                        .querySelector("#bookingDate")
                        ?.value;


                const time =
                    document
                        .querySelector("#bookingTime")
                        ?.value;


                const service =
                    document
                        .querySelector("#service")
                        ?.value;


                const message =
                    document
                        .querySelector("#bookingMessage")
                        ?.value
                        .trim();


                if (
                    !name ||
                    !phone ||
                    !email ||
                    !date ||
                    !time ||
                    !service
                ) {

                    showBookingStatus(
                        "Preencha todos os campos obrigatórios.",
                        "error"
                    );

                    return;

                }


                const booking = {

                    id: generateId(),

                    name: name,

                    phone: phone,

                    email: email,

                    date: date,

                    time: time,

                    service: service,

                    message: message,

                    status: "Pendente",

                    createdAt:
                        new Date().toISOString()

                };


                const bookings =
                    getBookings();


                bookings.push(
                    booking
                );


                saveBookings(
                    bookings
                );


                bookingForm.reset();


                showBookingStatus(
                    "Pedido de marcação enviado com sucesso!",
                    "success"
                );


                /*
                 * Futuramente podemos ligar este formulário
                 * diretamente ao WhatsApp, e-mail ou servidor.
                 */

            }
        );

    }


    /* =====================================================
       8. BOTÕES DE MARCAÇÃO
    ===================================================== */

    document
        .querySelectorAll('a[href="#marcacao"]')
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setTimeout(() => {

                        const nameInput =
                            document.querySelector(
                                "#clientName"
                            );


                        if (nameInput) {

                            nameInput.focus();

                        }

                    }, 700);

                }
            );

        });


    /* =====================================================
       9. BOTÕES DE CLIENTE
    ===================================================== */

    document
        .querySelectorAll("[data-client-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.clientAction;

                    handleClientAction(
                        action
                    );

                }
            );

        });


    /* =====================================================
       10. LOGIN DO CLIENTE
    ===================================================== */

    const clientLogin =
        document.querySelector(
            "#client-login"
        );


    if (clientLogin) {

        clientLogin.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    document
                        .querySelector(
                            "#client-email"
                        )
                        ?.value
                        .trim();


                const password =
                    document
                        .querySelector(
                            "#client-password"
                        )
                        ?.value;


                if (
                    !email ||
                    !password
                ) {

                    showMessage(
                        "Preencha o email e a palavra-passe.",
                        "error"
                    );

                    return;

                }


                const clients =
                    getClients();


                const client =
                    clients.find(
                        item =>
                            item.email
                                .toLowerCase() ===
                            email.toLowerCase() &&
                            item.password ===
                            password
                    );


                if (!client) {

                    showMessage(
                        "Email ou palavra-passe incorretos.",
                        "error"
                    );

                    return;

                }


                localStorage.setItem(
                    "delaine_logged_client",
                    JSON.stringify(client)
                );


                showMessage(
                    "Login efetuado com sucesso!",
                    "success"
                );


                setTimeout(() => {

                    window.location.href =
                        "cliente.html";

                }, 700);

            }
        );

    }


    /* =====================================================
       11. REGISTO DO CLIENTE
    ===================================================== */

    const clientRegister =
        document.querySelector(
            "#client-register"
        );


    if (clientRegister) {

        clientRegister.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .querySelector(
                            "#register-name"
                        )
                        ?.value
                        .trim();


                const email =
                    document
                        .querySelector(
                            "#register-email"
                        )
                        ?.value
                        .trim();


                const phone =
                    document
                        .querySelector(
                            "#register-phone"
                        )
                        ?.value
                        .trim();


                const password =
                    document
                        .querySelector(
                            "#register-password"
                        )
                        ?.value;


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !password
                ) {

                    showMessage(
                        "Preencha todos os campos.",
                        "error"
                    );

                    return;

                }


                const clients =
                    getClients();


                const exists =
                    clients.some(
                        client =>
                            client.email
                                .toLowerCase() ===
                            email.toLowerCase()
                    );


                if (exists) {

                    showMessage(
                        "Este email já está registado.",
                        "error"
                    );

                    return;

                }


                const newClient = {

                    id: generateId(),

                    name,

                    email,

                    phone,

                    password,

                    createdAt:
                        new Date().toISOString()

                };


                clients.push(
                    newClient
                );


                localStorage.setItem(
                    "delaine_clients",
                    JSON.stringify(clients)
                );


                showMessage(
                    "Conta criada com sucesso!",
                    "success"
                );


                clientRegister.reset();


                setTimeout(() => {

                    window.location.href =
                        "cliente-login.html";

                }, 800);

            }
        );

    }


    /* =====================================================
       12. LOGOUT CLIENTE
    ===================================================== */

    document
        .querySelectorAll(
            "[data-client-logout]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "delaine_logged_client"
                    );


                    window.location.href =
                        "index.html";

                }
            );

        });


    /* =====================================================
       13. LOGIN ADMINISTRADOR
    ===================================================== */

    const adminLogin =
        document.querySelector(
            "#admin-login"
        );


    if (adminLogin) {

        adminLogin.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const username =
                    document
                        .querySelector(
                            "#admin-username"
                        )
                        ?.value
                        .trim();


                const password =
                    document
                        .querySelector(
                            "#admin-password"
                        )
                        ?.value;


                /*
                 * ATENÇÃO:
                 * Este login é apenas frontend.
                 * Para segurança real é necessário
                 * um backend.
                 */

                const ADMIN_USER =
                    "admin";


                const ADMIN_PASSWORD =
                    "Delaine@2026";


                if (
                    username === ADMIN_USER &&
                    password === ADMIN_PASSWORD
                ) {

                    localStorage.setItem(
                        "delaine_admin_logged",
                        "true"
                    );


                    showMessage(
                        "Acesso autorizado!",
                        "success"
                    );


                    setTimeout(() => {

                        window.location.href =
                            "admin.html";

                    }, 600);

                } else {

                    showMessage(
                        "Credenciais de administrador inválidas.",
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       14. PROTEGER PAINEL ADMIN
    ===================================================== */

    const adminPanel =
        document.querySelector(
            "[data-admin-panel]"
        );


    if (adminPanel) {

        const logged =
            localStorage.getItem(
                "delaine_admin_logged"
            );


        if (logged !== "true") {

            window.location.href =
                "admin-login.html";

            return;

        }


        loadAdminDashboard();

    }


    /* =====================================================
       15. LOGOUT ADMIN
    ===================================================== */

    document
        .querySelectorAll(
            "[data-admin-logout]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "delaine_admin_logged"
                    );


                    window.location.href =
                        "admin-login.html";

                }
            );

        });


    /* =====================================================
       16. ATUALIZAR ADMIN
    ===================================================== */

    const refreshAdmin =
        document.querySelector(
            "[data-refresh-admin]"
        );


    if (refreshAdmin) {

        refreshAdmin.addEventListener(
            "click",
            loadAdminDashboard
        );

    }


    /* =====================================================
       17. CONTADORES
    ===================================================== */

    updateBookingCounters();

});


/* =========================================================
   FUNÇÕES
========================================================= */


/* =========================================================
   GERAR ID
========================================================= */

function generateId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


/* =========================================================
   MARCAÇÕES
========================================================= */

function getBookings() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "delaine_bookings"
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveBookings(bookings) {

    localStorage.setItem(
        "delaine_bookings",
        JSON.stringify(bookings)
    );

}


/* =========================================================
   CLIENTES
========================================================= */

function getClients() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "delaine_clients"
            )
        ) || [];

    } catch {

        return [];

    }

}


/* =========================================================
   ALTERAR ESTADO DA MARCAÇÃO
========================================================= */

function updateBookingStatus(
    id,
    status
) {

    const bookings =
        getBookings();


    const booking =
        bookings.find(
            item => item.id === id
        );


    if (!booking) {
        return;
    }


    booking.status =
        status;


    saveBookings(
        bookings
    );


    showMessage(
        `Marcação marcada como "${status}".`,
        "success"
    );

}


/* =========================================================
   APAGAR MARCAÇÃO
========================================================= */

function deleteBooking(id) {

    const confirmed =
        confirm(
            "Tem a certeza que deseja eliminar esta marcação?"
        );


    if (!confirmed) {
        return;
    }


    const bookings =
        getBookings()
            .filter(
                booking =>
                    booking.id !== id
            );


    saveBookings(
        bookings
    );


    showMessage(
        "Marcação eliminada.",
        "success"
    );

}


/* =========================================================
   PAINEL ADMIN
========================================================= */

function loadAdminDashboard() {

    const bookings =
        getBookings();


    const total =
        document.querySelector(
            "[data-total-bookings]"
        );


    const pending =
        document.querySelector(
            "[data-pending-bookings]"
        );


    const confirmed =
        document.querySelector(
            "[data-confirmed-bookings]"
        );


    const cancelled =
        document.querySelector(
            "[data-cancelled-bookings]"
        );


    if (total) {

        total.textContent =
            bookings.length;

    }


    if (pending) {

        pending.textContent =
            bookings.filter(
                item =>
                    item.status ===
                    "Pendente"
            ).length;

    }


    if (confirmed) {

        confirmed.textContent =
            bookings.filter(
                item =>
                    item.status ===
                    "Confirmada"
            ).length;

    }


    if (cancelled) {

        cancelled.textContent =
            bookings.filter(
                item =>
                    item.status ===
                    "Cancelada"
            ).length;

    }


    const table =
        document.querySelector(
            "[data-bookings-table]"
        );


    if (!table) {
        return;
    }


    if (bookings.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="8">
                    Ainda não existem marcações.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        bookings
            .slice()
            .reverse()
            .map(booking => {

                const safeId =
                    escapeHTML(
                        booking.id
                    );


                const statusClass =
                    String(
                        booking.status || ""
                    )
                    .toLowerCase()
                    .replace(/\s+/g, "-");


                return `

                    <tr>

                        <td>
                            ${escapeHTML(
                                booking.name
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.phone
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.email ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.service
                            )}
                        </td>

                        <td>
                            ${formatDate(
                                booking.date
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                booking.time ||
                                "-"
                            )}
                        </td>

                        <td>

                            <span
                                class="status status-${statusClass}"
                            >
                                ${escapeHTML(
                                    booking.status
                                )}
                            </span>

                        </td>

                        <td>

                            ${escapeHTML(
                                booking.message ||
                                "-"
                            )}

                        </td>

                        <td>

                            <div class="admin-actions">

                                <button
                                    type="button"
                                    data-booking-id="${safeId}"
                                    data-booking-status="Confirmada"
                                >
                                    Confirmar
                                </button>


                                <button
                                    type="button"
                                    data-booking-id="${safeId}"
                                    data-booking-status="Cancelada"
                                >
                                    Cancelar
                                </button>


                                <button
                                    type="button"
                                    data-delete-booking="${safeId}"
                                >
                                    Eliminar
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            })
            .join("");


    /* Botões de estado */

    table
        .querySelectorAll(
            "[data-booking-status]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    updateBookingStatus(
                        button.dataset.bookingId,
                        button.dataset.bookingStatus
                    );


                    loadAdminDashboard();

                }
            );

        });


    /* Botões eliminar */

    table
        .querySelectorAll(
            "[data-delete-booking]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteBooking(
                        button.dataset.deleteBooking
                    );


                    loadAdminDashboard();

                }
            );

        });

}


/* =========================================================
   CONTADORES
========================================================= */

function updateBookingCounters() {

    const bookings =
        getBookings();


    const total =
        document.querySelector(
            "[data-total-bookings]"
        );


    const pending =
        document.querySelector(
            "[data-pending-bookings]"
        );


    const confirmed =
        document.querySelector(
            "[data-confirmed-bookings]"
        );


    const cancelled =
        document.querySelector(
            "[data-cancelled-bookings]"
        );


    if (total) {

        total.textContent =
            bookings.length;

    }


    if (pending) {

        pending.textContent =
            bookings.filter(
                item =>
                    item.status ===
                    "Pendente"
            ).length;

    }


    if (confirmed) {

        confirmed.textContent =
            bookings.filter(
                item =>
                    item.status ===
                    "Confirmada"
            ).length;

    }


    if (cancelled) {

        cancelled.textContent =
            bookings.filter(
                item =>
                    item.status ===
                    "Cancelada"
            ).length;

    }

}


/* =========================================================
   ÁREA DO CLIENTE
========================================================= */

function handleClientAction(
    action
) {

    switch (action) {

        case "login":

            window.location.href =
                "cliente-login.html";

            break;


        case "register":

            window.location.href =
                "cliente-registo.html";

            break;


        case "profile":

            window.location.href =
                "cliente.html";

            break;


        case "book":

            window.location.href =
                "index.html#marcacao";

            break;


        case "logout":

            localStorage.removeItem(
                "delaine_logged_client"
            );


            window.location.href =
                "index.html";

            break;

    }

}


/* =========================================================
   MENSAGEM GERAL
========================================================= */

function showMessage(
    message,
    type = "success"
) {

    let messageBox =
        document.querySelector(
            ".site-message"
        );


    if (!messageBox) {

        messageBox =
            document.createElement(
                "div"
            );


        messageBox.className =
            "site-message";


        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        message;


    messageBox.className =
        `site-message ${type}`;


    setTimeout(() => {

        messageBox.classList.add(
            "hide"
        );

    }, 3500);

}


/* =========================================================
   MENSAGEM DO FORMULÁRIO
========================================================= */

function showBookingStatus(
    message,
    type
) {

    const status =
        document.querySelector(
            "#bookingMessageStatus"
        );


    if (!status) {

        showMessage(
            message,
            type
        );

        return;

    }


    status.textContent =
        message;


    status.className =
        `form-status ${type}`;


    setTimeout(() => {

        status.textContent =
            "";

        status.className =
            "form-status";

    }, 5000);

}


/* =========================================================
   FORMATAR DATA
========================================================= */

function formatDate(date) {

    if (!date) {
        return "-";
    }


    const parts =
        date.split("-");


    if (parts.length !== 3) {
        return date;
    }


    return (
        `${parts[2]}/${parts[1]}/${parts[0]}`
    );

}


/* =========================================================
   SEGURANÇA BÁSICA HTML
========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}