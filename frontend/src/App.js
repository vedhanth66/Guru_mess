import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Custom hook for scroll animations
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref} className="counter">{count}{suffix}</span>;
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#health' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      data-testid="navigation"
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'bg-leaf-600' : 'bg-white'
            }`}>
              <img
                src="/Icon.png" 
                alt="Matha Shree Annapoorneswari Mess Logo"
                className="h-12 w-12 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-display font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>Matha Shree Annapoorneswari Mess</h1>
              <p className={`text-xs transition-colors duration-300 ${
                isScrolled ? 'text-leaf-600' : 'text-white/80'
              }`}>Traditional South Indian</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-leaf-600' : 'text-white hover:text-white/80'
                }`}
              >
                {link.name}
              </a>
            ))}
            {/* Reserve Table button REMOVED */}
          </div>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-button"
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-leaf-600' : isScrolled ? 'bg-gray-800' : 'bg-white'
              }`}></span>
              <span className={`w-full h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : isScrolled ? 'bg-gray-800' : 'bg-white'
              }`}></span>
              <span className={`w-full h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-leaf-600' : isScrolled ? 'bg-gray-800' : 'bg-white'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          data-testid="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-leaf-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {/* Mobile Reserve Table button REMOVED */}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section 
      id="home" 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full floating-element"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full floating-element-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/10 rounded-full floating-element"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-white/10 rounded-full floating-element-delayed"></div>
      </div> */}

      {/* Decorative leaf patterns */}
      <div className="absolute inset-0 leaf-pattern opacity-30"></div>

      <div 
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="text-white font-medium">🌿 Pure Veg • Fresh • Healthy</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-orange mb-6 leading-tight">
          Matha Shree
          <span className="block text-red/90">Annapoorneswari Mess</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-light">
          Experience the authentic taste of traditional South Indian cuisine served on fresh banana leaves. 
          <span className="font-semibold"> Unlimited meals, unlimited love.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a href="#menu" className="btn-secondary pulse-ring">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View Menu
            </span>
          </a>
          {/* Reserve Table button REMOVED */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: 5, suffix: '+', label: 'Years of Excellence'},
            { number: 100, suffix: '%', label: 'Pure Ingredients' },
            { number: 10000, suffix: '+', label: 'Happy Customers' },
            { number: 25, suffix: '+', label: 'Daily Dishes' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="about" data-testid="about-section" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-leaf-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/Gem_1.png"
                alt="Traditional South Indian Banana Leaf Meal"
                className="rounded-2xl shadow-2xl w-full object-cover h-96 lg:h-[500px]"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-leaf-500 rounded-2xl -z-10"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-teal-400 rounded-2xl -z-10"></div>
            
            {/* Experience badge */}
            {/* <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-xl p-6 z-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-leaf-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍃</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-leaf-600">15+</p>
                  <p className="text-gray-600 text-sm">Years of Excellence</p>
                </div>
              </div>
            </div> */}
          </div>

          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-leaf-100 rounded-full">
              <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            </div>
            
            <h2 className="section-title">
              Where Tradition Meets
              <span className="gradient-text block">Wholesome Health</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              At <strong>Matha Shree Annapoorneswari Mess</strong>, we believe that good food is the foundation of good health. 
              Nestled in the heart of Hoskote, Bengaluru, our humble mess has been serving authentic 
              South Indian cuisine the way it was meant to be — pure, fresh, and made with love.
            </p>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Every meal we serve is a celebration of Karnataka's rich culinary heritage. From our 
              grandmother's recipes to the freshest ingredients sourced locally, we bring you an 
              experience that feels just like home.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: '🍃', text: 'Farm Fresh Ingredients' },
                { icon: '🏠', text: 'Homely Atmosphere' },
                { icon: '♻️', text: 'Eco-Friendly Practices' },
                { icon: '❤️', text: 'Made with Love' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Health Benefits Section
const HealthSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const healthFeatures = [
    {
      icon: '🍯',
      title: 'Pure Jaggery, No Sugar',
      description: 'All our sweets and desserts are made with organic jaggery, which is rich in iron and minerals. No refined sugar ever touches our kitchen.',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
    },
    {
      icon: '🥥',
      title: 'Cold-Pressed Oils Only',
      description: 'We use only cold-pressed groundnut oil. No palm oil, just pure, heart-healthy traditional oils.',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: '🌾',
      title: 'No Preservatives',
      description: 'Everything is freshly prepared daily. No artificial preservatives, no frozen ingredients — just pure, fresh food made from scratch.',
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-50',
    },
    {
      icon: '🍚',
      title: 'Traditional Grains',
      description: 'We serve nutritious Ragi Mudde and other traditional millets daily. Rich in calcium, fiber, and essential amino acids.',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: '🥬',
      title: 'Fresh Vegetables Daily',
      description: 'All vegetables are procured fresh from local farmers every morning. No cold storage, no old produce — always crisp and nutritious.',
      color: 'from-lime-400 to-green-500',
      bgColor: 'bg-lime-50',
    },
    {
      icon: '🧈',
      title: 'Pure Ghee & Butter',
      description: 'Our ghee is churned in-house from fresh cream. No adulteration, no hydrogenated fats — just the golden goodness of pure dairy.',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <section id="health" data-testid="health-section" className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-leaf-100 rounded-full mb-6">
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          </div>
          <h2 className="section-title">
            Health is Our
            <span className="gradient-text"> Priority</span>
          </h2>
          <p className="section-subtitle mt-4">
            We're not just serving food, we're nurturing your health with every bite. 
            Here's what makes us different from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
              
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              
              <div className={`absolute bottom-0 right-0 w-24 h-24 ${feature.bgColor} rounded-tl-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Additional Health Promise Banner */}
        <div className={`mt-16 bg-gradient-to-r from-leaf-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="absolute inset-0 leaf-pattern opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Our Promise to You
            </h3>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Every single ingredient that enters our kitchen is carefully selected. 
              We cook food the way your grandmother would — with patience, love, and the purest ingredients. 
              No shortcuts, no compromises.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {['Zero MSG', 'No Artificial Colors', 'Handmade Daily', 'Local Sourcing'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Menu Section
const MenuSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState('meals');

  const menuCategories = {
    meals: {
      title: 'Unlimited Meals',
      items: [
        {
          name: 'Traditional Banana Leaf Ragi Mudde Meals',
          description: 'Complete South Indian meal with Ragi mudde(Ragi ball), 4 types of palya, 2 types sambar, 2 types of curry, 2 types of sweet(completely made of jaggery), rice, rasam, curd, Buttermilk, pickle, papad, Bajji/Bonda',
          highlight: 'Highly nutritious',
          price: 'Unlimited',
        },
        {
          name: 'Traditional Banana Leaf chapathi Meals',
          description: 'Complete South Indian meal with chapathi, 4 types of palya, 2 types sambar, 2 types of curry, 2 types of sweet(completely made of jaggery), rice, rasam, curd, Buttermilk, pickle, papad, Bajji/Bonda',
          highlight: 'Highly energetic',
          price: 'Unlimited',
        },
        {
          name: 'Breakfast',
          description: 'Idly-sambar, poori-saagu, upma, Vada, 1-Rice-item(Changes daily)',
          highlight: 'Perfect way to start the day',
          price: 'Unlimited',
        },
        {
          name: 'Rice Varieties',
          description: 'Bisi Bele Bath, Puliyogare, Chitranna, Pongal, Vegetable Biryani, Soya Biryani, Ghee Rice, Rice Bath',
          highlight: 'Changes Daily',
          price: 'Unlimited',
        },
      ],
    },
    accompaniments: {
      title: 'Side Dishes',
      items: [
        {
          name: 'Sambar',
          description: 'Traditional vegetable sambar with freshly ground spices and seasonal vegetables',
          highlight: 'Farm Fresh',
        },
        {
          name: 'Rasam',
          description: 'Tangy, aromatic rasam made with tamarind, tomatoes, and traditional spices',
          highlight: 'Digestive',
        },
        {
          name: 'Varieties of pallya',
          description: 'Vegetable based curries and pallya, changes daily',
          highlight: 'Protein Rich',
        },
        {
          name: 'Fresh Chutneys',
          description: 'Coconut, tomato, and groundnut chutneys freshly prepared',
          highlight: 'Made Fresh',
        },
        {
          name: 'Fritters',
          description: 'Tasty and healthy snack, changes daily',
          highlight: 'Healthy and tasty',
        },
      ],
    },
    sweets: {
      title: 'Jaggery Sweets',
      items: [
        {
          name: 'Jaggery Payasam',
          description: 'Traditional rice kheer made with organic jaggery and pure ghee',
          highlight: '100% Jaggery',
        },
        {
          name: 'Obbattu / Holige',
          description: 'Sweet flatbread stuffed with jaggery and chana dal filling',
          highlight: 'Festival Special',
        },
        {
          name: 'Jaggery Laddu',
          description: 'Handmade laddus with roasted gram and jaggery',
          highlight: 'No Sugar',
        },
        {
          name: 'Kesari Bath',
          description: 'Semolina sweet dish made with ghee and jaggery',
          highlight: 'Pure Ghee',
        },
        {
          name: 'Jalebi/Jahangir',
          description: 'Traditional Indian sweet dish made with ghee and jaggery',
          highlight: 'Pure Jaggery',
        },
      ],
    },
    beverages: {
      title: 'Refreshments',
      items: [
        {
          name: 'Filter Coffee',
          description: 'Authentic South Indian filter coffee with fresh milk',
          highlight: 'Traditional Brew',
        },
        {
          name: 'Majjige (Buttermilk)',
          description: 'Cooling spiced buttermilk, perfect after meals',
          highlight: 'Probiotic',
        },
        {
          name: 'Fresh Juice',
          description: 'Made with rock sugar or jaggery, no refined sugar',
          highlight: 'Nutritious',
        },
        {
          name: 'Masala Chai',
          description: 'Traditional spiced tea with fresh milk and jaggery',
          highlight: 'Immunity Boost',
        },
      ],
    },
  };

  return (
    <section id="menu" data-testid="menu-section" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-leaf-100 rounded-full mb-6">
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">Our Menu</span>
          </div>
          <h2 className="section-title">
            Taste the
            <span className="gradient-text"> Tradition</span>
          </h2>
          <p className="section-subtitle mt-4">
            Every dish is prepared fresh daily with love and the finest ingredients. 
            Our menu changes with the seasons to bring you the best.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(menuCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-leaf-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {menuCategories[category].title}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuCategories[activeCategory].items.map((item, index) => (
            <div
              key={index}
              className="menu-card relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-leaf-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.highlight && (
                      <span className="px-3 py-1 bg-leaf-100 text-leaf-700 text-xs font-semibold rounded-full">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {item.price && (
                  <div className="text-right">
                    <span className="text-lg font-bold text-leaf-600">{item.price}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-amber-50 px-6 py-4 rounded-2xl border border-amber-200">
            <span className="text-2xl">📝</span>
            <p className="text-amber-800 font-medium">
              Menu items rotate daily to bring you variety and the freshest seasonal produce.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const galleryImages = [
    { 
      src: '/Chat_1.png',
      alt: 'Traditional Banana Leaf Meals',
      span: 'col-span-2 row-span-2'
    },
    { 
      src: '/Dosa.jpg', 
      alt: 'South Indian Dosa',
      span: 'col-span-1'
    },
    { 
      src: '/Idli.jpg', 
      alt: 'Idli',
      span: 'col-span-1'
    },
    { 
      src: '/Coffee.jpg', 
      alt: 'Filter Coffee',
      span: 'col-span-1 row-span-2'
    },
    { 
      src: 'Sweet.jpg', 
      alt: 'Jaggery Sweet',
      span: 'col-span-1 row-span-2'
    },
    { 
      src: 'Traditional_cooking.jpg', 
      alt: 'Traditional Fresh Ingredients',
      span: 'col-span-1'
    },
    { 
      src: 'Obattu.jpg', 
      alt: 'Obbattu',
      span: 'col-span-1'
    },
  ];

  return (
    <section id="gallery" data-testid="gallery-section" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-leaf-100 rounded-full mb-6">
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">Gallery</span>
          </div>
          <h2 className="section-title">
            A Feast for
            <span className="gradient-text"> Your Eyes</span>
          </h2>
          <p className="section-subtitle mt-4">
            Take a visual journey through our kitchen and discover the beauty of traditional South Indian cuisine.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.span} img-container group rounded-2xl overflow-hidden shadow-lg ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms`, transition: 'all 0.6s ease-out' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Raghavendra K.',
      role: 'Regular Customer',
      text: 'The taste of sambar here reminds me of my mother\'s cooking. Authentic, fresh, and made with love. The fact that they use only jaggery for sweets shows their commitment to health.',
      rating: 5,
    },
    {
      name: 'Jhanvi',
      role: 'Food Blogger',
      text: 'Finally, a place that serves real South Indian food! The ragi mudde is incredible, and knowing there are no preservatives makes every bite guilt-free. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Sumanth',
      role: 'Local Businessman',
      text: 'I\'ve been coming here for years. The unlimited meals concept with such quality is unmatched. My whole family loves the homely atmosphere and healthy food.',
      rating: 5,
    },
    {
      name: 'Lakshmi Narayana',
      role: 'Senior Citizen',
      text: 'At my age, I need food that\'s easy to digest and healthy. Matha Shree Annapoorneswari Mess provides exactly that. The traditional recipes and pure ingredients keep me coming back.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" data-testid="testimonials-section" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="leaf-pattern w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-leaf-100 rounded-full mb-6">
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="section-title">
            What Our Guests
            <span className="gradient-text"> Say</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 transition-all duration-500 ${
                  index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-light italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                    <p className="text-leaf-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-leaf-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Connect to the actual backend on port 8001
      const response = await fetch('http://localhost:8001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-4 py-2 bg-leaf-100 rounded-full mb-6">
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          </div>
          <h2 className="section-title">
            Visit Us
            <span className="gradient-text"> Today</span>
          </h2>
          <p className="section-subtitle mt-4">
            We'd love to serve you authentic South Indian meals. Come experience the warmth of home-cooked food.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-leaf-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Address</p>
                    <p className="text-gray-600">After Toll Gate, Sy 77/a, Taluk, above Allen Solly, 3rd floor, Doddaammanikere, Hoskote, Bengaluru, Karnataka 562114</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-leaf-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+91 9972212522</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-leaf-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Operating Hours</p>
                    <p className="text-gray-600">Monday - Sunday</p>
                    <p className="text-gray-600">Breakfast: 7:00 AM - 11:30 AM</p>
                    <p className="text-gray-600">Lunch: 12:30 PM - 4:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-leaf-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">kumar.jayantha43@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100 overflow-hidden">
              <iframe
                title="Matha Shree Annapoorneswari Mess Location"
                // Working embed URL
                src="https://maps.google.com/maps?q=Shree+Guru+Mess+Hoskote+Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          {/* <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                  required
                  data-testid="contact-name-input"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                  data-testid="contact-email-input"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                  data-testid="contact-phone-input"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="How can we help you?"
                  required
                  data-testid="contact-message-input"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit-button"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-leaf-100 text-leaf-700 rounded-xl text-center font-medium">
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#health' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer data-testid="footer" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-leaf-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-white">श्री</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">Matha Shree Annapoorneswari Mess</h3>
                <p className="text-gray-400 text-sm">Traditional South Indian Restaurant</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Serving authentic South Indian cuisine on banana leaves since generations. 
              Experience the taste of tradition with our health-conscious, preservative-free meals.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Code... (No changes needed here) */}
              {['instagram'].map((social) => (
                <a
                  key={social}
                  href="https://www.instagram.com/shree.annapoorneshwari.mess/"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-leaf-600 transition-colors duration-300"
                >
                  <span className="sr-only">{social}</span>
                   {/* ... (SVG content) ... */}
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                   </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-leaf-500 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h4 className="text-lg font-bold mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <span className="text-white">Breakfast</span>
                <p>7:00 AM - 11:30 AM</p>
              </li>
              <li>
                <span className="text-white">Lunch</span>
                <p>12:00 PM - 4:30 PM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Matha Shree Annapoorneswari Mess. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with ❤️ in Hoskote, Bengaluru
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <HealthSection />
      <MenuSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;