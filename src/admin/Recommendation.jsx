import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Recommendation = () => {
  const [blogs, setBlogs] = useState([]);
  const [tips, setTips] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", link: "", trimester: "", image: "", id: null });
  const [activeTab, setActiveTab] = useState("blog"); // State to track active tab
  const [tipFormData, setTipFormData] = useState({ message: "", trimester: "", icon: "", id: null }); // For tips
  const [successMessage, setSuccessMessage] = useState(""); // To show success messages
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    const token = localStorage.getItem("adminToken"); // Retrieve token from local storage
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const blogsRes = await axios.get(`https://shehope-server-1.onrender.com/api/admin/blogs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tipsRes = await axios.get(`https://shehope-server-1.onrender.com/api/admin/tips`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs(blogsRes.data);
      setTips(tipsRes.data);
    } catch (error) {
      console.error("Error fetching data", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id, type) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      if (type === "blogs") {
        await axios.delete(`https://shehope-server-1.onrender.com/api/admin/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.delete(`https://shehope-server-1.onrender.com/admin/tips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting", error.response?.data || error.message);
    }
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
  
    // Check if all required fields are filled
    if (!formData.title || !formData.content || !formData.trimester) {
      console.error('All fields are required!');
      return; // Prevent submission if fields are missing
    }
  
    try {
      const formDataToSend = {
        title: formData.title,
        content: formData.content,
        trimester: formData.trimester,
        link: formData.link,
        image: formData.image,
        userId: userId,
      };
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      if (formData.id) {
        // Update the blog if an ID exists
        await axios.put(`https://shehope-server-1.onrender.com/api/admin/blogs/${formData.id}`, formDataToSend, { headers });
        toast.success('Blog updated successfully!');
      } else {
        // Create a new blog
        await axios.post('https://shehope-server-1.onrender.com/api/admin/blogs', formDataToSend, { headers });
        toast.success('Blog created successfully!');
      }
  
      fetchData();
      setIsOpen(false);
     
    } catch (error) {
      console.error('Error creating/updating blog', error.response?.data || error.message);
    }
  };
  
  
  

  const handleSubmitTip = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken"); 
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const tipData = {
        message: tipFormData.message,
        trimester: tipFormData.trimester,
        icon: tipFormData.icon,
      };

      if (tipFormData.id) {
        await axios.put(`http://localhost:5000/api/admin/tips/${tipFormData.id}`, tipData, {
          headers: { Authorization: `Bearer ${token}` },
          
        });
        toast.success('Tip updated successfully!');
      } else {
        await axios.post("http://localhost:5000/api/admin/tips", tipData, {
          headers: { Authorization: `Bearer ${token}` },
        }
    
    );
    toast.success('Tip created successfully!');
      }

      fetchData();
      setIsOpen(false);
    
    } catch (error) {
      console.error("Error creating/updating tip", error.response?.data || error.message);
    }
  };

  const handleEditBlog = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      trimester: blog.trimester,
      link: blog.link,
      image: blog.image,
      id: blog._id,
    });
    setIsOpen(true);
  };

  const handleEditTip = (tip) => {
    setTipFormData({
      message: tip.message,
      trimester: tip.trimester,
      icon: tip.icon,
      id: tip._id,
    });
    setIsOpen(true);
  };

  return (
    <div className="ml-64 mt-20 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Blogs & Tips</h1>
        <div>
        <button
  onClick={() => {
    setActiveTab("blog");
    setFormData({ title: "", content: "", link: "", trimester: "", image: ""});  // Reset blog form
    setIsOpen(true);
  }}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Create Blog
</button>
<button
  onClick={() => {
    setActiveTab("tip");
    setTipFormData({ message: "", trimester: "", icon: "", id: null });  // Reset tip form
    setIsOpen(true);
  }}
  className="bg-green-500 text-white px-4 py-2 rounded ml-4"
>
  Create Tip
</button>

        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mb-4 rounded">{successMessage}</div>
      )}

      {/* Tab Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("blog")}
          className={`px-4 py-2 mr-4 rounded ${activeTab === "blog" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Blog
        </button>
        <button
          onClick={() => setActiveTab("tip")}
          className={`px-4 py-2 rounded ${activeTab === "tip" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Tip
        </button>
      </div>

      {/* Conditional Rendering of Tables */}
      {activeTab === "blog" && (
        <>
          <h2 className="text-xl font-semibold mb-2">Blogs</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Trimester</th>
                <th className="border p-2">Content</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Link</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="border p-2">{blog.title}</td>
                  <td className="border p-2">{blog.trimester}</td>
                  <td className="border p-2">{blog.content.substring(0, 50)}...</td>
                  <td className="border p-2">
                    {blog.image && <img src={blog.image} alt={blog.title} className="w-20 h-12 object-cover" />}
                  </td>
                  <td className="border p-2">{blog.link}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEditBlog(blog)} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => handleDelete(blog._id, "blogs")} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "tip" && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">Tips</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Message</th>
                <th className="border p-2">Trimester</th>
                <th className="border p-2">Icon</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tips.map((tip) => (
                <tr key={tip._id}>
                  <td className="border p-2">{tip.message}</td>
                  <td className="border p-2">{tip.trimester}</td>
                  <td className="border p-2">{tip.icon}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEditTip(tip)} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => handleDelete(tip._id, "tips")} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    
{isOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-1/2">
      <button
        className="absolute top-2 right-2 text-xl"
        onClick={() => setIsOpen(false)}
      >
        ×
      </button>
      
      {activeTab === "blog" && (
        <form onSubmit={handleSubmitBlog}>
          <h3 className="text-xl font-semibold mb-4">Create Blog</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Link</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Trimester</label>
            <input
              type="text"
              value={formData.trimester}
              onChange={(e) => setFormData({ ...formData, trimester: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
             type="url"
             value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
            Save Blog
          </button>
        </form>
      )}
      
      {activeTab === "tip" && (
        <form onSubmit={handleSubmitTip}>
          <h3 className="text-xl font-semibold mb-4">Create Tip</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <input
              type="text"
              value={tipFormData.message}
              onChange={(e) => setTipFormData({ ...tipFormData, message: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Trimester</label>
            <input
              type="text"
              value={tipFormData.trimester}
              onChange={(e) => setTipFormData({ ...tipFormData, trimester: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Icon</label>
            <input
              type="text"
              value={tipFormData.icon}
              onChange={(e) => setTipFormData({ ...tipFormData, icon: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">
            Save Tip
          </button>
        </form>
      )}
    </div>
  </div>
)}
 <ToastContainer />
    
    </div>
  );
};

export default Recommendation;
