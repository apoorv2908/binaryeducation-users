import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./Styles/Classes.css";
import config from "../config"

const Classes = () => {
  const { class_id } = useParams();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchbooksforclasses.php?class_id=${class_id}`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [class_id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter(book => 
    book.book_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="containerx mt-4">
      <br></br><br></br>
      <div className= 'd-flex justify-content-between'>
        Home/Class     
      </div>
      <hr></hr>
        <div className="row">
          <div className=" col-md-12 d-flex justify-content-between">
            <div className='text-black mt-2 h5 fw-bold'>Books for {class_id}</div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by book name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div >
        <div className = "zala bg-white shadow-lg p-3 mt-3 mb-5 rounded">
        <div className="row mt-3">
          {filteredBooks.map((book) => (
            <div key={book.book_id} className="col-md-3 mb-4">
              <div className="book-item">
                <Link to={`/book/${book.book_id}`} className="book-link">
                  {book.book_cover && (
                    <div className='book-cover'>
                      <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/${book.book_cover}`} alt="Book Cover" className="img-fluid" />
                    </div>
                  )}
                </Link>
                <div className='h5 text-center mt-2'>
                  <Link to={`/book/${book.book_id}`} className="book-link">{book.book_name}</Link>
                </div>
                <div className="text-center mt-2">
                  <Link to={`/book/${book.book_id}`} className="book-link">
                    <button type="button" className='mx-1 btn btn-warning'>View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Classes;
