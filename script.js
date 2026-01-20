document.addEventListener('DOMContentLoaded', function() {
    console.log('TzStudio Portfolio загружен');
    
    initNavigation();
    initPortfolio();
    initModal();
    initMenuToggle();
    initContactLinks();
    animateCounters();
    initScrollAnimations();
    initParallax();
    initPricingAnimations();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.style.animation = 'none';
                setTimeout(() => {
                    l.style.animation = '';
                }, 10);
            });
            
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
            
            const toggle = document.querySelector('.mobile-toggle');
            if (toggle) {
                const icon = toggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                toggle.style.transform = 'rotate(0)';
            }
        });
    });
}

function initMenuToggle() {
    const toggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggle) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                this.style.transform = 'rotate(180deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.style.transform = 'rotate(0)';
            }
        });
    }
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const toggleIcon = toggle.querySelector('i');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
            toggle.style.transform = 'rotate(0)';
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 30;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 40);
            } else {
                counter.textContent = target + '+';
                counter.style.animation = 'pulseCounter 0.5s ease-out';
                setTimeout(() => {
                    counter.style.animation = '';
                }, 500);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '50px'
        });
        
        observer.observe(counter);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('pricing-table')) {
                    const priceItems = entry.target.querySelectorAll('.price-item');
                    priceItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = `priceItemAppear 0.5s ease-out forwards`;
                            item.style.opacity = '1';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll(
        '.portfolio-item, .feature, .contact-card, .section-header, ' +
        '.about-content, .pricing-table, .pricing-note'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function initPricingAnimations() {
    const pricingTables = document.querySelectorAll('.pricing-table');
    
    pricingTables.forEach((table, index) => {
        table.style.animationDelay = `${index * 0.2}s`;
        
        const priceItems = table.querySelectorAll('.price-item');
        priceItems.forEach((item, itemIndex) => {
            item.style.animationDelay = `${(index * 0.2) + (itemIndex * 0.1)}s`;
        });
    });
    
    const featuredItems = document.querySelectorAll('.price-item.featured');
    featuredItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
        });
    });
}

function initContactLinks() {
    console.log('Контактные ссылки инициализированы');
    
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Переход по контактной ссылке:', this.href);
            
            showNotification('Открываем ссылку...', 'success');
        });
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gradient)' : 'linear-gradient(135deg, #ff6b6b, #ee5a52)'};
        color: ${type === 'success' ? '#000000' : 'white'};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: notificationSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 600;
        max-width: 350px;
        cursor: pointer;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    `;
    
    const contentStyle = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    `;
    
    notification.querySelector('.notification-content').style.cssText = contentStyle;
    
    document.body.appendChild(notification);
    
    notification.addEventListener('click', function() {
        this.style.animation = 'notificationSlideOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            if (this.parentNode) {
                document.body.removeChild(this);
            }
        }, 400);
    });
    
    notification.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
    });
    
    notification.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlideOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }
    }, 4000);
}

