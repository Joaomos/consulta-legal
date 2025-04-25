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
        };
    });
}

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}
  
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const cnpjInput = document.getElementById('cnpj');
  
    cnpjInput.addEventListener('input', function () {
      let valor = cnpjInput.value.replace(/\D/g, '');
  
      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
  
      cnpjInput.value = valor;
    });
  });

function iniciar() {
    bordaMenu();
}

iniciar();