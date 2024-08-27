import Faq from "./Faq";
import Features from "./Features/Features";
import Footer from "./Footer";
import Howtouse from "./Howtouse";
import LandingPage from "./Landing";
import Navbar from "./Navbar";

function MainLanding(){
    return(
        <>
            <Navbar />
            <div id="landing">
                <LandingPage />
            </div>
            <div id="features">
                <Features />
            </div>
            <div id="how-it-works">
                <Howtouse />
            </div>
            <div id="faq">
                <Faq />
            </div>
            <Footer />
        </>
    );
}

export default MainLanding;
