// TzStudio Portfolio - Полный файл JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('TzStudio Portfolio загружен - Неоново-зеленый дизайн');
    
    initNavigation();
    initPortfolio();
    initModal();
    initMenuToggle();
    initContactLinks();
    animateCounters();
    initScrollAnimations();
    initParallax();
    initPricingAnimations();
    initCalculator();
    initNeonEffects();
});

// Инициализация неоновых эффектов
function initNeonEffects() {
    console.log('Инициализация неоновых эффектов');
    
    // Добавляем эффект свечения к неоновым элементам
    const neonElements = document.querySelectorAll('.logo-icon, .nav-link.active, .stat-number, .total-price, .btn-primary, .btn-order');
    
    neonElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 12px rgba(46, 125, 50, 0.7))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
    
    // Эффект пульсации для заголовков
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        setInterval(() => {
            title.style.textShadow = '0 0 20px rgba(46, 125, 50, 0.5)';
            setTimeout(() => {
                title.style.textShadow = '0 0 15px rgba(46, 125, 50, 0.3)';
            }, 500);
        }, 3000);
    });
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс со всех ссылок
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.style.animation = 'none';
                setTimeout(() => {
                    l.style.animation = '';
                }, 10);
            });
            
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Получаем целевой раздел
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Плавная прокрутка к разделу
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Закрываем мобильное меню если оно открыто
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
            
            // Возвращаем иконку бургера
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
                this.style.color = 'var(--primary-light)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                this.style.transform = 'rotate(0)';
                this.style.color = '';
            }
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const toggleIcon = toggle.querySelector('i');
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
            toggle.style.transform = 'rotate(0)';
            toggle.style.color = '';
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const targetText = counter.textContent;
        const target = parseInt(targetText);
        const increment = target / 30;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 40);
            } else {
                counter.textContent = targetText;
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
                
                // Добавляем неоновый эффект при появлении
                if (entry.target.classList.contains('feature') || 
                    entry.target.classList.contains('contact-card') ||
                    entry.target.classList.contains('portfolio-item')) {
                    
                    entry.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(46, 125, 50, 0.4)';
                    setTimeout(() => {
                        entry.target.style.boxShadow = '';
                    }, 1000);
                }
                
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
        '.about-content, .pricing-table, .pricing-note, .calc-step, ' +
        '.calculator-result, .hero-stats'
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
    
    // Эффекты для выделенных элементов
    const featuredItems = document.querySelectorAll('.price-item.featured');
    featuredItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
            this.style.boxShadow = '0 0 15px rgba(46, 125, 50, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
            this.style.boxShadow = '';
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
            
            // Добавляем неоновый эффект при клике
            this.style.boxShadow = '0 0 25px rgba(46, 125, 50, 0.6)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 500);
            
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
        color: ${type === 'success' ? '#ffffff' : 'white'};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3), 0 0 10px rgba(46, 125, 50, 0.4);
        z-index: 3000;
        animation: notificationSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 700;
        max-width: 350px;
        cursor: pointer;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        border: 1px solid ${type === 'success' ? 'var(--primary-light)' : '#ff6b6b'};
    `;
    
    const contentStyle = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
    `;
    
    notification.querySelector('.notification-content').style.cssText = contentStyle;
    
    document.body.appendChild(notification);
    
    // Закрытие по клику
    notification.addEventListener('click', function() {
        this.style.animation = 'notificationSlideOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            if (this.parentNode) {
                document.body.removeChild(this);
            }
        }, 400);
    });
    
    // Эффекты при наведении
    notification.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(46, 125, 50, 0.5)';
    });
    
    notification.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3), 0 0 10px rgba(46, 125, 50, 0.4)';
    });
    
    // Автоматическое закрытие через 4 секунды
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
        { id: 1, name: "Магический спавн", desc: "Спавн, с элементами фиолетовой магии с использованием средневекового стиля", tags: ["Спавн", "Интерьер"], image: "1.png" },
        { id: 2, name: "Нефтяная вышка", desc: "Нефтяная платформа с обилием детализированных декораций и технических элементов", tags: ["Детализированный", "Индустриальная"], image: "2.png" },
        { id: 3, name: "Песочный спавн", desc: "Детализированный песочный спавн, с нотками старых веков", tags: ["Спавн", "Детализированный"], image: "3.png" },
        { id: 4, name: "Средневековый замок", desc: "Величественный замок с высокими башнями, окруженный большими деревьями", tags: ["Средневековье"], image: "4.png" },
        { id: 5, name: "Фэнтези спавн", desc: "Фэнтезийный спавн с яркими зданиями, красочными крышами и небольшими горами вокруг", tags: ["Спавн", "Фэнтези"], image: "5.png" },
        { id: 6, name: "Итальянский спавн", desc: "Спавн в итальянском стиле с характерными зданиями, терраформингом и небольшими деревьями", tags: ["Спавн", "Терраформинг"], image: "6.png" },
        { id: 7, name: "Зеленый холм", desc: "Холм, окруженный водой, с горами по краям", tags: ["Горы"], image: "7.png" },
        { id: 8, name: "Подземелье RPG", desc: "Детализированное модовое RPG-подземелье с множеством комнат и проработанным интерьером", tags: ["Интерьер", "Детализированный"], image: "8.png" },
        { id: 9, name: "Подземелье с аметистовым сердцем", desc: "Детализированное RPG-подземелье с центральным элементом - аметистовым сердцем", tags: ["Подземелье", "Интерьер", "Фэнтези"], image: "9.png" },
        { id: 10, name: "Весенние острова", desc: "Спавн на левитирующих островах с весенней атмосферой и цветущими деревьями", tags: ["Спавн", "Фэнтези"], image: "10.png" },
        { id: 11, name: "Детализированный игровой остров", desc: "Остров с детализированными проходами и локациями, созданный для мини-игр", tags: ["Детализированный", "Для мини-игр"], image: "11.png" },
        { id: 12, name: "Деревня в горах", desc: "Небольшая деревня, затерянная среди гигантских горных хребтов", tags: ["Город"], image: "12.png" },
        { id: 13, name: "Постройка из God of War", desc: "Реплика или вдохновленная вселенной God of War постройка", tags: ["Детализированный"], image: "13.png" },
        { id: 14, name: "Песочный город", desc: "Город, построенный из блоков красного песка и песчаника", tags: ["Город", "Детализированный"], image: "14.png" },
        { id: 15, name: "Средневековая комната", desc: "Детализированный комната в средневековом стиле", tags: ["Интерьер", "Средневековье", "Детализированный"], image: "15.png" },
        { id: 16, name: "Королевский зал", desc: "Величественный тронный или банкетный зал с украшенными столбами, декором и длинным коридором", tags: ["Средневековье", "Детализированный"], image: "16.png" },
        { id: 17, name: "Средневековый спавн", desc: "Классический средневековый спавн, с нотками оранжевого оттенка", tags: ["Средневековье", "Детализированный", "150х150"], image: "17.png" },
        { id: 18, name: "Средневековый спавн", desc: "Превосходный спавн в стиле средневековье с качественной проработкой ландшафта", tags: ["Средневековье", "Детализированный", "500x500"], image: "18.png" },
        { id: 19, name: "Европейский спавн", desc: "Величественный стартовый остров в европейском средневековом стиле с детализированной архитектурой, доками и ландшафтом.", tags: ["Европейский", "Детализированный", "150х150"], image: "19.png" },
        { id: 20, name: "Средневековая комната 'HUB'", desc: "Уютное стартовое помещение в каменном стиле с статуьями, ценностями и движущимися платформами.", tags: ["Средневековье", "Детализированный", "75x75"], image: "20.png" },
        { id: 21, name: "Атлантида: Затонувший квартал", desc: "Рой призрачных подводных домиков, опутанных светящимися кораллами и мерцающими фонарями, хранит тишину морских глубин.", tags: ["Подводный", "Детализированный", "Атлантический"], image: "21.png" }
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
                         onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"250\" viewBox=\"0 0 400 250\"><rect width=\"400\" height=\"250\" fill=\"%23111111\"/><rect width=\"400\" height=\"50\" y=\"200\" fill=\"%231a1a1a\"/><text x=\"200\" y=\"120\" font-family=\"Inter\" font-size=\"22\" fill=\"%232e7d32\" text-anchor=\"middle\" font-weight=\"700\">${item.name}</text><text x=\"200\" y=\"230\" font-family=\"Inter\" font-size=\"14\" fill=\"%23a5d6a7\" text-anchor=\"middle\">Нажмите для просмотра</text></svg>'">
                </div>
                <div class="portfolio-info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="portfolio-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            // Открытие модального окна при клике
            portfolioItem.addEventListener('click', () => openModal(item));
            
            // Эффекты при наведении
            portfolioItem.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
                this.style.transform = 'translateY(-10px) scale(1.03)';
                this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 20px rgba(46, 125, 50, 0.4)';
            });
            
            portfolioItem.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
                this.style.transform = 'translateY(-10px) scale(1)';
                this.style.boxShadow = '';
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Добавляем анимации появления
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
        if (e.target === modal || e.target.classList.contains('.modal-image-container')) {
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
        this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23111111"/><rect width="800" height="80" y="520" fill="%231a1a1a"/><text x="400" y="300" font-family="Inter" font-size="32" fill="%232e7d32" text-anchor="middle" font-weight="700">${item.name}</text><text x="400" y="350" font-family="Inter" font-size="18" fill="%23a5d6a7" text-anchor="middle">${item.desc}</text><text x="400" y="570" font-family="Inter" font-size="16" fill="%231b5e20" text-anchor="middle">Изображение: ${item.image}</text></svg>`;
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

// КАЛЬКУЛЯТОР С АВТОМАТИЧЕСКИМ РАСЧЕТОМ
function initCalculator() {
    console.log('Калькулятор инициализирован - Автоматический расчет');
    
    // Цены для спавна
    const spawnPrices = {
        100: 1250,
        200: 2500,
        300: 4250,
        400: 5500,
        500: 6750,
        600: 8000,
        700: 9250,
        800: 10500,
        900: 11750,
        1000: 13000
    };
    
    // Цены для хаба (60% от спавна)
    const hubPrices = {
        100: 750,
        200: 1500,
        300: 2250,
        400: 3000,
        500: 3750,
        600: 4500,
        700: 5250,
        800: 6000,
        900: 6750,
        1000: 7500
    };
    
    // Цены для других проектов (на основе другого)
    const otherPrices = {
        100: 1750,
        200: 3500,
        300: 5250,
        400: 7000,
        500: 8750,
        600: 10500,
        700: 12250,
        800: 14000,
        900: 15750,
        1000: 17500
    };
    
    // Переменные калькулятора
    let calculatorData = {
        type: 'spawn',
        style: 'easy',
        size: 100,
        basePrice: 1250,
        sizePrice: 1250,
        styleMultiplier: 1,
        totalPrice: 1250
    };
    
    // Элементы калькулятора
    const typeOptions = document.querySelectorAll('.type-option');
    const styleOptions = document.querySelectorAll('.style-option');
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const orderBtn = document.getElementById('orderBtn');
    
    // Удаляем кнопку "Рассчитать стоимость" из DOM
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.style.display = 'none';
        calculateBtn.remove();
    }
    
    // Элементы отображения
    const sizeValue = document.getElementById('sizeValue');
    const sizeInfo = document.getElementById('sizeInfo');
    const calcStatus = document.getElementById('calcStatus');
    
    // Элементы результата
    const resultType = document.getElementById('resultType');
    const resultStyle = document.getElementById('resultStyle');
    const resultSize = document.getElementById('resultSize');
    const resultBasePrice = document.getElementById('resultBasePrice');
    const resultSizePrice = document.getElementById('resultSizePrice');
    const resultMultiplier = document.getElementById('resultMultiplier');
    const resultTotal = document.getElementById('resultTotal');
    
    // Шаги калькулятора
    const calcSteps = document.querySelectorAll('.calc-step');
    
    // Инициализация калькулятора
    function initCalculatorValues() {
        updateSizeDisplay(calculatorData.size);
        updateSizePrice();
        calculatePrice();
        updateResultDisplay();
        
        // Устанавливаем статус как "АВТО"
        if (calcStatus) {
            calcStatus.textContent = 'АВТО';
            calcStatus.style.background = 'var(--gradient)';
            calcStatus.style.boxShadow = '0 0 15px rgba(46, 125, 50, 0.6)';
            calcStatus.style.color = '#ffffff';
        }
    }
    
    // Функция автоматического расчета
    function autoCalculate() {
        calculatePrice();
        updateResultDisplay();
        
        // Анимация итоговой цены
        if (resultTotal) {
            resultTotal.style.animation = 'none';
            setTimeout(() => {
                resultTotal.style.animation = 'pricePulse 2s ease-in-out';
            }, 10);
        }
    }
    
    // Обработчики выбора типа
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            calculatorData.type = this.dataset.type;
            calculatorData.basePrice = parseInt(this.dataset.base);
            
            updateSizePrice();
            activateStep(1);
            autoCalculate();
        });
    });
    
    // Обработчики выбора сложности
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            styleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            calculatorData.style = this.dataset.style;
            calculatorData.styleMultiplier = parseFloat(this.dataset.multiplier);
            
            activateStep(2);
            autoCalculate();
        });
    });
    
    // Обработчик слайдера размера
    if (sizeSlider) {
        sizeSlider.addEventListener('input', function() {
            const size = parseInt(this.value);
            calculatorData.size = size;
            
            updateSizePrice();
            updateSizeDisplay(size);
            
            sizeButtons.forEach(btn => {
                if (parseInt(btn.dataset.size) === size) {
                    if (!btn.classList.contains('active')) {
                        btn.classList.add('active');
                    }
                } else {
                    btn.classList.remove('active');
                }
            });
            
            autoCalculate();
        });
    }
    
    // Обработчики кнопок размера
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const size = parseInt(this.dataset.size);
            calculatorData.size = size;
            
            updateSizePrice();
            
            if (sizeSlider) {
                sizeSlider.value = size;
            }
            
            updateSizeDisplay(size);
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            autoCalculate();
        });
    });
    
    // Обработчик кнопки заказа
    if (orderBtn) {
        orderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = `Здравствуйте! Хочу заказать проект в TzStudio.\n\n` +
                          `Рассчитанные параметры:\n` +
                          `• Тип: ${getTypeName(calculatorData.type)}\n` +
                          `• Сложность: ${getStyleName(calculatorData.style)}\n` +
                          `• Размер: ${calculatorData.size}×${calculatorData.size} блоков\n` +
                          `• Примерная стоимость: ${calculatorData.totalPrice.toLocaleString()}₽\n\n` +
                          `Хочу обсудить детали проекта.`;
            
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://t.me/t1xelz?text=${encodedMessage}`, '_blank');
        });
    }
    
    // Функция активации шага
    function activateStep(stepIndex) {
        calcSteps.forEach((step, index) => {
            if (index < stepIndex) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === stepIndex) {
                step.classList.add('active');
                step.classList.remove('completed');
                
                if (window.innerWidth < 768) {
                    step.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Функция обновления цены для текущего размера
    function updateSizePrice() {
        let priceTable;
        
        switch(calculatorData.type) {
            case 'spawn': priceTable = spawnPrices; break;
            case 'hub': priceTable = hubPrices; break;
            case 'other': priceTable = otherPrices; break;
            default: priceTable = spawnPrices;
        }
        
        calculatorData.sizePrice = priceTable[calculatorData.size] || spawnPrices[100];
    }
    
    // Функция обновления отображения размера
    function updateSizeDisplay(size) {
        if (sizeValue) sizeValue.textContent = `${size}×${size}`;
        if (sizeInfo) {
            sizeInfo.textContent = size === 100 ? 'базовый размер' : `в ${(size/100).toFixed(0)} раза больше`;
        }
    }
    
    // Функция расчета цены
    function calculatePrice() {
        calculatorData.totalPrice = Math.round(
            calculatorData.sizePrice * calculatorData.styleMultiplier
        );
    }
    
    // Функция обновления отображения результата
    function updateResultDisplay() {
        if (resultType) resultType.textContent = getTypeName(calculatorData.type);
        if (resultStyle) resultStyle.textContent = `${getStyleName(calculatorData.style)}`;
        if (resultSize) resultSize.textContent = `${calculatorData.size}×${calculatorData.size} блоков`;
        if (resultBasePrice) resultBasePrice.textContent = `${calculatorData.basePrice.toLocaleString()}₽`;
        if (resultSizePrice) resultSizePrice.textContent = `${calculatorData.sizePrice.toLocaleString()}₽`;
        if (resultMultiplier) resultMultiplier.textContent = `×${calculatorData.styleMultiplier}`;
        if (resultTotal) resultTotal.textContent = `${calculatorData.totalPrice.toLocaleString()}₽`;
    }
    
    // Вспомогательные функции
    function getTypeName(type) {
        const types = { 'spawn': 'Спавн', 'hub': 'Хаб', 'other': 'Другой проект' };
        return types[type] || 'Неизвестный тип';
    }
    
    function getStyleName(style) {
        const styles = { 'easy': 'Лёгкая', 'medium': 'Средняя', 'hard': 'Высокая' };
        return styles[style] || 'Неизвестная сложность';
    }
    
    // Инициализация
    initCalculatorValues();
    
    // Автоматический пересчет при любом изменении
    document.addEventListener('input', function(e) {
        if (e.target.id === 'sizeSlider') autoCalculate();
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.type-option, .style-option, .size-btn')) {
            setTimeout(() => autoCalculate(), 50);
        }
    });
}

// Инициализация плавной прокрутки для всех якорных ссылок
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

// Добавление стилей для анимаций
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
    
    @keyframes modalContentAppear {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
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
            box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.4);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(46, 125, 50, 0);
        }
    }
    
    .notification {
        cursor: pointer;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
    }
    
    .notification:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 8px 25px rgba(0,0,0,0.4), 0 0 20px rgba(46, 125, 50, 0.4) !important;
    }
`;
document.head.appendChild(style);

// Запускаем анимацию загрузки
window.addEventListener('load', function() {
    console.log('Сайт полностью загружен');
    
    // Добавляем эффект появления для всего контента
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
    
    // Показываем уведомление о загрузке
    setTimeout(() => {
        showNotification('TzStudio - Студия строительства Minecraft загружена!', 'success');
    }, 1000);
});

// Обработка ошибок загрузки изображений
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Ошибка загрузки изображения:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.style.filter = 'grayscale(100%)';
        
        // Показываем альтернативный контент
        if (!e.target.hasAttribute('data-error-handled')) {
            e.target.setAttribute('data-error-handled', 'true');
            
            const parent = e.target.parentElement;
            if (parent && parent.classList.contains('portfolio-image-container')) {
                const itemName = parent.nextElementSibling?.querySelector('h3')?.textContent || 'Проект';
                e.target.alt = `Изображение ${itemName} не загружено`;
            }
        }
    }
}, true);
