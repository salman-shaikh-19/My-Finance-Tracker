import Footer from "./Footer"
import Header from "./Header"

const Main=({ children })=>{
    return (
      <>

        <Header />
        <div className="min-h-screen">
        {children}

        </div>
        <Footer />
      </>
    );
}

export default Main;