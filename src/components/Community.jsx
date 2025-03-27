import { useState } from "react";
import { FaRegComment, FaHeart, FaPoll } from "react-icons/fa";

const CommunitySection = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Poll: EDD August 20th-31st 🥰",
      author: "ashsmith91",
      group: "August 2025 Birth Club",
      content:
        "Hey yall! 👋 Since we don't seem to have an EDD thread for our window, figured I would make us one! Comment below your EDD & if you know what you're having! 🥰",
      date: "03-25-25",
      likes: 0,
      comments: 76,
      votes: 171,
    },
    {
      id: 2,
      title: "2nd trimester 💙💖",
      author: "mcaza",
      group: "August 2025 Birth Club",
      content:
        "By now everyone should be in the midst of the 2nd trimester!! Some things to expect: First kicks or quickening New symptoms Visible baby bumps 🤰 Anatomy scan scheduling Baby will be...",
      date: "03-26-25",
      likes: 15,
      comments: 44,
      votes: 0,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    const newEntry = {
      id: posts.length + 1,
      title: newPost,
      author: "User123",
      group: "Community Group",
      content: newPost,
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: 0,
      votes: 0,
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  return (
    <div className="max-w-2xl mt-12 mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Discussions</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <h2 className="font-bold text-lg text-gray-900">{post.title}</h2>
            <p className="text-sm text-gray-500">
              By <span className="font-semibold text-blue-600">{post.author}</span> in 
              <span className="text-blue-500"> {post.group}</span>
            </p>
            <p className="mt-2 text-gray-700">{post.content}</p>
            <div className="flex items-center mt-3 text-gray-500 text-sm">
              <span className="flex items-center mr-4">
                <FaRegComment className="mr-1" /> {post.comments}
              </span>
              <span className="flex items-center mr-4">
                <FaHeart className="mr-1 text-red-500" /> {post.likes}
              </span>
              <span className="flex items-center">
                <FaPoll className="mr-1 text-green-500" /> {post.votes} votes
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 bg-white p-4 rounded-xl shadow-md">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          placeholder="Write something..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={handlePostSubmit}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunitySection;
