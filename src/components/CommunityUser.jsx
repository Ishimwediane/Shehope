import { useState, useEffect } from "react";
import { FaRegComment, FaHeart, FaExclamationCircle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchPosts = async () => {
  const response = await fetch("https://shehope-server-1.onrender.com/api/posts");
  return response.json();
};

const postMessage = async (postData) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("You must be logged in to post!");
    console.error("No token found, user is not authenticated");
    return;
  }

  try {
    const response = await fetch("https://shehope-server-1.onrender.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to post message:", errorData);
      return;
    }

    const newPost = await response.json();
    console.log("Post added successfully:", newPost);
    return newPost;
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

const likePost = async (postId) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("You must be logged in to like a post!");
    console.error("No token found, user is not authenticated");
    return;
  }

  try {
    const response = await fetch(`https://shehope-server-1.onrender.com/api/posts/like/${postId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to like post:", errorData);
      return;
    }

    const data = await response.json();
    console.log("Post liked successfully:", data);
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

const commentOnPost = async (postId, commentText) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No token found, user is not authenticated");
    return;
  }

  try {
    const response = await fetch(`https://shehope-server-1.onrender.com/api/posts/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: commentText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to post comment:", errorData);
      return;
    }

    const updatedPost = await response.json();
    console.log("Comment added successfully:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

const reportPost = async (postId, reportData) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("You must be logged in to report a post!");
    return;
  }

  try {
    const response = await fetch(`https://shehope-server-1.onrender.com/api/posts/report/${postId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Failed to report post: ${errorData.message}`);
      return;
    }

    toast.success("Post reported successfully!");  // Show success notification
  } catch (error) {
    console.error("Error reporting post:", error);
    alert("An error occurred while reporting the post.");
  }
};

const CommunityUser = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");
  const [abuseType, setAbuseType] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    getPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      content: newPostContent,
      author: "JohnDoe",
      profileName: "John Doe",
    };

    await postMessage(newPost);
    setNewPostContent("");

    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = async (postId, comment) => {
    if (!comment.trim()) return;

    const updatedPost = await commentOnPost(postId, comment);

    if (updatedPost) {
      setPosts(prevPosts =>
        prevPosts.map(post => (post._id === updatedPost._id ? updatedPost : post))
      );
    }

    setCommentText(""); // Clear the input after submitting
  };

  const handleReportSubmit = async () => {
    const reportData = {
      abuseType: abuseType,
      reason: reportReason,
      comment: reportComment,
    };

    await reportPost(currentPostId, reportData);
    setIsReportModalOpen(false); // Close the modal after submitting the report
    setReportReason(""); // Clear the report reason
    setReportComment(""); // Clear the report comment
    setAbuseType(""); // Clear the abuse type
  };

  return (
    <div className="max-w-2xl mt-12 mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Discussions</h1>

      <div className="mb-4 bg-white p-4 rounded-xl shadow-md">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
          placeholder="Share your thoughts..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button
          onClick={handlePostSubmit}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Post
        </button>
      </div>

      {/* Display Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="p-4 rounded-xl shadow-lg bg-white">
            <h2 className="font-bold text-lg">{post.content}</h2>
            <p className="text-sm text-gray-500">
              By <span className="font-semibold text-blue-600">{post.profileName}</span>
            </p>

            <div className="flex items-center mt-3 text-gray-500 text-sm">
              <span
                className="flex items-center mr-4 cursor-pointer"
                onClick={() => likePost(post._id)}
              >
                <FaHeart className="mr-1 text-red-500" /> {post.likes?.length || 0} Likes
              </span>

              <span
                className="flex items-center mr-4 cursor-pointer"
                onClick={() => setShowComments(post._id)} // Toggle visibility of comments
              >
                <FaRegComment className="mr-1" /> {post.comments?.length || 0} Comments
              </span>

              <span
                className="flex items-center text-red-500 cursor-pointer"
                onClick={() => {
                  setIsReportModalOpen(true); // Open the report modal
                  setCurrentPostId(post._id); // Set the current post ID
                }}
              >
                <FaExclamationCircle className="mr-1" /> Report
              </span>
            </div>

            {/* Comments Section */}
            {post._id === showComments && (
              <div>
                <div className="border-t pt-2 mt-2 text-sm">
                  {post.comments?.map((comment, index) => (
                    <div key={index}>
                      <strong>{comment.user}:</strong> {comment.comment}
                    </div>
                  ))}

                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-xl mt-2"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl"
                    onClick={() => handleCommentSubmit(post._id, commentText)} // Submit the comment
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Report Post</h2>
            
            {/* Abuse Type Dropdown */}
            <select
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
              value={abuseType}
              onChange={(e) => setAbuseType(e.target.value)}
            >
              <option value="">Select Abuse Type</option>
              <option value="Offensive Language">Offensive Language</option>
              <option value="Harassment">Harassment</option>
              <option value="Spam">Spam</option>
              <option value="Misinformation">Misinformation</option>
            </select>

            {/* Reason Textarea */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
              placeholder="Enter reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            />

            {/* Additional Comment */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
              placeholder="Add additional comment..."
              value={reportComment}
              onChange={(e) => setReportComment(e.target.value)}
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default CommunityUser;
