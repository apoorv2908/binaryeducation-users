import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Classes from './Pages/Classes';
import BookDetails from './Pages/BookDetails';
import Aboutus from './Components/Aboutus';
import Addstudents from './Components/Addstudent';
import Addteachers from './Components/Addteachers';

function App() {
  return (
    <div className="App">
      <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Add more routes as needed */}
                <Route path='/classes/:class_id' element={<Classes/>}></Route>

                <Route path='/book/:book_id' element={<BookDetails/>}></Route>

                <Route path='about' element={<Aboutus/>}></Route>

                <Route path='login-student' element={<Addstudents/>}></Route>
                <Route path='login-teacher' element={<Addteachers/>}></Route>



            </Routes>
            <Footer />
        </Router>
      
    </div>
  );
}

export default App;
