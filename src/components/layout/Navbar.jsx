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
    { to: "/artists", label: "Artists" },
    { to: "/exhibitions", label: "Exhibitions" },
    { to: "/gallery", label: "Gallery" },
    { to: "/visit", label: "Visit" },
  ];

  // Determine navbar appearance based on page, scroll position, and transition state
  const navbarClasses = isTransitioning
    ? "fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 bg-transparent transition-all duration-500 ease-in-out pointer-events-none opacity-0"
    : shouldUseWhiteText()
      ? "fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 bg-transparent backdrop-blur-sm transition-all duration-500 ease-in-out"
      : "fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 z-50 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-500 ease-in-out";

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

  return (
    <>
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
          <Link to="/" className={`text-2xl font-bold ${logoTextColor} transition-all duration-300 relative group`}>
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
          <ul className={`gap-8 ${isMobile ? 'hidden' : 'flex'}`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <motion.li key={link.to} className="relative"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={link.to} 
                    className={`${navLinkColor} ${isActive ? 'font-medium' : ''} relative overflow-hidden`}
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
          
          {/* Mobile menu button */}
          <motion.button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className={`ml-4 ${isMobile ? 'block' : 'hidden'} p-2 bg-transparent hover:bg-transparent focus:outline-none shadow-none outline-none border-0 rounded-full`}
            aria-label="Toggle menu"
            style={{ boxShadow: 'none', filter: 'none' }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: (isTransitioning || shouldUseWhiteText()) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' 
            }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? (
              // X should be black on all pages
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
              // Compass icon for closed state with rotation animation on hover
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Compass 
                  size={36} 
                  className={isTransitioning ? "text-white" : (shouldUseWhiteText() ? "text-white" : "text-black")} 
                  style={{ filter: 'none', boxShadow: 'none' }} 
                />
              </motion.div>
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-white via-white to-gray-100 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="flex flex-col items-center justify-center h-full"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Close button at the top right */}
              <div className="absolute top-6 right-6">
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 bg-transparent hover:bg-gray-100 focus:outline-none rounded-full transition-colors duration-300"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <div className="w-6 h-0.5 bg-black absolute transform rotate-45"></div>
                    <div className="w-6 h-0.5 bg-black absolute transform -rotate-45"></div>
                  </div>
                </motion.button>
              </div>
              
              {/* Decorative element */}
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
              
              {/* Menu items */}
              <div className="flex flex-col items-center justify-center gap-8 relative z-10">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      variants={mobileItemVariants}
                      className="overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={link.to} 
                        className={`text-3xl font-medium ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600' : 'text-gray-700 hover:text-black'} relative`}
                        onClick={toggleMenu}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}