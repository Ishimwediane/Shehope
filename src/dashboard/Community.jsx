// src/components/Community.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa'; // Importing a send icon from react-icons

const Community = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage
  const userName = localStorage.getItem('userName'); // Assuming user name is stored in local storage

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments/'); // Adjust the endpoint as needed
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/comments/', {
        userId,
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data.comment]);
      setNewComment(''); // Clear the input
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-20 ml-100 container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Section</h1>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6 flex">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows="2"
          placeholder="Write your message here..."
        />
        <button type="submit" className="ml-2 p-2 text-blue-600 hover:text-blue-800">
          <FaPaperPlane size={24} />
        </button>
      </form>

      {/* Comments List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id} className="border-b border-gray-200 py-2">
              <p className="font-semibold">{comment.userId.name}</p> {/* Display the user's name */}
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Community;