function openIndexHTML() {
    window.location.href = "index.html";
}

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
                document.getElementById('withoutCNPJ').style.display = 'none';
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
            document.getElementById('withoutCNPJ').style.display = 'none';
        }
    });
});

function formateCapitalSocial(valor) {
    let [inteiro, decimal] = valorStr.split('.');

    // Garante exatamente duas casas decimais
    if (!decimal) {
        decimal = '00';
    } else if (decimal.length === 1) {
        decimal += '0';
    } else if (decimal.length > 2) {
        decimal = decimal.slice(0, 2);
    }

    // Insere pontos de milhar na parte inteira
    let reverso = inteiro.split('').reverse();
    let partes = [];

    for (let i = 0; i < reverso.length; i += 3) {
        partes.push(reverso.slice(i, i + 3).reverse().join(''));
    }

    let inteiroFormatado = partes.reverse().join('.');

    // Retorna valor formatado como moeda brasileira
    return 'R$ ' + inteiroFormatado + ',' + decimal;
  }

function validateCNPJ() {
    const cnpjInput = document.getElementById('cnpj');

    let valor = cnpjInput.value.replace(/\D/g, '');

    if (valor === "") {
        document.getElementById('withoutCNPJ').style.display = 'flex';
        return;
    } else if(!isValidCNPJ(valor)) {
        return
    } else {
        openConsultaCnpj();
    }
}


function openConsultaCnpj() {
    const cnpj = document.getElementById("cnpj").value;
    const cnpjLimpo = cnpj.replace(/[.\-\/]/g, "");

    
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

    fetch(`http://localhost:8080/api/cnpj/${cnpjLimpo}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById('popup-errocnpj').style.display = 'flex';
                throw new Error("CNPJ não encontrado ou erro na consulta");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("razao-social").textContent = data.razaoSocial;
            document.getElementById("situacao").textContent = data.situacaoCadastral;
            document.getElementById("natureza").textContent = data.naturezaJuridica;
            document.getElementById("email").textContent = data.email;
            document.getElementById("nome-fantasia").textContent = data.nomeFantasia;
            document.getElementById("data-abertura").textContent = data.dataAbertura;
            document.getElementById("capital-social").textContent = "R$" + data.capitalSocial;
            document.getElementById("telefone").textContent = data.telefone;
            document.getElementById("logradouro").textContent = data.logradouro;
            document.getElementById("complemento").textContent = data.complemento;
            document.getElementById("municipio").textContent = data.municipio;
            document.getElementById("cep").textContent = data.cep;
            document.getElementById("numero").textContent = data.numero;
            document.getElementById("bairro").textContent = data.bairro;
            document.getElementById("uf").textContent = data.uf;
            document.getElementById("text-cnae-principal").textContent = data.cnaePrincipal;
            document.getElementById("cnae-secundario1").textContent = data.cnaeSecundario1;
            document.getElementById("cnae-secundario2").textContent = data.cnaeSecundario2;
            document.getElementById('popup-consultacnpj').style.display = 'none';
        })
        .catch(error => {
            console.error("Erro ao consultar o CNPJ:", error);
        });
}

async function processXml() {
    const input = document.getElementById("arquivo");
    const file = input.files[0];

    if (!file) {
      alert("Selecione um arquivo XML.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
      const xmlContent = event.target.result;

      try {
        const response = await fetch("https://ws.meudanfe.com/api/v1/get/nfe/xmltodanfepdf/API", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: xmlContent
        });

        if (!response.ok) {
          throw new Error("Erro ao gerar o DANFe. Verifique o XML enviado.");
        }

        const base64PDF = await response.text();
        const pdfBase64Clean = base64PDF.replace(/^"|"$/g, "");

        const pdfWindow = window.open();
        pdfWindow.document.write(
          `<iframe width='100%' height='100%' src='data:application/pdf;base64,${pdfBase64Clean}'></iframe>`
        );
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao gerar o DANFe.");
      }
    };

    reader.readAsText(file);
}

function iniciar() {
    bordaMenu();
}

iniciar();
