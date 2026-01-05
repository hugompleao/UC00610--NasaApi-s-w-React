import { useState } from 'react'
import './css/App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import APOD from './pages/APODPage'
import Asteroid from './pages/AsteroidPage'
import NasaLib from './pages/NasaLibPage'
import EONET from './pages/EonetPage'
import EPIC from './pages/EpicPage'
import MARS from './pages/MarsPhotosPage'

function App() {

  // Estado para controlar qual página está visível
  const [currentPage, setCurrentPage] = useState('home'); // Começa na HomePage

  // Função simples para mudar de página (simulação de navegação)
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Renderiza a página correta com base no estado
  const renderPage = () => {
    switch (currentPage) {
      case "apod":
        return <APOD />
      case "asteroids":
        return <Asteroid />
      case "nasalib":
        return <NasaLib />
      case "eonet":
        return <EONET />
      case "epic":
        return <EPIC />
      case "mars":
        return <MARS />
      default:
        return <HomePage navigateTo={navigateTo} />
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 text-light">

      {/* Passa a função de navegação para a Navbar */}
      <Navbar navigateTo={navigateTo} currentPage={currentPage} />

      <main className="flex-grow-1 padding-top: 80px" >
        {renderPage()}
      </main>

      <Footer />
    </div>
  )
}

export default App;
