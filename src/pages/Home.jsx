
import Header from '../components/Header';
import HomeSlider from '../components/HomeSlider';
import OurWorks from '../components/OurWorks';
import Testimonials from '../components/Testimonials';
import Lieferanten from '../components/Lieferanten';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ParallaxSection from '../components/ParallaxSection';
import ReasonsSection from '../components/ReasonsSection';
import CookieModal from '../components/CookieModal';
import References from '../components/References';
import AboutUs from '../components/AboutUs';
import CostCalculator from '../components/CostCalculator';
import UnsereEtappen from '../components/UnsereEtappen';
import UnsereDienstleistungen from '../components/UnsereDienstleistungen';


const Home = () => {
    console.log("Rendering Home component");
    return (        
        <div className='Home'>            
            <Header />
            <main style={{ minHeight: 'calc(100vh - 80px)' }}>                
                <HomeSlider />   
                <CookieModal />                             
                <ReasonsSection />
                <UnsereEtappen />
                <ParallaxSection />
                <UnsereDienstleistungen/>
                <CostCalculator />   
                <OurWorks />
                <Testimonials /> 
                                               
                <AboutUs />
                <References />                                
                <Lieferanten />                 
                <ContactForm />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
}


export default Home;
