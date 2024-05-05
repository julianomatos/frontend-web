import MapContent from "./pages/Home";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-beige-light">
      <Header />
      <main className="flex-grow">
        <MapContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
