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

document.addEventListener('DOMContentLoaded', function () {
    const codigoInput = document.getElementById('codigoAcesso');
    const inputCodigo = document.querySelector('.inputCodigo');

    codigoInput.addEventListener('input', function () {
        let valor = codigoInput.value.replace(/\D/g, '');

        valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
        codigoInput.value = valor.trim();

        const valorLimpo = valor.replace(/\s/g, '');

        if (valorLimpo.length === 44) {
            const valido = validarCodigoAcesso(valorLimpo);
            if (valido) {
                inputCodigo.classList.remove("borda-padrao");
                inputCodigo.classList.add("borda-verde");
                document.getElementById('invalidCodigo').style.display = 'none';
            } else {
                inputCodigo.classList.remove("borda-padrao");
                inputCodigo.classList.add("borda-vermelha");
                document.getElementById('invalidCodigo').style.display = 'flex';
            }
        } else {
            inputCodigo.classList.add("borda-padrao");
            inputCodigo.classList.remove("borda-vermelha");
            inputCodigo.classList.remove("borda-verde");
            document.getElementById('invalidCodigo').style.display = 'none';
        }
    });
});

function validarCodigoAcesso(codigo) {
    if (!/^\d{44}$/.test(codigo)) return false;

    const numeros = codigo.substring(0, 43).split('').map(Number);
    const dvInformado = parseInt(codigo.charAt(43), 10);

    let peso = 2;
    let soma = 0;

    for (let i = numeros.length - 1; i >= 0; i--) {
        soma += numeros[i] * peso;
        peso = peso < 9 ? peso + 1 : 2;
    }

    const resto = soma % 11;
    const dvCalculado = (resto === 0 || resto === 1) ? 0 : 11 - resto;

    return dvInformado === dvCalculado;
}

document.addEventListener('DOMContentLoaded', function () {
    const cnpjInput = document.getElementById('cnpj');
    const inputCNPJ = document.querySelector('.inputCNPJ');
    

    cnpjInput.addEventListener('input', function () {
        let valor = cnpjInput.value.replace(/\D/g, '');

        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

        cnpjInput.value = valor;

        if (valor.length === 18) {
            const valido = validarCNPJ(valor);
            if (valido) {
                inputCNPJ.classList.remove("borda-padrao");
                inputCNPJ.classList.add("borda-verde");
                document.getElementById('invalidCNPJ').style.display = 'none';
            } else {
                inputCNPJ.classList.remove("borda-padrao");
                inputCNPJ.classList.add("borda-vermelha");
                document.getElementById('invalidCNPJ').style.display = 'flex';
            }
        } else {
            inputCNPJ.classList.add("borda-padrao");
            inputCNPJ.classList.remove("borda-vermelha");
            inputCNPJ.classList.remove("borda-verde");
            document.getElementById('invalidCNPJ').style.display = 'none';
        }
    });
});

function iniciar() {
    bordaMenu();
}

iniciar();
