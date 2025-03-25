import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  // Check if current page is home page
  const isHomePage = () => location.pathname === "/";
  const shouldUseWhiteText = () => isHomePage() && !isScrolled;

  // Reset menu state on location change and detect page transitions
  useEffect(() => {
    setIsMenuOpen(false);
    // Enable scrolling when navigating to a new page
    document.body.style.overflow = "auto";
    
    // Detect page transition animation
    // When transitioning, we briefly show transition overlay
    setIsTransitioning(true);
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1260); // Same as the wave animation duration in PageTransition

    return () => clearTimeout(transitionTimer);
  }, [location]);

  // Update mobile state on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Control body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/virtual-tour", label: "Virtual Tour" },
    { to: "/storytelling", label: "Storytelling" },
    { to: "/#artists", label: "Artists" },
    { to: "/#exhibitions", label: "Exhibitions" },
    { to: "/gallery", label: "Gallery" },
    { to: "/visit", label: "Visit" },
  ];

  // Determine navbar appearance based on page, scroll position, and transition state with responsive padding
  const navbarClasses = isTransitioning
    ? "fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 z-50 bg-transparent transition-all duration-500 ease-in-out pointer-events-none opacity-0"
    : shouldUseWhiteText()
      ? "fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 z-50 bg-transparent transition-all duration-500 ease-in-out"
      : "fixed top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 z-50 bg-white/90 shadow-lg transition-all duration-500 ease-in-out";

  // Fixed backdrop blur layer with lower z-index (separate from content)
  const backdropBlurClass = !isTransitioning && !isMenuOpen ? 
    (shouldUseWhiteText() ? "backdrop-blur-sm" : "backdrop-blur-md") : "";

  // Determine text color based on page and scroll position
  const logoTextColor = (isTransitioning || shouldUseWhiteText()) ? "text-white" : "text-black";
  const navLinkColor = (isTransitioning || shouldUseWhiteText()) ? "text-gray-100 hover:text-white" : "text-gray-800 hover:text-black";
  const indicatorColor = (isTransitioning || shouldUseWhiteText()) ? "bg-white" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";

  // Animation variants
  const logoVariants = {
    hover: { 
      scale: 1.05, 
      textShadow: (isTransitioning || shouldUseWhiteText()) ? "0px 0px 8px rgba(255,255,255,0.5)" : "0px 0px 8px rgba(0,0,0,0.3)" 
    }
  };
  
  const linkVariants = {
    hover: { 
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.3,
        staggerDirection: -1,
        staggerChildren: 0.05,
        when: "afterChildren"
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren" 
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  // Responsive icon size for the compass
  const iconSize = isMobile ? 30 : 36;

  const handleLinkClick = (e, to) => {
    // If it's a hash link to the artists or exhibitions section
    if (to.includes('#artists') || to.includes('#exhibitions')) {
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      // If we're already on the home page, just scroll to the element
      if (location.pathname === '/') {
        e.preventDefault();
        const id = to.split('#')[1];
        const element = document.getElementById(id);
        
        if (element) {
          // Set a flag to prevent auto-scrolling to top
          sessionStorage.setItem('noAutoScroll', 'true');
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } 
      // If we're NOT on the home page, let default navigation happen
      // but set the flag to scroll to the appropriate section after navigation
      else {
        const sectionId = to.split('#')[1];
        sessionStorage.setItem(`scrollTo${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`, 'true');
        // Let the default navigation happen (to '/#section')
      }
    } else if (isMenuOpen) {
      // Just close the mobile menu for non-hash links
      setIsMenuOpen(false);
      
      // Additional delay for gallery page to ensure proper page transition
      if (to === '/gallery') {
        e.preventDefault();
        setTimeout(() => {
          window.location.href = to;
        }, 300);
      }
    }
  };

  return (
    <>
      {/* Separate backdrop blur div */}
      {backdropBlurClass && (
        <div className={`fixed top-0 left-0 w-full h-16 sm:h-[4.5rem] md:h-20 ${backdropBlurClass} z-40`} />
      )}
      
      {/* Main navbar */}
      <motion.nav 
        className={navbarClasses}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          variants={logoVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className={`text-xl sm:text-2xl font-bold ${logoTextColor} transition-all duration-300 relative group`}>
            <span className="relative z-10">Art</span>
            <motion.span 
              className={`relative z-10 bg-clip-text ${(isTransitioning || shouldUseWhiteText()) ? "text-white" : "text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"}`}
            >
              Vistas
            </motion.span>
            <motion.div 
              className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full ${(isTransitioning || shouldUseWhiteText()) ? "bg-white" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"} transition-all duration-300`}
            />
          </Link>
        </motion.div>
        
        <div className="flex items-center">
          {/* Desktop menu */}
          <ul className={`gap-4 md:gap-6 lg:gap-8 ${isMobile ? 'hidden' : 'flex'}`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to || (link.to.includes('#') && location.pathname === '/' && location.hash === link.to.substring(1));
              return (
                <motion.li key={link.to} className="relative"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.to} 
                    className={`text-sm md:text-base ${navLinkColor} ${isActive ? 'font-medium' : ''} relative overflow-hidden`}
                    onClick={(e) => handleLinkClick(e, link.to)}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div 
                        className={`absolute -bottom-1 left-0 w-full h-0.5 ${indicatorColor}`}
                        layoutId="navIndicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div
                      className={`absolute bottom-0 left-0 w-full h-[2px] ${(isTransitioning || shouldUseWhiteText()) ? "bg-white/70" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"} origin-left`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          
          {/* Mobile menu button placeholder - actual button is below */}
          <div className={`ml-4 ${isMobile ? 'block' : 'hidden'} w-[30px] h-[30px] sm:w-[36px] sm:h-[36px]`}></div>
        </div>
      </motion.nav>
      
      {/* Mobile menu toggle button - fixed position so it's always accessible */}
      {isMobile && (
        <motion.button
          ref={hamburgerRef}
          onClick={toggleMenu}
          className="fixed top-4 right-4 sm:top-5 sm:right-6 md:top-6 md:right-8 p-2 bg-transparent hover:bg-transparent focus:outline-none shadow-none outline-none border-0 rounded-full isolate z-[200]"
          aria-label="Toggle menu"
          style={{ boxShadow: 'none', filter: 'none' }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: (isTransitioning || shouldUseWhiteText() || isMenuOpen) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' 
          }}
          transition={{ duration: 0.2 }}
        >
          {isMenuOpen ? (
            // X icon when menu is open
            <motion.div 
              className="w-7 h-7 flex items-center justify-center bg-transparent"
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-6 h-0.5 bg-black absolute"
                initial={{ rotate: 0 }}
                animate={{ rotate: 45 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-6 h-0.5 bg-black absolute"
                initial={{ rotate: 0 }}
                animate={{ rotate: -45 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ) : (
            // Compass icon when menu is closed
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="isolate"
            >
              <Compass 
                size={iconSize} 
                className={isTransitioning ? "text-white" : (shouldUseWhiteText() ? "text-white" : "text-black")} 
                style={{ filter: 'none', boxShadow: 'none' }} 
              />
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-white via-white to-gray-100 z-[100] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ maxHeight: "100vh" }}
          >
            <motion.div 
              className="flex flex-col items-center py-24 w-full min-h-screen"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu items with higher z-index */}
              <div className="flex flex-col items-center justify-center gap-8 relative px-6 text-center w-full mt-4">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to || (link.to.includes('#') && location.pathname === '/' && location.hash === link.to.substring(1));
                  return (
                    <motion.div
                      key={link.to}
                      variants={mobileItemVariants}
                      className="overflow-hidden w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={link.to} 
                        className={`text-2xl sm:text-3xl font-medium ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600' : 'text-gray-700 hover:text-black'} relative block`}
                        onClick={(e) => handleLinkClick(e, link.to)}
                      >
                        {link.label}
                        {isActive && (
                          <motion.div 
                            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                            layoutId="mobileNavIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-100 to-transparent rounded-full blur-3xl opacity-60"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.6 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
              
              <motion.div
                className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-pink-100 to-transparent rounded-full blur-3xl opacity-60"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}