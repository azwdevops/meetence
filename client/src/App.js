// installed apps
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// styles
import "./App.css";

// components/pages imports
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <header className="header">
          <Header />
        </header>
        <Switch>
          <main className="main">
            {/* unauthenticated routes */}
            <Route exact path="/" component={Home} />
            {/* authenticated routes */}
          </main>
        </Switch>
        <footer className="footer">
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
