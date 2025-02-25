import Header from "./components/header";
import Footer from "./components/footer";
import Post from "./components/Post";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-center">hello posts</h1>
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Post/>
      </main>
      <Footer />
    </div>
  );
}

export default App;

