// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('main section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});

// Print functionality
const printBtn = document.createElement('button');
printBtn.textContent = 'Print Resume';
printBtn.style.position = 'fixed';
printBtn.style.bottom = '20px';
printBtn.style.right = '20px';
printBtn.style.padding = '10px 20px';
printBtn.style.background = '#1e3a8a';
printBtn.style.color = 'white';
printBtn.style.border = 'none';
printBtn.style.borderRadius = '6px';
printBtn.style.cursor = 'pointer';
printBtn.onclick = () => window.print();
document.body.appendChild(printBtn);

// Fake course links - alert for demo
document.querySelectorAll('a[href^="#course"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Course details would open here (placeholder). This demonstrates the hyperlink functionality.');
    });
});