function bordaMenu() { 
    const menu = document.querySelector('.header');

    document.addEventListener('scroll', () => {
        menu.classList.add('borda-menu');
    }, { once: true });

    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            menu.classList.remove('borda-menu');
            setTimeout(() => {
                document.addEventListener('scroll', () => {
                    menu.classList.add('borda-menu');
                }, { once: true });
            }, 1000);
        }
    });
}

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const calcularDigito = (base, pesos) => {
        let soma = 0;
        for (let i = 0; i < pesos.length; i++) {
            soma += parseInt(base[i]) * pesos[i];
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const base = cnpj.slice(0, 12);
    const digito1 = calcularDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digito2 = calcularDigito(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return cnpj === base + digito1 + digito2;
}

document.addEventListener('DOMContentLoaded', function () {
    const cnpjInput = document.getElementById('cnpj');
    const inputCNPJ = document.querySelector('.inputCNPJ');
    const checkIcon = cnpjInput.nextElementSibling; 
    const warnIcon = checkIcon.nextElementSibling;  

    cnpjInput.addEventListener('input', function () {
        let valor = cnpjInput.value.replace(/\D/g, '');

        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

        cnpjInput.value = valor;

        // Validação e exibição de ícones
        if (valor.length === 18) {
            const valido = validarCNPJ(valor);
            if (valido) {
                checkIcon.style.display = "inline";
                warnIcon.style.display = "none";
                inputCNPJ.classList.remove("borda-padrao");
                inputCNPJ.classList.add("borda-verde");
            } else {
                checkIcon.style.display = "none";
                warnIcon.style.display = "inline";
                inputCNPJ.classList.remove("borda-padrao");
                inputCNPJ.classList.add("borda-vermelha");
            }
        } else {
            checkIcon.style.display = "none";
            warnIcon.style.display = "none";
            inputCNPJ.classList.add("borda-padrao");
            inputCNPJ.classList.remove("borda-vermelha");
            inputCNPJ.classList.remove("borda-verde");
        }
    });
});

function iniciar() {
    bordaMenu();
}

iniciar();
