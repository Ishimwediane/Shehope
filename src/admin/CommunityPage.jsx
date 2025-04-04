import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ totalPosts: 0, totalReports: 0, totalComments: 0 });
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewing, setViewing] = useState(''); // either 'comments' or 'reports'

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return console.error('No admin token found. Please log in again.');
      const response = await axios.get('https://shehope-server-1.onrender.com/api/admin/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); // Check the structure here
      setPosts(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response?.data || error.message);
    }
  };

  const calculateStats = (posts) => {
    const totalReports = posts.reduce((acc, post) => acc + (post.reports?.length || 0), 0);
    const totalComments = posts.reduce((acc, post) => acc + (post.comments?.length || 0), 0);
    setStats({ totalPosts: posts.length, totalReports, totalComments });
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      await axios.delete(`https://shehope-server-1.onrender.com/api/admin/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error.response?.data || error.message);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      await axios.delete(`https://shehope-server-1.onrender.com/api/admin/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting comment:', error.response?.data || error.message);
    }
  };

  const viewDetails = (post, type) => {
    setSelectedPost(post);
    setViewing(type);
  };

  const handleResolveReport = async (postId, reportId) => {
    try {
      console.log('Sending request to resolve report...');
      const response = await fetch(`https://shehope-server-1.onrender.com/api/admin/posts/${postId}/reports/${reportId}/resolve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
      

        // Notify admin that the report was resolved
        toast.success("Report has been resolved successfully!");

        // Update the selected post's reports after resolution
        setSelectedPost((prevPost) => {
          const updatedReports = prevPost.reports.map((report) =>
            report._id === reportId ? { ...report, resolved: true } : report
          );
          return { ...prevPost, reports: updatedReports };
        });
      } else {
        console.error('Failed to resolve the report');
      }
    } catch (error) {
      console.error('Error resolving report:', error);
    }
  };

  return (
    <div className="ml-64 mt-20 p-6 w-full">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid ml-10 grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-800">Total Posts</h2>
          <p className="text-2xl text-blue-500">{stats.totalPosts}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-800">Total Reports</h2>
          <p className="text-2xl text-red-500">{stats.totalReports}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-800">Total Comments</h2>
          <p className="text-2xl text-green-500">{stats.totalComments}</p>
        </div>
      </div>

      {/* Table Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-10">Community Posts</h2>

      {/* Posts Table */}
      <table className="w-full ml-10 border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left text-sm font-medium text-gray-700">Post</th>
            <th className="border p-2 text-left text-sm font-medium text-gray-700">Likes</th>
            <th className="border p-2 text-left text-sm font-medium text-gray-700">Comments</th>
            <th className="border p-2 text-left text-sm font-medium text-gray-700">Reports</th>
            <th className="border p-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="border-b text-center hover:bg-gray-50">
              <td className="border p-2 text-sm text-gray-600">{post.content}</td>
              <td className="border p-2 text-sm text-gray-600">{post.likes?.length || 0}</td>
              <td className="border p-2">
                <button
                  onClick={() => viewDetails(post, 'comments')}
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  {post.comments?.length || 0} View
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => viewDetails(post, 'reports')}
                  className="text-red-500 hover:underline text-sm font-medium"
                >
                  {post.reports?.length || 0} View
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deletePost(post._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm font-medium"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Reports */}
      {selectedPost && viewing === 'reports' && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.9)] filter brightness(0.2)">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <AiOutlineClose className="absolute top-4 right-4 text-xl cursor-pointer" onClick={() => setSelectedPost(null)} />
            <h2 className="text-lg font-bold mb-4">Reports for Post</h2>
            <div className="max-h-60 overflow-y-auto">
              {selectedPost.reports?.length > 0 ? (
                selectedPost.reports.map((report) => (
                  <div key={report._id} className="border-b py-4">
                    <p className="text-gray-800"><strong>{report.user?.name || 'Unknown'}</strong>: {report.comment}</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Abuse Type: {report.abuseType || 'Not specified'}</span>
                      {report.resolved ? (
                        <span className="text-green-500">Resolved</span>
                      ) : (
                        <button onClick={() => handleResolveReport(selectedPost._id, report._id)} className="text-green-500 text-sm hover:underline">
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reports available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Comments */}
      {selectedPost && viewing === 'comments' && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.9)] filter brightness(0.2)">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <AiOutlineClose className="absolute top-4 right-4 text-xl cursor-pointer" onClick={() => setSelectedPost(null)} />
            <h2 className="text-lg font-bold mb-4">Comments for Post</h2>
            <div className="max-h-60 overflow-y-auto">
              {selectedPost.comments?.length > 0 ? (
                selectedPost.comments.map((comment) => (
                  <div key={comment._id} className="border-b py-4 flex justify-between">
                    <p className="text-gray-700"><strong>{comment.user}</strong>: {comment.comment}</p>
                    <button onClick={() => deleteComment(selectedPost._id, comment._id)} className="text-red-500 text-sm hover:underline">Delete</button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default CommunityPage;
