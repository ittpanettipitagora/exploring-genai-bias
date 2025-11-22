document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIONE MENU MOBILE ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- 2. GESTIONE SCROLL NAVBAR (Indispensabile per leggere il menu) ---
    const navbar = document.getElementById('mainNav');

    function checkScroll() {
        // Se l'elemento navbar non esiste (es. in altre pagine), esce dalla funzione
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Aggiunge sfondo scuro
        } else {
            navbar.classList.remove('scrolled'); // Torna trasparente
        }
    }

    // Controlla quando scorri
    window.addEventListener('scroll', checkScroll);
    // Controlla anche appena carichi la pagina
    checkScroll();


    // --- 3. EFFETTO TYPEWRITER (Macchina da scrivere) ---
    const textElement = document.getElementById('typewriter');
    
    // Le tue parole specifiche
    const words = ["an architect.", "a lawyer.", "a teacher."];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100; // Velocità di scrittura iniziale

    function type() {
        // Controllo se l'elemento esiste per evitare errori
        if (!textElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Cancella carattere per carattere
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Cancella più veloce
        } else {
            // Scrive carattere per carattere
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Scrive a velocità normale
        }

        // Logica di cambio stato
        if (!isDeleting && charIndex === currentWord.length) {
            // Parola finita: aspetta un po' prima di cancellare
            isDeleting = true;
            typeSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            // Cancellazione finita: passa alla prossima parola
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Piccola pausa prima di riscrivere
        }

        setTimeout(type, typeSpeed);
    }

    // Avvia l'effetto
    type();
});