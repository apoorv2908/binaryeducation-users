import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Classes from './Pages/Classes';
import BookDetails from './Pages/BookDetails';
import Aboutus from './Components/Aboutus';
import Page from "./Components/Access/Page"
import Studentlogin from './Components/Access/Studentlogin';
import Teacherlogin from './Components/Access/Teacherlogin';
import { AuthProvider } from './Components/Access/AuthContext';
import Teacherregister from './Components/Access/Teacherregister';

function App() {
  return (
    <div className="App">
          <AuthProvider> {/* Wrap with AuthProvider */}

      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Page title="Home - Binary Education">
                <Home />
              </Page>
            }
          />
          <Route
            path="/classes/:class_id"
            element={
              <Page title="Classes - Binary Education">
                <Classes />
              </Page>
            }
          />
          <Route
            path="/book/:book_id"
            element={
              <Page title="Book Details - Binary Education">
                <BookDetails />
              </Page>
            }
          />
          <Route
            path="/about"
            element={
              <Page title="About Us - Binary Education">
                <Aboutus />
              </Page>
            }
          />
          <Route
            path="/login-student"
            element={
              <Page title="Login Student - Binary Education">
                <Studentlogin />
              </Page>
            }
          />
          <Route
            path="/login-teacher"
            element={
              <Page title="Login Teacher - Binary Education">
                <Teacherlogin />
              </Page>
            }
          />

          <Route
            path="/register-teacher"
            element={
              <Page title="Registration Teacher - Binary Education">
                <Teacherregister />
              </Page>
            }
          />
        </Routes>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
