import Footer from "./Footer";
import Header from "./Header";

const Main = ({ children,mainClassName='' }) => {
  
  return (
    <>
      <Header />
      <div className={`min-h-screen pt-10 lg:pt-20  ${mainClassName}`}>{children}</div>
      <Footer />
    </>
  );
};

export default Main;
