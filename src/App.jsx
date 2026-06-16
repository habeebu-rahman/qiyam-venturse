import { useEffect,useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//pages
import LandingPage from './pages/LandingPage';
import AboutVenturesPage from './pages/AboutVenturesPage';

//components
import CustomCursor from './components/CustomCursor';


export default function App() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const asciiArt = `
 ..|''||   '||' '||' '|'     |     '||    ||' 
.|'    ||   ||    || |      |||     |||  |||  
||      ||  ||     ||      |  ||    |'|..'||  
'|.  '. '|  ||     ||     .''''|.   | '|' ||  
  '|...'|. .||.   .||.   .|.  .||. .|. | .||. 
                                      v1.0.0          
                                              
    `;

    console.clear();

    console.log(`%c${asciiArt}`, "color: #c4953b; font-family: monospace; font-weight: bold; line-height: 1.2;");

    console.log(
      `%cWe Don't Build Companies. We Build Ecosystems.\n\n\n\n\n`,
      `%cCreated And Developed By: %chttps://github.com/habeebu-rahman\n` ,
    );
  }, []);

  return(
    <Router>
      <main 
          ref={scrollContainerRef} 
          className="relative w-full overflow-hidden bg-bg-dark-1 selection:bg-accent-cyan selection:text-bg-dark-1"
          >
            <CustomCursor />
            <Routes>
              <Route path='/' element={<LandingPage/>} />
              <Route path='/:id' element={<AboutVenturesPage />} />
            </Routes>

      </main>
    </Router>
  )

}