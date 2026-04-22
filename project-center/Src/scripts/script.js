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
        threshold: 0.2
    });

    elementos.forEach(el => observer.observe(el));
}

export function coresProjetosFerramentas() {
    const listas = document.querySelectorAll('.projectFerramentas li');

    listas.forEach(lista => {
        // Usamos textContent para pegar o texto e includes() para verificar a palavra
        const texto = lista.textContent.toLocaleLowerCase().trim();

        if (texto.includes('html')) {
            lista.style.backgroundColor = '#C2185B'; // red
        }
        else if (texto.includes('css')) {
            lista.style.backgroundColor = '#3498DB'; // Usei o rosa/vinho do seu print
        }
        else if (texto.includes('javascript') || texto.includes('js')) {
            lista.style.backgroundColor = '#F1C40F'; // Amarelo
        }

        // Garante que o texto fique legível (branco) se o fundo for escuro
        lista.style.color = 'white';
    });
}

export function expandirCertificado() {
    console.log('clique detectado')
    const certificado = document.querySelector("#certificadoImg")
    const modal = document.querySelector("#modalCertificado")
    const fechar = document.querySelector("#fecharModal")

    // abrir modal
    certificado.addEventListener("click", function () {
        modal.style.display = "flex"
    })

    // fechar modal
    fechar.addEventListener("click", function () {
        modal.style.display = "none"
    })

    // fechar clicando fora da imagem
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none"
        }
    })
}
