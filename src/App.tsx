import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AnnouncementBanner from './components/AnnouncementBanner';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import AppPage from './pages/App';
import ScoutyPay from './pages/ScoutyPay';
import Activity from './pages/Activity';
import Settings from './pages/Settings';
import Playground from './pages/Playground';
import Wall from './pages/Wall';
import Docs from './pages/Docs';
import Status from './pages/Status';
import Security from './pages/Security';
import Roadmap from './pages/Roadmap';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Header />
        <AnnouncementBanner />
        <PageTransition>
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app" element={<AppPage />} />
              <Route path="/scoutypay" element={<ScoutyPay />} />
              <Route path="/solenceaipay" element={<ScoutyPay />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/wall" element={<Wall />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/status" element={<Status />} />
              <Route path="/security" element={<Security />} />
              <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
          </div>
        </PageTransition>
      </div>
    </Router>
  );
}

export default App;
