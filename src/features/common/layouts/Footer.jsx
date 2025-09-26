const Footer = () => {
  return (
    <footer className="hidden lg:flex w-full items-center justify-center bg-base-300 text-base-content p-4">
      <aside>
        <p className="text-center">
          Copyright © {new Date().getFullYear()} - All rights reserved by
          Finance Tracker Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
