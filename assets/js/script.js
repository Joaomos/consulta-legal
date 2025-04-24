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





function iniciar() {
    bordaMenu();
}

iniciar();