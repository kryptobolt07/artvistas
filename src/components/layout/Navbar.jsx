import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 1, y: 0 });
  const [isPageLoaded, setIsPageLoaded] = useState(false); // New state for page loading
  const hamburgerRef = useRef(null);
  const originalOverflow = useRef(null);
  const location = useLocation();

  const updateMenuPosition = () => {
    if (hamburgerRef.current) {
      const rect = hamburgerRef.current.getBoundingClientRect();
      setMenuPosition({
        x: (rect.left + rect.width/2) / window.innerWidth,
        y: (rect.top + rect.height/2) / window.innerHeight
      });
    }
  };

  // Check if current page has light background
  const isLightBackground = () => {
    const lightBackgroundRoutes = [
      '/gallery',
      '/collections',
      '/artists',
      '/exhibitions',
      '/visit',
      '/virtual-tour'
    ];
    return lightBackgroundRoutes.some(route => 
      location.pathname === route || location.pathname.startsWith(`${route}/`)
    );
  };

  // Reset loading state and menu state on location change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsPageLoaded(false); // Reset loading state
  }, [location]);

  // Simulate page load completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true); // Set to true after wave animation duration
    }, 1200); // Reduced from 1800ms (35% faster)
    
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    checkIfMobile();
    handleScroll();
    
    window.addEventListener("resize", checkIfMobile);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      updateMenuPosition();
      const currentOverflow = document.body.style.overflow;
      if (currentOverflow !== 'hidden') {
        originalOverflow.current = currentOverflow;
        document.body.style.overflow = "hidden";
      }
    } else if (originalOverflow.current !== null) {
      const timer = setTimeout(() => {
        document.body.style.overflow = originalOverflow.current;
        originalOverflow.current = null;
      }, 1200);
      return () => clearTimeout(timer);
    }
    
    return () => {
      if (originalOverflow.current !== null) {
        document.body.style.overflow = originalOverflow.current;
      }
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/virtual-tour", label: "Virtual Tour" },
    { to: "/artists", label: "Artists" },
    { to: "/exhibitions", label: "Exhibitions" },
    { to: "/gallery", label: "Gallery" },
    { to: "/visit", label: "Visit" },
  ];

  const menuEasing = [0.25, 0.8, 0.25, 1];

  const getNavbarClasses = () => {
    const baseClasses = "fixed top-0 left-0 w-full flex justify-between items-center p-6 z-50 transition-all duration-500";
    return `${baseClasses} ${isScrolled ? 'backdrop-blur-sm bg-opacity-10' : 'bg-transparent'}`;
  };

  const isDarkText = isLightBackground() || isScrolled;

  const getTextClasses = (isLogo = false) => {
    const baseLogoClasses = "text-2xl font-bold transition-all";
    const baseLinkClasses = "transition-all";
    
    return isLogo 
      ? `${baseLogoClasses} ${isDarkText ? 'text-gray-900' : 'text-white'} drop-shadow-sm hover:scale-105 transition-transform duration-300` 
      : `${baseLinkClasses} ${isDarkText ? 'text-gray-800 hover:text-black' : 'text-gray-100 hover:text-white'}`;
  };

  const getIndicatorColor = (isActive = false) => {
    return isDarkText 
      ? (isActive ? 'bg-black' : 'bg-gray-400') 
      : (isActive ? 'bg-white' : 'bg-gray-300');
  };

  const waveX = `${menuPosition.x * 100}%`;
  const waveY = `${menuPosition.y * 100}%`;

  // Enhanced animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2 
      } 
    },
    exit: {
      opacity: 0,
      y: -25,
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      } 
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      } 
    }
  };

  const hamburgerLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 7 }
  };

  const hamburgerSecondLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };

  const hamburgerThirdLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -5 }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isPageLoaded && !isMenuOpen && ( // Only show navbar when page is loaded and menu is closed
          <motion.nav 
            key={location.pathname}
            className={getNavbarClasses()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              variants={logoVariants}
              whileHover={{ 
                scale: 1.08,
                filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))",
                transition: { type: "spring", stiffness: 500, damping: 15 }
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className={getTextClasses(true)}>ArtVistas</Link>
            </motion.div>
            
            <ul className={`gap-8 ${isMobile ? 'hidden' : 'flex'}`}>
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.to;
                return (
                  <motion.li 
                    key={link.to}
                    custom={i}
                    variants={navItemVariants}
                    onHoverStart={() => setActiveItem(link.to)}
                    onHoverEnd={() => setActiveItem(null)}
                    whileHover={{ 
                      scale: 1.12, 
                      y: -3,
                      transition: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                    style={{ 
                      originX: 0.5, 
                      originY: 0
                    }}
                  >
                    <Link to={link.to} className={getTextClasses()}>
                      <div className="relative px-1">
                        <span className={`relative z-10 ${isActive ? 'font-medium' : ''}`}>
                          {link.label}
                        </span>
                        
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div 
                            className={`absolute -bottom-1 left-0 w-full h-0.5 ${getIndicatorColor(true)}`}
                            layoutId="navIndicator"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        
                        {/* Hover indicator */}
                        {activeItem === link.to && !isActive && (
                          <motion.div 
                            className={`absolute -bottom-1 left-0 w-full h-0.5 ${getIndicatorColor()}`}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              ref={hamburgerRef}
              className={`z-50 ${isMobile ? 'block' : 'hidden'} relative`}
              variants={navItemVariants}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                onClick={toggleMenu}
                className={`w-10 h-10 rounded-full flex items-center justify-center group ${isDarkText ? 'hover:bg-black/5' : 'hover:bg-white/10'} transition-colors duration-300`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={28} className={`${isDarkText ? 'text-black' : 'text-white'} drop-shadow-sm`} />
                ) : (
                  <div className="flex flex-col items-center justify-center w-6 h-6 space-y-1.5">
                    <motion.span 
                      className={`block h-0.5 w-full rounded-full ${isDarkText ? 'bg-black' : 'bg-white'} shadow-sm`}
                      variants={hamburgerLineVariants}
                      initial="closed"
                      animate={isMenuOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span 
                      className={`block h-0.5 w-full rounded-full ${isDarkText ? 'bg-black' : 'bg-white'} shadow-sm`}
                      variants={hamburgerSecondLineVariants}
                      initial="closed"
                      animate={isMenuOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span 
                      className={`block h-0.5 w-3/4 rounded-full ${isDarkText ? 'bg-black' : 'bg-white'} shadow-sm self-end`}
                      variants={hamburgerThirdLineVariants}
                      initial="closed"
                      animate={isMenuOpen ? "open" : "closed"}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                {/* Ripple effect on hover */}
                <motion.div 
                  className={`absolute inset-0 rounded-full -z-10 ${isDarkText ? 'bg-black/5' : 'bg-white/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  whileHover={{ 
                    scale: 1.2,
                    opacity: 1
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 400, damping: 17 },
                    opacity: { duration: 0.2 }
                  }}
                />
              </motion.button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-white z-25"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            />
            
            <motion.div
              className="fixed inset-0 bg-white z-50 pointer-events-none"
              initial={{ clipPath: `circle(0% at ${waveX} ${waveY})`, opacity: 0.9 }}
              animate={{ 
                clipPath: `circle(170% at ${waveX} ${waveY})`,
                opacity: 0,
                transition: {
                  clipPath: { duration: 1.2, ease: menuEasing },
                  opacity: { duration: 1.0, delay: 0.6, ease: "easeInOut" }
                }
              }}
              exit={{ 
                clipPath: `circle(0% at ${waveX} ${waveY})`,
                opacity: 0.9,
                transition: {
                  clipPath: { duration: 0.85, ease: menuEasing },
                  opacity: { duration: 0.65, delay: 0.05, ease: "easeInOut" }
                }
              }}
            />
            
            <motion.div
              className="fixed inset-0 bg-white z-45 pointer-events-none"
              style={{ opacity: 0.5 }}
              initial={{ clipPath: `circle(0% at ${waveX} ${waveY})` }}
              animate={{ 
                clipPath: `circle(160% at ${waveX} ${waveY})`,
                opacity: 0,
                transition: {
                  clipPath: { duration: 1.1, ease: menuEasing, delay: 0.07 },
                  opacity: { duration: 1.0, delay: 0.55, ease: "easeInOut" }
                }
              }}
              exit={{ 
                clipPath: `circle(0% at ${waveX} ${waveY})`,
                opacity: 0.5,
                transition: {
                  clipPath: { duration: 0.8, ease: menuEasing },
                  opacity: { duration: 0.5, delay: 0, ease: "easeInOut" }
                }
              }}
            />
            
            <motion.div
              className="fixed inset-0 bg-black z-40 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: 0,
                transition: { duration: 0.5, delay: 0.8, ease: "easeInOut" }
              }}
              exit={{ 
                opacity: 1,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            />

            <motion.div
              className="fixed inset-0 z-30 flex flex-col items-center justify-center pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { duration: 0.3, delay: 0.2, ease: "easeInOut" }
              }}
              exit={{ 
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <div className="absolute inset-0 bg-white">
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-100 to-white"></div>
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-100 to-white"></div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-6 py-16 w-full">
                <motion.div 
                  className="mb-4 opacity-60"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h2 className="text-2xl font-light text-gray-800 tracking-wider">MENU</h2>
                </motion.div>
                
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { 
                          delay: 0.3 + (0.08 * index),
                          type: "spring",
                          stiffness: 120,
                          damping: 20
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: 20,
                        transition: { duration: 0.2, delay: 0 }
                      }}
                      className="w-full text-center relative py-2"
                      whileHover={{ 
                        scale: 1.08, 
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        } 
                      }}
                    >
                      <Link 
                        to={link.to} 
                        className={`text-3xl font-medium transition-all duration-300 relative
                          ${isActive ? 'text-black' : 'text-gray-700 hover:text-black'}`}
                        onClick={toggleMenu}
                      >
                        {link.label}
                        {isActive && (
                          <motion.div 
                            className="absolute -bottom-2 left-0 w-full h-0.5 bg-black"
                            layoutId="mobileNavIndicator"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 