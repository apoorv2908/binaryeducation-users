import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/BookDetails.css';
import config from "../config"

const BookDetails = () => {
  const { book_id } = useParams();
  const [book, setBook] = useState({});
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchbookdetails.php?book_id=${book_id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));

    fetch(`${config.apiBaseUrl}/fullmarks-user/navbar/fetchchapters.php?book_id=${book_id}`)
      .then(response => response.json())
      .then(data => setChapters(data))
      .catch(error => console.error('Error fetching chapters:', error));
  }, [book_id]);

  return (
    <div className="containery mt-5 bg-white shadow-lg p-3 mb-5 rounded">
        <br></br><br></br>
        <div className= 'd-flex justify-content-between'>
            Home/Class/{book.book_name}
        </div>
        <br></br>
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          {book.book_cover && (
            <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/${book.book_cover}`} alt="Book Cover" className="book-cover img-fluid rounded" />
          )}
        </div>
        <div className="col-md-6">
          <h4 className="fw-bold">{book.book_name}</h4>
          <p className="text-grey fst-italic pre-wrap">{book.book_description}</p>
          <hr />
          <div className= 'fw-bold'>
            Chapters:
          </div>
          <div className= 'mt-2 d-flex justify-content-center'>
          <ul>
            {chapters.map(chapter => (
              <p key={chapter.chapter_id}>{chapter.chapter_title}</p>
            ))}
          </ul>
            
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
