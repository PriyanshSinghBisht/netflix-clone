import { motion } from 'framer-motion';
import LangOpc from "./LangOpc";

const Footer = () => {
  const footerLinks = [
    { title: 'FAQ', href: '#' },
    { title: 'Investor Relations', href: '#' },
    { title: 'Privacy', href: '#' },
    { title: 'Speed Test', href: '#' },
    { title: 'Help Centre', href: '#' },
    { title: 'Jobs', href: '#' },
    { title: 'Cookie Preferences', href: '#' },
    { title: 'Legal Notices', href: '#' },
    { title: 'Account', href: '#' },
    { title: 'Ways to Watch', href: '#' },
    { title: 'Corporate Information', href: '#' },
    { title: 'Only on Netflix', href: '#' },
    { title: 'Media Centre', href: '#' },
    { title: 'Terms of Use', href: '#' },
    { title: 'Contact Us', href: '#' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-[500px]:pb-[70px] flex flex-col text-mywhite min-[1280px]:m-auto mx-10 max-w-[1200px] pb-10"
    >
      <h1 className="text-[12px] my-10">
        Questions? Call <a className="hover:underline cursor-pointer">000-800-919-1694</a>
      </h1>
      
      <div className="flex flex-row gg:justify-between">
        <div className="flex min-[600px]:flex-row flex-col justify-around flex-1">
          {footerLinks.slice(0, 4).map((link, index) => (
            <motion.a
              key={index}
              whileHover={{ color: '#fff' }}
              className="my-2 link text-[15px] cursor-pointer transition-colors"
              href={link.href}
            >
              {link.title}
            </motion.a>
          ))}
        </div>
        <div className="flex min-[600px]:flex-row flex-col justify-around flex-1">
          {footerLinks.slice(4, 8).map((link, index) => (
            <motion.a
              key={index}
              whileHover={{ color: '#fff' }}
              className="my-2 link text-[15px] cursor-pointer transition-colors"
              href={link.href}
            >
              {link.title}
            </motion.a>
          ))}
        </div>
      </div>
      
      <div className="flex flex-row gg:justify-between mt-4">
        <div className="flex min-[600px]:flex-row flex-col justify-around flex-1">
          {footerLinks.slice(8, 12).map((link, index) => (
            <motion.a
              key={index}
              whileHover={{ color: '#fff' }}
              className="my-2 link text-[15px] cursor-pointer transition-colors"
              href={link.href}
            >
              {link.title}
            </motion.a>
          ))}
        </div>
        <div className="flex min-[600px]:flex-row flex-col justify-around flex-1">
          {footerLinks.slice(12).map((link, index) => (
            <motion.a
              key={index}
              whileHover={{ color: '#fff' }}
              className="my-2 link text-[15px] cursor-pointer transition-colors"
              href={link.href}
            >
              {link.title}
            </motion.a>
          ))}
        </div>
      </div>
      
      <div className="my-5">
        <LangOpc />
      </div>
      <h1 className="text-gray-500">Netflix India</h1>
    </motion.div>
  );
};

export default Footer;