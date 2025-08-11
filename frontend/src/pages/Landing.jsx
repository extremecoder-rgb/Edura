import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaMoon,
  FaSun,
  FaBookOpen,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSearch,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaRegStar,
  FaStar,
  FaRegClock,
  FaUserGraduate,
  FaRegCheckCircle,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaRegEnvelope,
} from 'react-icons/fa';
import { FiBook, FiBriefcase } from 'react-icons/fi';
import { IoMdTrendingUp } from 'react-icons/io';
import { RiTestTubeLine } from 'react-icons/ri';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode((v) => !v);
  const toggleMobile = () => setMobileOpen((v) => !v);

  const accent = {
    text: darkMode ? 'text-rose-300' : 'text-rose-600',
    bg: darkMode ? 'bg-rose-600/90' : 'bg-rose-600',
    bgHover: darkMode ? 'hover:bg-rose-500' : 'hover:bg-rose-700',
    ring: 'focus:ring-rose-400/60',
    chip: darkMode ? 'bg-rose-400/10 text-rose-300' : 'bg-rose-100 text-rose-700',
    gradient: darkMode 
      ? 'from-rose-600/30 via-pink-600/30 to-fuchsia-600/30' 
      : 'from-rose-100 via-pink-100 to-fuchsia-100',
  };

  const surface = {
    base: darkMode ? 'bg-gray-950 text-gray-50' : 'bg-gray-50 text-gray-900',
    card: darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white/90 border-gray-200',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    navGlass: darkMode 
      ? `bg-gray-900/80 ${scrolled ? 'backdrop-blur-lg' : 'backdrop-blur-sm'}` 
      : `bg-white/90 ${scrolled ? 'backdrop-blur-lg' : 'backdrop-blur-sm'}`,
  };

  const motion = prefersReducedMotion ? 'transition-none' : 'transition-all duration-300';

  const NavItem = ({ to, label, icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg ${isActive ? accent.text : ''} ${surface.muted} hover:${accent.text} focus:outline-none focus:ring-2 ${accent.ring} ${motion}`
      }
      onClick={() => setMobileOpen(false)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </NavLink>
  );

  const FeatureCard = ({ icon, title, desc, to, cta }) => (
    <div className={`group relative h-full rounded-xl p-6 border ${surface.card} ${motion} hover:shadow-lg hover:-translate-y-1 overflow-hidden`}>
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-rose-500/5 group-hover:bg-rose-500/10 ${motion}" />
      <div className="relative z-10">
        <div className={`w-12 h-12 mb-4 flex items-center justify-center rounded-full ${darkMode ? 'bg-rose-500/10' : 'bg-rose-100'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className={`${surface.muted} mb-4`}>{desc}</p>
        <Link
          to={to}
          className={`inline-flex items-center font-medium ${motion} ${
            darkMode ? 'text-rose-300 hover:text-rose-200' : 'text-rose-600 hover:text-rose-700'
          }`}
        >
          {cta}
          <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );

  const CourseCard = ({ title, instructor, duration, level, rating, students, isNew, isTrending }) => (
    <div className={`rounded-xl p-5 border ${surface.card} ${motion} hover:shadow-lg hover:-translate-y-1`}>
      <div className="relative mb-4">
        <div className={`aspect-video rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        {isNew && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${accent.chip}">
            New
          </span>
        )}
        {isTrending && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded bg-blue-500/10 text-blue-400">
            Trending
          </span>
        )}
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center text-yellow-400">
          <FaStar className="text-sm" />
          <span className="ml-1 text-sm">{rating}</span>
        </div>
      </div>
      <p className={`text-sm ${surface.muted} mb-3`}>By {instructor}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`flex items-center text-xs px-2 py-1 rounded ${surface.muted} ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <FaRegClock className="mr-1" /> {duration}
        </span>
        <span className={`flex items-center text-xs px-2 py-1 rounded ${surface.muted} ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <FaGraduationCap className="mr-1" /> {level}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`flex items-center text-sm ${surface.muted}`}>
          <FaUserGraduate className="mr-1" /> {students}
        </span>
        <button className={`text-sm px-3 py-1 rounded-md ${accent.bg} ${accent.bgHover} text-white`}>
          Enroll
        </button>
      </div>
    </div>
  );

  const StatCard = ({ value, label, icon }) => (
    <div className={`p-6 rounded-xl border ${surface.card} text-center`}>
      <div className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${darkMode ? 'bg-rose-500/10' : 'bg-rose-100'}`}>
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <p className={`${surface.muted}`}>{label}</p>
    </div>
  );

  return (
    <div className={`min-h-screen ${surface.base} transition-colors duration-300`}>
      {/* Enhanced Navigation */}
      <nav className={`fixed w-full z-50 ${surface.navGlass} border-b ${surface.border} ${motion} ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Edura Logo" 
                className="h-10 w-10 rounded" 
              />
              <span className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Edura
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <NavItem to="/" label="Home" />
              <NavItem to="/courses" label="Courses" />
              <NavItem to="/ebooks" label="E-Books" />
              <NavItem to="/articles" label="Articles" />
              <NavItem to="/resume" label="Resume Tools" />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring-2 ${accent.ring} ${motion}`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 ${accent.ring} ${motion} w-48`}
                />
                <FaSearch className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              
              <Link
                to="/signin"
                className={`px-4 py-2 rounded-md ${accent.bg} ${accent.bgHover} text-white ${motion} focus:outline-none focus:ring-2 ${accent.ring}`}
              >
                Sign In
              </Link>
            </div>

            <button
              onClick={toggleMobile}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 ${accent.ring} ${motion}`}
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-0 z-40 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} ${motion} ${surface.base} pt-20`}
        >
          <div className="container px-4 pb-4 space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 ${accent.ring}`}
              />
              <FaSearch className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            
            <div className="space-y-2">
              <NavItem to="/" label="Home" icon={<FaGraduationCap />} />
              <NavItem to="/courses" label="Courses" icon={<FaChalkboardTeacher />} />
              <NavItem to="/ebooks" label="E-Books" icon={<FaBookOpen />} />
              <NavItem to="/articles" label="Articles" icon={<FiBook />} />
              <NavItem to="/resume" label="Resume Tools" icon={<FiBriefcase />} />
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={toggleDarkMode}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                <span>Dark Mode</span>
                <div className={`p-1 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}>
                  {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                </div>
              </button>
              
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className={`block w-full text-center px-4 py-3 rounded-lg mt-2 ${accent.bg} ${accent.bgHover} text-white`}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-40 pb-28 px-4 sm:px-6 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-black' : 'bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-100'}`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="lg:w-1/2 space-y-6">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mb-4 ${accent.chip} border ${surface.border}`}>
              <IoMdTrendingUp className="mr-1" /> The future of learning is here
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            <p className={`text-lg md:text-xl ${surface.muted} max-w-lg`}>
              Premium courses, curated e-books, insightful articles, and career tools — all designed to accelerate your growth and help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/signup"
                className={`inline-flex items-center justify-center px-7 py-4 rounded-lg font-medium ${accent.bg} ${accent.bgHover} text-white shadow-lg hover:shadow-rose-500/20 ${motion}`}
              >
                Get Started <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/courses"
                className={`inline-flex items-center justify-center px-7 py-4 rounded-lg font-medium border ${surface.border} ${
                  darkMode ? 'bg-gray-900 text-gray-100 hover:bg-gray-800' : 'bg-white text-gray-900 hover:bg-gray-50'
                } ${motion}`}
              >
                Explore Courses
              </Link>
            </div>
            
            <div className="flex items-center pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img 
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
                  />
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className={`text-sm ${surface.muted}`}>Trusted by 10,000+ learners worldwide</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full relative">
            <div className={`relative rounded-2xl overflow-hidden border ${surface.border} ${darkMode ? 'bg-gray-900/60' : 'bg-white/80'} backdrop-blur-xl shadow-2xl`}>
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-rose-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-fuchsia-500/20 blur-3xl rounded-full" />
              <div className="p-8 sm:p-10">
                <div className="flex items-center mb-6">
                  <FaGraduationCap className="text-3xl text-rose-500 mr-3" />
                  <h3 className="text-2xl font-bold">Why Choose Edura?</h3>
                </div>
                
                <ul className="space-y-4">
                  {[
                    { icon: <FaRegCheckCircle className="text-rose-500" />, text: "Expert-curated content" },
                    { icon: <FaRegCheckCircle className="text-rose-500" />, text: "Interactive learning" },
                    { icon: <FaRegCheckCircle className="text-rose-500" />, text: "Career-focused resources" },
                    { icon: <FaRegCheckCircle className="text-rose-500" />, text: "Community support" },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-0.5">{item.icon}</span>
                      <span className={`${surface.muted}`}>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-700 flex justify-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${accent.chip} border ${surface.border}`}>4.9/5 Rating</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${accent.chip} border ${surface.border}`}>100+ Courses</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${accent.chip} border ${surface.border}`}>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard 
              value="10K+" 
              label="Active Learners" 
              icon={<FaUserGraduate className="text-2xl text-rose-500" />} 
            />
            <StatCard 
              value="500+" 
              label="Courses & Resources" 
              icon={<FaBookOpen className="text-2xl text-rose-500" />} 
            />
            <StatCard 
              value="95%" 
              label="Satisfaction Rate" 
              icon={<FaRegStar className="text-2xl text-rose-500" />} 
            />
            <StatCard 
              value="24/7" 
              label="Support Available" 
              icon={<FaRegClock className="text-2xl text-rose-500" />} 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className={`${surface.muted} max-w-2xl mx-auto`}>
              A comprehensive learning ecosystem designed to help you master new skills and advance your career.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaChalkboardTeacher className="text-rose-500 text-xl" />}
              title="Expert-Led Courses"
              desc="Learn from industry professionals with real-world experience."
              to="/courses"
              cta="Browse Courses"
            />
            <FeatureCard
              icon={<FaBookOpen className="text-rose-500 text-xl" />}
              title="Curated E-Books"
              desc="Access our library of carefully selected digital books."
              to="/ebooks"
              cta="Explore Library"
            />
            <FeatureCard
              icon={<FiBook className="text-rose-500 text-xl" />}
              title="Insightful Articles"
              desc="Stay updated with the latest trends and knowledge."
              to="/articles"
              cta="Read Articles"
            />
            <FeatureCard
              icon={<FiBriefcase className="text-rose-500 text-xl" />}
              title="Resume Tools"
              desc="Create professional resumes that get noticed."
              to="/resume"
              cta="Build Resume"
            />
            <FeatureCard
              icon={<RiTestTubeLine className="text-rose-500 text-xl" />}
              title="Skill Assessments"
              desc="Test your knowledge and identify areas for improvement."
              to="/assessments"
              cta="Take Assessment"
            />
            <FeatureCard
              icon={<FaGraduationCap className="text-rose-500 text-xl" />}
              title="Certifications"
              desc="Earn recognized credentials to showcase your skills."
              to="/certifications"
              cta="View Programs"
            />
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className={`py-20 px-4 sm:px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Courses</h2>
            <p className={`${surface.muted} max-w-2xl mx-auto`}>
              Explore our most sought-after learning programs handpicked by our community.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard
              title="Advanced React Development"
              instructor="Sarah Johnson"
              duration="8 weeks"
              level="Intermediate"
              rating="4.9"
              students="1.2K"
              isNew={true}
            />
            <CourseCard
              title="Data Science Fundamentals"
              instructor="Michael Chen"
              duration="12 weeks"
              level="Beginner"
              rating="4.8"
              students="2.4K"
              isTrending={true}
            />
            <CourseCard
              title="UX/UI Design Masterclass"
              instructor="Emma Rodriguez"
              duration="6 weeks"
              level="Advanced"
              rating="4.7"
              students="850"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ${motion}`}
            >
              View All Courses <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 px-4 sm:px-6 ${darkMode ? 'bg-gray-950' : 'bg-rose-50'} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 right-10 w-64 h-64 bg-rose-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-28 left-6 w-72 h-72 bg-fuchsia-400/20 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Learners Say</h2>
            <p className={`${surface.muted} max-w-2xl mx-auto`}>
              Don't just take our word for it - hear from our community of successful learners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Edura transformed my career. The courses are practical and the instructors are top-notch.",
                name: "Alex Turner",
                role: "Frontend Developer",
                rating: 5
              },
              {
                quote: "The best investment I've made in my professional development. The resume tools helped me land my dream job!",
                name: "Priya Patel",
                role: "Data Scientist",
                rating: 5
              },
              {
                quote: "As a busy professional, I appreciate the flexible learning options. The content is always up-to-date.",
                name: "James Wilson",
                role: "Product Manager",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className={`rounded-xl p-6 border ${surface.card} ${motion} hover:shadow-lg`}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'}`} />
                  ))}
                </div>
                <p className={`italic mb-6 ${surface.muted}`}>"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className={`text-sm ${surface.muted}`}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-28 px-4 sm:px-6 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gradient-to-br from-rose-600 to-pink-600'} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-rose-100'} mb-8 max-w-2xl mx-auto`}>
            Join thousands of learners who have accelerated their growth with Edura. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium bg-white text-rose-600 hover:bg-gray-100 shadow-lg ${motion}`}
            >
              Get Started for Free
            </Link>
            <Link
              to="/courses"
              className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium border border-white/30 text-white hover:bg-white/10 ${motion}`}
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-4 sm:px-6 ${darkMode ? 'bg-gray-950' : 'bg-white'} border-t ${surface.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/logo.jpg" 
                  alt="Edura Logo" 
                  className="h-10 w-10 rounded" 
                />  
                <span className="text-xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Edura
                </span>
              </div>
              <p className={`${surface.muted} mb-4`}>
                Premium learning resources to help you grow personally and professionally.
              </p>
              <div className="flex space-x-4">
                <a href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ${motion}`}>
                  <FaTwitter className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                </a>
                <a href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ${motion}`}>
                  <FaLinkedin className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                </a>
                <a href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} ${motion}`}>
                  <FaGithub className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>All Courses</a></li>
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>E-Books</a></li>
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Articles</a></li>
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>About Us</a></li>
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Careers</a></li>
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Press</a></li>
                <li><a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
              <p className={`${surface.muted} mb-4`}>Subscribe to our newsletter for the latest updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-4 py-2 rounded-l-lg border ${surface.border} ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 ${accent.ring}`}
                />
                <button className={`px-4 py-2 rounded-r-lg ${accent.bg} ${accent.bgHover} text-white`}>
                  <FaRegEnvelope />
                </button>
              </div>
            </div>
          </div>
          
          <div className={`border-t ${surface.border} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <div className={`${surface.muted} text-center md:text-left mb-4 md:mb-0`}>
              © {new Date().getFullYear()} Edura Learning Platform. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Privacy Policy</a>
              <a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Terms of Service</a>
              <a href="#" className={`${surface.muted} hover:${accent.text} ${motion}`}>Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;