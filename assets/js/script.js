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

function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const calcDV = (base) => {
      let soma = 0;
      let peso = base.length - 7;
      for (let i = 0; i < base.length; i++) {
        soma += base[i] * peso--;
        if (peso < 2) peso = 9;
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const base = cnpj.substring(0, 12).split('').map(Number);
    const dv1 = calcDV(base);
    const dv2 = calcDV([...base, dv1]);

    return dv1 === parseInt(cnpj[12]) && dv2 === parseInt(cnpj[13]);
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

        console.log(valor);

        if (valor.length === 18) {
            const valido = isValidCNPJ(valor);
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

function openConsultaCnpj() {
    const cnpj = document.getElementById("cnpj").value;
    const cnpjLimpo = cnpj.replace(/[.\-\/]/g, "");

    // Armazena para a próxima página (opcional)
    localStorage.setItem("cnpjDigitado", cnpjLimpo);

    window.location.href = "consulta-cnpj.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const cnpjLimpo = localStorage.getItem("cnpjDigitado");

    if (cnpjLimpo) {
        searchCnpj(cnpjLimpo);
    }
});


function searchCnpj(cnpjLimpo) {
    document.getElementById("razao-social").textContent = "Consultando...";

    fetch(`http://localhost:8080/api/cnpj/${cnpjLimpo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("CNPJ não encontrado ou erro na consulta");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("razao-social").textContent = data.razaoSocial;
        })
        .catch(error => {
            console.error("Erro ao consultar o CNPJ:", error);
        });
}



function iniciar() {
    bordaMenu();
}

iniciar();
