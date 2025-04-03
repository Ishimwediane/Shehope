import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ totalPosts: 0, totalReports: 0, totalComments: 0 });
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewing, setViewing] = useState('');
  const [abuseType, setAbuseType] = useState(''); // For filtering reports
  const [selectedReportAbuseType, setSelectedReportAbuseType] = useState(''); // For reporting posts

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return console.error('No admin token found. Please log in again.');
      const response = await axios.get('http://localhost:5000/api/admin/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      await axios.delete(`http://localhost:5000/api/admin/posts/${postId}`, {
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
      await axios.delete(`http://localhost:5000/api/admin/posts/${postId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting comment:', error.response?.data || error.message);
    }
  };

  const handleReportSubmit = async (postId) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      await axios.post(`http://localhost:5000/api/reports/${postId}`, { abuseType: selectedReportAbuseType }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (error) {
      console.error('Error submitting report:', error.response?.data || error.message);
    }
  };

  const viewDetails = (post, type) => {
    setSelectedPost(post);
    setViewing(type);
  };

  return (
    <div className="ml-100 mt-20 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-2xl">{stats.totalPosts}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Reports</h2>
          <p className="text-2xl">{stats.totalReports}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Comments</h2>
          <p className="text-2xl">{stats.totalComments}</p>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Post</th>
            <th className="border p-2">Likes</th>
            <th className="border p-2">Comments</th>
            <th className="border p-2">Reports</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="text-center border-b">
              <td className="border p-2 truncate max-w-xs">{post.content}</td>
              <td className="border p-2">{post.likes?.length || 0}</td>
              <td className="border p-2">
                <button onClick={() => viewDetails(post, 'comments')} className="text-blue-500 underline">
                  {post.comments?.length || 0} View
                </button>
              </td>
              <td className="border p-2">
                <button onClick={() => viewDetails(post, 'reports')} className="text-red-500 underline">
                  {post.reports?.length || 0} View
                </button>
              </td>
              <td className="border p-2">
                <button onClick={() => deletePost(post._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Abuse Report Form */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <AiOutlineClose className="absolute top-2 right-2 text-xl cursor-pointer" onClick={() => setSelectedPost(null)} />
            <h2 className="text-lg font-bold mb-4">Report Abuse for Post</h2>
            
            <select
              value={selectedReportAbuseType}
              onChange={(e) => setSelectedReportAbuseType(e.target.value)}
              className="p-2 border rounded mb-4 w-full"
            >
              <option value="">Select Abuse Type</option>
              <option value="Offensive Language">Offensive Language</option>
              <option value="Harassment">Harassment</option>
              <option value="Spam">Spam</option>
              <option value="Misinformation">Misinformation</option>
            </select>

            <button
              onClick={() => handleReportSubmit(selectedPost._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit Report
            </button>
          </div>
        </div>
      )}

      {/* View Comments or Reports */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <AiOutlineClose className="absolute top-2 right-2 text-xl cursor-pointer" onClick={() => setSelectedPost(null)} />
            <h2 className="text-lg font-bold mb-4">{viewing === 'comments' ? 'Comments' : 'Reports'} for Post</h2>
            <div className="max-h-60 overflow-y-auto">
              {viewing === 'comments' ? (
                selectedPost.comments?.length > 0 ? (
                  selectedPost.comments.map((comment) => (
                    <div key={comment._id} className="border-b py-2 flex justify-between">
                      <p className="text-gray-700"><strong>{comment.user}</strong>: {comment.comment}</p>
                      <button onClick={() => deleteComment(selectedPost._id, comment._id)} className="text-red-500 text-sm">Delete</button>
                    </div>
                  ))
                ) : (<p className="text-gray-500">No comments available.</p>)
              ) : (
                selectedPost.reports?.length > 0 ? (
                  selectedPost.reports.map((report, index) => (
                    <div key={index} className="border-b py-2">
                      <p className="text-gray-700"><strong>{report.user}</strong>: {report.comment}</p>
                    </div>
                  ))
                ) : (<p className="text-gray-500">No reports available.</p>)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
