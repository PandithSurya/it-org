import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollExperience from './components/ScrollExperience';
import QuoteSection from './components/QuoteSection';
import HorizontalServicesScroll from './components/HorizontalServicesScroll';
import RadialScrollGallery from './components/RadialScrollGallery';
import HomeTrainingPreview from './components/HomeTrainingPreview';
import LearnApplyGrowExperience from './components/LearnApplyGrowExperience';
import ServicesPage from './pages/ServicesPage';
import TrainingPage from './pages/TrainingPage';
import ContactPage from './pages/ContactPage';
import WorksPage from './pages/WorksPage';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <ScrollExperience />
      <QuoteSection />
      <HorizontalServicesScroll />
      <RadialScrollGallery />
      <HomeTrainingPreview />
      <LearnApplyGrowExperience />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

