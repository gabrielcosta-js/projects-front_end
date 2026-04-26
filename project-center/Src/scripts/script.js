export function paginaAtiva() {
    const menuItems = document.querySelectorAll('#botoes-navegacao a');

    menuItems.forEach(item => {
        item.addEventListener('click', () => { // O primeiro for é pra detectar o clique
            menuItems.forEach(i => i.classList.remove('active')); // esse segundo é pra remover de todas as classes de uma vez, após detectar um clique
            item.classList.add('active');
        });
    });
}


export function tema() {
    document.addEventListener("DOMContentLoaded", function () {
        const mudarTema = document.getElementById('mudarTema');
        const sunTema = document.getElementById('sunTema');
        const moonTema = document.getElementById('moonTema');

        sunTema.classList.add('temaDesligado');
        moonTema.classList.add('temaAtivo');

        mudarTema.addEventListener('click', () => {
            const sunAtivo = sunTema.classList.contains('temaAtivo');

            if (sunAtivo) {
                sunTema.classList.remove('temaAtivo');
                sunTema.classList.add('temaDesligado');

                moonTema.classList.remove('temaDesligado');
                moonTema.classList.add('temaAtivo');
            } else {
                sunTema.classList.add('temaAtivo');
                sunTema.classList.remove('temaDesligado');

                moonTema.classList.add('temaDesligado');
                moonTema.classList.remove('temaAtivo');
            }

            // 🔥 SEM IF
            document.body.classList.toggle('light');
        });
    });
}
export function scrollAtivo() {
    const sections = document.querySelectorAll("section");
    const menuItems = document.querySelectorAll("#botoes-navegacao a");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                menuItems.forEach(link => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.2 // porcentagem visível da section
    });

    sections.forEach(section => observer.observe(section));
}
export function animarScroll() {
    const elementos = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("ativo");
            }
        });
    }, {
        threshold: 0.05
    });

    elementos.forEach(el => observer.observe(el));
}

export function coresProjetosFerramentas() {
  const listas = document.querySelectorAll(".projectFerramentas li");

  listas.forEach((lista) => {
    const texto = lista.textContent.toLowerCase().trim();

    if (texto.includes("html")) {
      lista.style.backgroundColor = "#E34F26";
    }

    else if (texto.includes("css")) {
      lista.style.backgroundColor = "#1572B6";
    }

    else if (texto.includes("javascript") || texto.includes("js")) {
      lista.style.backgroundColor = "#F7DF1E";
      lista.style.color = "#000";
    }

    else if (texto.includes("java")) {
      lista.style.backgroundColor = "#5382A1";
    }

    else if (texto.includes("api")) {
      lista.style.backgroundColor = "#9B59B6";
    }

    else if (
      texto.includes("banco") ||
      texto.includes("database") ||
      texto.includes("supabase")
    ) {
      lista.style.backgroundColor = "#2ECC71";
    }

    else if (texto.includes("mobile")) {
      lista.style.backgroundColor = "#16A085";
    }

    else if (
      texto.includes("ia") ||
      texto.includes("inteligência artificial") ||
      texto.includes("yolo")
    ) {
      lista.style.backgroundColor = "#E74C3C";
    }

    else if (texto.includes("vbs")) {
      lista.style.backgroundColor = "#34495E";
    }

    else if (texto.includes("batch")) {
      lista.style.backgroundColor = "#7F8C8D";
    }

    else if (texto.includes("ffmpeg")) {
      lista.style.backgroundColor = "#27AE60";
    }

    else if (texto.includes("rtsp")) {
      lista.style.backgroundColor = "#2980B9";
    }

    else if (texto.includes("controle")) {
      lista.style.backgroundColor = "#D35400";
    }

    else {
      lista.style.backgroundColor = "#555";
    }

    if (!texto.includes("javascript") && !texto.includes("js")) {
      lista.style.color = "white";
    }
  });
}

export function expandirCertificado() {
    const certificados = document.querySelectorAll(".certificadoImg");
    const modal = document.querySelector("#modalCertificado");
    const fechar = document.querySelector("#fecharModal");
    const certificadoGrande = document.querySelector("#certificadoGrande");

    certificados.forEach(certificado => {
        certificado.addEventListener("click", function () {
            certificadoGrande.src = certificado.src;
            modal.style.display = "flex";
        });
    });

    fechar.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

export function menuMobile() {
  const botao = document.querySelector("#menuHamburguer");
  const menu = document.querySelector("#menuMobile");

  botao.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });
}
export function menuMobileFechar() {
  const links = document.querySelectorAll("#menuMobile a");
  const menu = document.querySelector("#menuMobile");

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("ativo");
    });
  });
}
