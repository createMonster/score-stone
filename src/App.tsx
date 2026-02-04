import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Dimensions from './sections/Dimensions';
import TodayStone from './sections/TodayStone';
import Gallery from './sections/Gallery';
import Criteria from './sections/Criteria';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <main>
        <Hero />
        <Dimensions />
        <TodayStone />
        <Gallery />
        <Criteria />
      </main>
      <Footer />
    </div>
  );
}

export default App;
