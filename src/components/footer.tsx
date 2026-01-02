const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-2 h-100 w-full bg-white dark:bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-[10vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-gray-200 to-gray-600">
          NAMAN JAIN
        </h2>
        <p className="text-xl md:text-2xl mt-4 text-blue-400 font-mono tracking-widest">
          FULL STACK DEVELOPER
        </p>
        <p className="mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} TechyUDP. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;