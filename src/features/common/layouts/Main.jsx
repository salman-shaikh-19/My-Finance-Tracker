import Footer from "./Footer"
import Header from "./Header"

const Main=({ children })=>{
    return (
      <>

        <Header />
        <div className="min-h-screen pt-10 lg:pt-20">
        {children}

        </div>
        <Footer />
      </>
    );
}

export default Main;