function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    if (!portfolioGrid) return;
    
    const portfolioItems = [
        { id: 1, name: "Магический спавн", desc: "Спавн, с элементами фиолетовой магии с использованием средневекового стиля", tags: ["Спавн", "Интерьер", "75x75"], image: "1.png" },
        { id: 2, name: "Нефтяная вышка", desc: "Нефтяная платформа с обилием детализированных декораций и технических элементов", tags: ["Детализированный", "Индустриальная"], image: "2.png" },
        { id: 3, name: "Песочный спавн", desc: "Детализированный песочный спавн, с нотками старых веков", tags: ["Спавн", "Детализированный", "125x125"], image: "3.png" },
        { id: 4, name: "Средневековый замок", desc: "Величественный замок с высокими башнями, окруженный большими деревьями", tags: ["Средневековье"], image: "4.png" },
        { id: 5, name: "Фэнтези спавн", desc: "Фэнтезийный спавн с яркими зданиями, красочными крышами и небольшими горами вокруг", tags: ["Спавн", "Фэнтези", "100x100"], image: "5.png" },
        { id: 6, name: "Итальянский спавн", desc: "Спавн в итальянском стиле с характерными зданиями, терраформингом и небольшими деревьями", tags: ["Спавн", "Терраформинг", "150x150"], image: "6.png" },
        { id: 7, name: "Зеленый холм", desc: "Холм, окруженный водой, с горами по краям", tags: ["Горы", "100x100"], image: "7.png" },
        { id: 8, name: "Подземелье RPG", desc: "Детализированное модовое RPG-подземелье с множеством комнат и проработанным интерьером", tags: ["Интерьер", "Детализированный"], image: "8.png" },
        { id: 9, name: "Подземелье с аметистовым сердцем", desc: "Детализированное RPG-подземелье с центральным элементом - аметистовым сердцем", tags: ["Подземелье", "Интерьер", "Фэнтези"], image: "9.png" },
        { id: 10, name: "Весенние острова", desc: "Спавн на левитирующих островах с весенней атмосферой и цветущими деревьями", tags: ["Спавн", "Фэнтези", "75x75"], image: "10.png" },
        { id: 11, name: "Детализированный игровой остров", desc: "Остров с детализированными проходами и локациями, созданный для мини-игр", tags: ["Детализированный", "Для мини-игр"], image: "11.png" },
        { id: 12, name: "Деревня в горах", desc: "Небольшая деревня, затерянная среди гигантских горных хребтов", tags: ["Город"], image: "12.png" },
        { id: 13, name: "Постройка из God of War", desc: "Реплика или вдохновленная вселенной God of War постройка", tags: ["Детализированный", "750x750"], image: "13.png" },
        { id: 14, name: "Песочный город", desc: "Город, построенный из блоков красного песка и песчаника", tags: ["Город", "Детализированный"], image: "14.png" },
        { id: 15, name: "Средневековая комната", desc: "Детализированный комната в средневековом стиле", tags: ["Интерьер", "Средневековье", "Детализированный"], image: "15.png" },
        { id: 16, name: "Королевский зал", desc: "Величественный тронный или банкетный зал с украшенными столбами, декором и длинным коридором", tags: ["Средневековье", "Детализированный"], image: "16.png" },
        { id: 17, name: "Средневековый спавн", desc: "Детализированный комната в средневековом стиле", tags: ["Средневековье", "Детализированный", "150х150"], image: "17.png" },
        { id: 18, name: "Средневековый спавн", desc: "Превосходный спавн в стиле средневековье с качественной проработкой ландшафта", tags: ["Средневековье", "Детализированный", "500x500"], image: "18.png" }
    ];
    
    function displayPortfolioItems() {
        portfolioGrid.innerHTML = '';
        
        portfolioItems.forEach((item, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item animate-on-scroll';
            portfolioItem.style.animationDelay = `${index * 0.1}s`;
            
            portfolioItem.innerHTML = `
                <div class="portfolio-image-container">
                    <img src="images/${item.image}" alt="${item.name}" class="portfolio-image" 
                         onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"250\" viewBox=\"0 0 400 250\"><rect width=\"400\" height=\"250\" fill=\"%231a1a1a\"/><rect width=\"400\" height=\"50\" y=\"200\" fill=\"%232a2a2a\"/><text x=\"200\" y=\"120\" font-family=\"Inter\" font-size=\"22\" fill=\"%237ed07e\" text-anchor=\"middle\" font-weight=\"600\">${item.name}</text><text x=\"200\" y=\"230\" font-family=\"Inter\" font-size=\"14\" fill=\"%23b8d8b8\" text-anchor=\"middle\">Нажмите для просмотра</text></svg>'">
                </div>
                <div class="portfolio-info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            portfolioItem.addEventListener('click', () => openModal(item));
            
            portfolioItem.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            portfolioItem.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
                this.style.transform = 'translateY(-10px) scale(1)';
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        setTimeout(() => {
            const newItems = portfolioGrid.querySelectorAll('.portfolio-item');
            newItems.forEach(item => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            item.classList.add('visible');
                            observer.unobserve(item);
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(item);
            });
        }, 100);
    }
    
    setTimeout(() => {
        displayPortfolioItems();
    }, 800);
}

function initModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    closeBtn.addEventListener('click', function() {
        closeModal();
        this.style.transform = 'rotate(0) scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-image-container')) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function openModal(item) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    
    modalImage.src = `images/${item.image}`;
    modalImage.alt = item.name;
    modalTitle.textContent = item.name;
    modalDescription.textContent = item.desc;
    
    modalTags.innerHTML = '';
    item.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        modalTags.appendChild(tagElement);
    });
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    modal.querySelector('.modal-content').style.animation = 'modalContentAppear 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    modalImage.onload = function() {
        this.classList.add('loaded');
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    };
    
    modalImage.onerror = function() {
        this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%231a1a1a"/><rect width="800" height="80" y="520" fill="%232a2a2a"/><text x="400" y="300" font-family="Inter" font-size="32" fill="%237ed07e" text-anchor="middle" font-weight="600">${item.name}</text><text x="400" y="350" font-family="Inter" font-size="18" fill="%23b8d8b8" text-anchor="middle">${item.desc}</text><text x="400" y="570" font-family="Inter" font-size="16" fill="%238aa88a" text-anchor="middle">Изображение: ${item.image}</text></svg>`;
        this.classList.add('loaded');
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    };
    
    modalImage.style.opacity = '0';
    modalImage.style.transform = 'scale(0.95)';
    setTimeout(() => {
        modalImage.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        modalImage.style.opacity = '1';
        modalImage.style.transform = 'scale(1)';
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.querySelector('.modal-content').style.animation = 'modalContentDisappear 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.querySelector('.modal-content').style.animation = '';
        modalImage.classList.remove('loaded');
    }, 400);
}

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.backgroundPosition = `center ${rate}px`;
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulseCounter {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes notificationSlideIn {
        from {
            opacity: 0;
            transform: translateX(100%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
    }
    
    @keyframes notificationSlideOut {
        from {
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%) translateY(-20px);
        }
    }
    
    @keyframes modalContentDisappear {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
        }
    }
    
    @keyframes priceItemAppear {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes featuredPulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(126, 208, 126, 0.4);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(126, 208, 126, 0);
        }
    }
    
    .notification {
        cursor: pointer;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    }
    
    .notification:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 25px rgba(0,0,0,0.4) !important;
    }
    
    .portfolio-image-container {
        width: 100%;
        height: 250px;
        overflow: hidden;
        position: relative;
    }
    
    .portfolio-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .portfolio-item:hover .portfolio-image {
        transform: scale(1.1);
    }
    
    .price-item.featured {
        animation: featuredPulse 2s infinite;
        position: relative;
    }
`;
document.head.appendChild(style);
