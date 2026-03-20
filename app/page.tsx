"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const TepahLogo = ({ scale = 1 }: { scale?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: `${18 * scale}px`, textDecoration: 'none' }}>
    <img
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9t16mBlrRsQeZkBps27TxH2ODKEflB.png"
      alt="Tepah Logo Emblem"
      style={{ height: `${46 * scale}px`, width: `${46 * scale}px`, borderRadius: "50%", objectFit: "cover", boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: `${28 * scale}px`, letterSpacing: `${12 * scale}px`, color: 'var(--dark)', lineHeight: '1', fontWeight: 400, transform: `translateX(${6 * scale}px)` }}>
        TEPAH
      </span>
      <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: `${10 * scale}px`, letterSpacing: `${6 * scale}px`, color: 'var(--secondary)', marginTop: `${6 * scale}px`, transform: `translateX(${3 * scale}px)` }}>
        BY THE BAGH
      </span>
    </div>
  </div>
);

const testimonialsData = [
  {
    name: "Sarah Jenkins", role: "Food Critic", avatar: "https://i.pravatar.cc/150?img=33",
    quote: "An absolute culinary masterpiece. The ambiance, the service, and the flavors are unmatched by anything else in the city."
  },
  {
    name: "James Larson", role: "Entrepreneur", avatar: "https://i.pravatar.cc/150?img=11",
    quote: "Tepah transcends standard dining. Every dish is artfully crafted, and the atmosphere feels effortlessly exclusive and incredibly welcoming."
  },
  {
    name: "Michael Chen", role: "Local Guide", avatar: "https://i.pravatar.cc/150?img=68",
    quote: "The handcrafted cocktails are phenomenal. A true sanctuary for those who appreciate the finer things and an immersive evening."
  },
  {
    name: "Emily Ross", role: "Lifestyle Blogger", avatar: "https://i.pravatar.cc/150?img=44",
    quote: "Honestly the best dining experience I've had all year. The attention to detail in everything from the plating to the decor is incredible."
  },
  {
    name: "David Hoffman", role: "Culinary Expert", avatar: "https://i.pravatar.cc/150?img=53",
    quote: "The specialty bakes in the morning to the fine plates at night—the execution here is flawless. A true hidden gem in Amritsar."
  },
  {
    name: "Anita Patel", role: "Architect", avatar: "https://i.pravatar.cc/150?img=41",
    quote: "The interior design alone is worth the visit. Pairing such a breathtaking environment with world-class food creates a perfect harmony."
  },
  {
    name: "Samuel Wright", role: "Connoisseur", avatar: "https://i.pravatar.cc/150?img=59",
    quote: "Their mixologists are true artists. I've tasted cocktails around the world, and the bespoke menu here completely blew me away."
  },
  {
    name: "Chloe Summers", role: "Event Coordinator", avatar: "https://i.pravatar.cc/150?img=47",
    quote: "Hosted a private dinner here and the staff was impeccable. It felt deeply intimate and exclusive. Will definitely return."
  }
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && cardsRef.current[0]) {
      const cardWidth = cardsRef.current[0].offsetWidth;
      const gap = 20;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev: number) => {
        const next = prev === testimonialsData.length - 1 ? 0 : prev + 1;
        if (cardsRef.current[next] && scrollRef.current) {
          const card = cardsRef.current[next];
          const container = scrollRef.current;
          const scrollPos = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
          container.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerCenter = container.scrollLeft + container.offsetWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(containerCenter - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex', gap: '20px', overflowX: 'auto', scrollSnapType: 'x mandatory',
    padding: '40px calc(50% - 225px)', scrollbarWidth: 'none', msOverflowStyle: 'none',
    alignItems: 'center'
  };

  const btnStyle: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px',
    borderRadius: '50%', background: 'var(--surface)', border: '1px solid rgba(212, 175, 55, 0.4)',
    color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', zIndex: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
  };

  return (
    <section id="testimonials" className="section-padding" style={{ borderTop: "var(--border)", background: "var(--bg)", position: 'relative', overflow: 'hidden' }}>
      <div className="section-header" style={{ marginBottom: '25px' }}>
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">What Our Guests Say</h2>
      </div>

      <a
        href="https://www.google.com/search?q=Tepah+by+The+Bagh+Amritsar#lrd=0x391965a25852cc47:0xf8c0daa54ad3c675,3,,,,"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block', maxWidth: '800px', margin: '0 auto 40px auto', padding: '0 20px', width: '100%' }}
      >
        <div
          style={{ backgroundColor: '#1e1e1e', borderRadius: '12px', padding: '16px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', border: '1px solid #333', transition: 'background-color 0.2s', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#252525'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e1e1e'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'system-ui, sans-serif' }}>
              <span style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>
                <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
              </span>
              <span>Reviews</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', fontFamily: 'system-ui, sans-serif' }}>4.8</span>
              <div style={{ color: '#FBBC05', fontSize: '18px', letterSpacing: '2px', lineHeight: 1 }}>★★★★★</div>
              <span style={{ color: '#888', fontSize: '14px', fontFamily: 'system-ui, sans-serif' }}>(39)</span>
            </div>
          </div>

          <div style={{ background: '#d4af37', color: '#000', padding: '10px 24px', borderRadius: '24px', fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Rate us on Google
          </div>
        </div>
      </a>

      <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
        <button onClick={() => scroll('left')} className="scroll-btn left" style={{ ...btnStyle, left: '20px' }}>
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => scroll('right')} className="scroll-btn right" style={{ ...btnStyle, right: '20px' }}>
          <ChevronRight size={24} />
        </button>

        <div className="testimonial-carousel hide-scrollbar" ref={scrollRef} style={containerStyle}>
          <style dangerouslySetInnerHTML={{
            __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />
          {testimonialsData.map((t, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="testimonial-card"
                style={{
                  flex: '0 0 auto', width: '85%', maxWidth: '450px', scrollSnapAlign: 'center',
                  background: isActive ? 'var(--surface)' : 'rgba(20,20,20,0.3)',
                  border: isActive ? '1px solid rgba(212, 175, 55, 0.5)' : '1px solid rgba(138, 125, 90, 0.2)',
                  borderRadius: '12px', padding: '50px 40px', textAlign: 'center', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', minHeight: isActive ? '460px' : '410px',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 15px 35px rgba(0,0,0,0.8)' : 'none',
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1.05)' : 'scale(0.95)',
                  zIndex: isActive ? 2 : 1
                }}
              >
                <div style={{ color: 'var(--primary)', fontSize: '24px', letterSpacing: '5px', marginBottom: '25px' }}>★★★★★</div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '20px', fontStyle: 'italic', color: 'var(--dark)', marginBottom: '30px', flexGrow: 1, lineHeight: 1.6 }}>"{t.quote}"</p>
                <div style={{ marginBottom: '15px' }}>
                  <img src={t.avatar} alt="Reviewer" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: isActive ? '2px solid rgba(212, 175, 55, 0.8)' : '2px solid transparent', transition: 'border 0.5s' }} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--dark)', marginBottom: '5px' }}>{t.name}</h4>
                <span style={{ fontSize: '12px', color: 'rgba(201, 184, 150, 0.7)', letterSpacing: '2px', textTransform: 'uppercase' }}>{t.role}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentMenuPage, setCurrentMenuPage] = useState(0);

  const menuImages = [
    "/menu/1-cover.png",
    "/menu/2-soups-salads.png",
    "/menu/3-veg.png",
    "/menu/4-nonveg.png",
    "/menu/5-pasta.png"
  ];

  return (
    <>
      <header className="header">
        <div className="logo">
          <TepahLogo scale={1} />
        </div>
        <nav>
          <a href="#menu" onClick={(e) => { e.preventDefault(); setIsMenuOpen(true); setCurrentMenuPage(0); }}>Menu</a>
          <a href="#about">About Us</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="https://wa.me/919056775282?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Tepah%20by%20The%20Bagh" target="_blank" rel="noopener noreferrer">
          <button className="btn-cta">Reservations</button>
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">Welcome to</p>
            <h1 className="hero-title">
              Tepah <span>by</span>
              <br />
              The Bagh
            </h1>
            <p className="hero-description">
              A culinary sanctuary where global flavors meet artisan craft. Experience our curated selection of
              specialty coffee, fresh bakes, international cuisine, and handcrafted cocktails.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" onClick={(e) => { e.preventDefault(); setIsMenuOpen(true); setCurrentMenuPage(0); }}>
                <button className="btn-cta" style={{ background: "var(--primary)", color: "#000", border: 'none' }}>
                  View Menu
                </button>
              </a>
              <a href="https://wa.me/919056775282?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Tepah%20by%20The%20Bagh" target="_blank" rel="noopener noreferrer">
                <button className="btn-cta">
                  Reserve a Table
                </button>
              </a>
            </div>
            <div className="hero-info">
              <div className="hero-info-item">
                <span className="hero-info-label">Location</span>
                <span className="hero-info-value">D-Block, Ranjit Avenue</span>
              </div>
              <div className="hero-info-item">
                <span className="hero-info-label">Hours</span>
                <span className="hero-info-value">Everyday 12PM - 1AM</span>
              </div>
              <div className="hero-info-item">
                <span className="hero-info-label">Contact</span>
                <span className="hero-info-value">+91 90567 75282</span>
              </div>
            </div>
          </div>
          <div className="hero-img" style={{ backgroundImage: "none", position: "relative", overflow: "hidden" }}>
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-PbFuY5xAH3D7x1FEIs0n44bEnjEjW2.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0
              }}
            />
            <div className="rating-badge" style={{ zIndex: 10 }}>
              <span className="rating-stars">★★★★★</span>
              <span className="rating-text">4.5 on Google</span>
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; ✦ Coffee ✦ Bakes ✦ Global Plates ✦ Cocktails ✦ Dine-In ✦ Takeaway ✦ Delivery ✦ Coffee ✦ Bakes ✦ Global Plates ✦ Cocktails ✦ Dine-In ✦ Takeaway ✦ Delivery
          </div>
        </div>

        <section id="menu" className="section-padding">
          <div className="section-header">
            <span className="section-label">Our Offerings</span>
            <h2 className="section-title">{"Chef's Recommendations"}</h2>
          </div>

          <div className="menu-grid">
            <div className="menu-card">
              <span className="menu-tag">Signature</span>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rzri0uO8IwzHOYqWgs1cnAJwbnKsov.png"
                alt="Gourmet baked French toast with premium toppings"
              />
              <div className="menu-card-body">
                <div className="flex justify-between items-center mb-2">
                  <h3>Specialty Bakes</h3>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(212, 196, 160, 0.8)", lineHeight: "1.6" }}>
                  Artisan bakes and pastries crafted with premium ingredients and signature finishes.
                </p>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "#6b5b47" }}>
                Popular
              </span>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UM8lQW5YFPVYtI3zuATGKkvAWEV2tv.png"
                alt="Elegantly plated global cuisine with fresh ingredients"
              />
              <div className="menu-card-body">
                <div className="flex justify-between items-center mb-2">
                  <h3>Global Plates</h3>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(212, 196, 160, 0.8)", lineHeight: "1.6" }}>
                  World cuisine reimagined with local ingredients and chef expertise.
                </p>
              </div>
            </div>

            <div className="menu-card">
              <span className="menu-tag" style={{ background: "#8b6914" }}>
                Craft
              </span>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4WRovypJRppstMWDXC4SGtDBdImPOu.png"
                alt="Sophisticated bar with handcrafted cocktails"
              />
              <div className="menu-card-body">
                <div className="flex justify-between items-center mb-2">
                  <h3>Handcrafted Cocktails</h3>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(212, 196, 160, 0.8)", lineHeight: "1.6" }}>
                  Artfully mixed cocktails with premium spirits and fresh ingredients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div>
            <p className="about-label">Our Story</p>
            <h2 className="about-title">Where Culinary Art Meets Ambiance</h2>
            <p className="about-text">
              {"Nestled in the heart of Amritsar's Ranjit Avenue, Tepah by The Bagh offers an elevated dining experience that transcends the ordinary. Our space is designed for those who appreciate the finer things—carefully curated dishes, exceptional service, and an atmosphere that inspires connection."}
            </p>
            <div className="highlights">
              <div className="highlight-item">
                <span className="highlight-icon"></span>
                <span>Dine-In</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon"></span>
                <span>Takeaway</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon"></span>
                <span>Delivery</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon"></span>
                <span>Reservations</span>
              </div>
            </div>
            <a href="https://wa.me/919056775282?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Tepah%20by%20The%20Bagh" target="_blank" rel="noopener noreferrer">
              <button className="btn-cta" style={{ borderColor: "var(--secondary)" }}>
                Make a Reservation
              </button>
            </a>
          </div>
          <div className="about-img"></div>
        </section>

        <Testimonials />

        <section id="gallery" style={{ backgroundColor: '#121212', padding: '0', borderTop: '1px solid #262626' }}>
          {/* Instagram Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '40px', padding: '40px 20px', borderBottom: '1px solid #262626' }}>

            {/* Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9t16mBlrRsQeZkBps27TxH2ODKEflB.png" alt="Tepah" style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #121212', objectFit: 'cover', backgroundColor: '#000' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f5f5f5', margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>Tepah by The Bagh</h3>
                <span style={{ fontSize: '14px', color: '#a8a8a8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>@tepahbythebagh</span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '35px', color: '#f5f5f5', fontFamily: 'system-ui, -apple-system, sans-serif', textAlign: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>142</span>
                <span style={{ fontSize: '14px', color: '#a8a8a8' }}>Posts</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>12.4K</span>
                <span style={{ fontSize: '14px', color: '#a8a8a8' }}>Followers</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>124</span>
                <span style={{ fontSize: '14px', color: '#a8a8a8' }}>Following</span>
              </div>
            </div>

            {/* Follow Button */}
            <a href="https://instagram.com/tepahbythebagh" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif', transition: 'opacity 0.2s', marginLeft: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.5" y1="6.5" y2="6.5" /></svg>
                Follow
              </button>
            </a>
          </div>

          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <div className="insta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', padding: '4px', backgroundColor: '#121212' }}>
              <style dangerouslySetInnerHTML={{
                __html: `
                .insta-item { aspect-ratio: 1; overflow: hidden; position: relative; cursor: pointer; }
                .insta-item img, .insta-item video { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
                .insta-item:hover img, .insta-item:hover video { transform: scale(1.05); filter: brightness(0.8); }
                .insta-icon { position: absolute; top: 10px; right: 10px; color: white; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); z-index: 2; pointer-events: none; }
                @media (max-width: 768px) {
                  .insta-grid { gap: 2px !important; padding: 2px !important; }
                  .insta-icon { top: 5px; right: 5px; transform: scale(0.8); }
                }
              `}} />

              <div className="insta-item">
                <svg className="insta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UM8lQW5YFPVYtI3zuATGKkvAWEV2tv.png" alt="Elegant plated pasta dish" />
              </div>

              <div className="insta-item">
                <svg className="insta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rzri0uO8IwzHOYqWgs1cnAJwbnKsov.png" alt="French toast with decorative toppings" />
              </div>

              <div className="insta-item">
                <svg className="insta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" /></svg>
                <video src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VID_20260320153633-9yQ4aeCohp7yicaX19DzS3076BqinJ.mp4" autoPlay muted loop playsInline />
              </div>

              <div className="insta-item">
                <svg className="insta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-i9aVFMv14kq5uWZGouG8BmoufcO9g3.png" alt="Sophisticated dining space with artistic design" />
              </div>

              <div className="insta-item">
                <svg className="insta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4WRovypJRppstMWDXC4SGtDBdImPOu.png" alt="Elegant bar counter with sculptural details" />
              </div>

              <div className="insta-item">
                <svg className="insta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ftk81Exw5mXvNJMJ8298wJVDiV9UFJ.png" alt="Abstract sculptural architectural detail" />
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="section-padding" style={{ borderTop: "var(--border)" }}>
          <div className="section-header">
            <span className="section-label">Visit Us</span>
            <h2 className="section-title">Location</h2>
          </div>
          <div style={{ width: '100%', height: '450px', borderRadius: '8px', overflow: 'hidden', border: 'var(--border)', boxShadow: 'var(--shadow)', position: 'relative' }}>
            <iframe
              src="https://maps.google.com/maps?q=Tepah+by+The+Bagh+Amritsar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(30%) contrast(100%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div>
          <div className="footer-logo">
            <TepahLogo scale={1.25} />
          </div>
          <p className="footer-description">
            Coffee, Bakes, Global Plates & Cocktails. Your destination for exceptional dining in Amritsar.
          </p>
          <div className="footer-contact">
            <a href="tel:+919056775282">+91 90567 75282</a>
            <a href="https://maps.app.goo.gl/vp22meTyZqc29dVc8" target="_blank" rel="noopener noreferrer">
              Second Floor, SCO 13-14, D-Block<br />
              Ranjit Avenue, Amritsar, Punjab 143001
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#menu" onClick={(e) => { e.preventDefault(); setIsMenuOpen(true); setCurrentMenuPage(0); }}>Menu</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="https://wa.me/919056775282?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Tepah%20by%20The%20Bagh" target="_blank" rel="noopener noreferrer">Reservations</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Hours</h4>
          <ul>
            <li>Monday: 12PM - 1AM</li>
            <li>Tuesday: 12PM - 1AM</li>
            <li>Wednesday: 12PM - 1AM</li>
            <li>Thursday: 12PM - 1AM</li>
            <li>Friday - Sunday: 12PM - 1AM</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© 2025 TEPAH BY THE BAGH</span>
          <span>AMRITSAR, PUNJAB</span>
          <div className="footer-social">
            <a href="https://instagram.com/tepahbythebagh" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://wa.me/919056775282?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table%20at%20Tepah%20by%20The%20Bagh" target="_blank" rel="noopener noreferrer">WHATSAPP</a>
          </div>
        </div>
        <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "var(--border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "rgba(201, 184, 150, 0.8)" }}>
          <span>Created by Agampreet Singh</span>
          <div className="footer-contact" style={{ display: "flex", flexDirection: "row", gap: "20px", marginTop: "10px" }}>
            <a href="https://www.instagram.com/agampreetsingh382/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/agampreet-singh-293807313/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://portfolio-mu-ten-9hwo06aftt.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a>
          </div>
        </div>
      </footer>

      {isMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5, 5, 5, 0.95)', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <button onClick={() => setIsMenuOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', zIndex: 100000 }}>
            <X size={40} />
          </button>

          <div style={{ position: 'relative', width: '100%', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {currentMenuPage > 0 && (
              <button
                onClick={() => setCurrentMenuPage(p => p - 1)}
                style={{ position: 'absolute', left: '20px', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--primary)', borderRadius: '50%', width: '50px', height: '50px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(5px)' }}
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <img
              src={menuImages[currentMenuPage]}
              alt={`Menu Page ${currentMenuPage + 1}`}
              style={{ maxHeight: '100%', maxWidth: '90%', objectFit: 'contain', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', borderRadius: '8px' }}
            />

            {currentMenuPage < menuImages.length - 1 && (
              <button
                onClick={() => setCurrentMenuPage(p => p + 1)}
                style={{ position: 'absolute', right: '20px', background: 'rgba(212, 175, 55, 0.15)', border: '1px solid var(--primary)', borderRadius: '50%', width: '50px', height: '50px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(5px)' }}
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
            {menuImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentMenuPage(i)}
                style={{
                  width: '14px', height: '14px', borderRadius: '50%', padding: 0,
                  background: i === currentMenuPage ? 'var(--primary)' : 'rgba(212, 175, 55, 0.2)',
                  border: i === currentMenuPage ? 'none' : '1px solid rgba(212, 175, 55, 0.5)',
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
