import React, { useState, useEffect } from "react";
import {
  UserCircle,
  MessageSquare,
  Send,
  ThumbsUp,
  Share2,
  Image as ImageIcon,
  PlusCircle,
  Leaf,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [likes, setLikes] = useState({});

  // DEMO posts
  const demoPosts = [
    {
      id: "demo1",
      user: "Kisan Bhai",
      text: "Today I harvested fresh cauliflower 🥦! Feels great to see the result of hard work.",
      image:
        "https://wallpapercave.com/wp/wp2024155.jpg",
      likes: 15,
    },
    {
      id: "demo2",
      user: "Farmer Lakshmi",
      text: "Tips: Mix a bit of turmeric in soil to avoid fungal infections. 🌾💡",
      image: null,
      likes: 9,
    },
    {
      id: "demo3",
      user: "Anand Kisan",
      text: "Rainy day in the fields today. Crops are happy!",
      image:
        "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80",
      likes: 23,
    },
  ];

  useEffect(() => {
    setPosts(demoPosts);
  }, []);

  const handlePost = () => {
    if (!newPost.trim() && !image) return;
    const newDemoPost = {
      id: uuidv4(),
      user: "You",
      text: newPost,
      image: image ? URL.createObjectURL(image) : null,
      likes: 0,
    };
    setPosts([newDemoPost, ...posts]);
    setNewPost("");
    setImage(null);
    setModalOpen(false);
  };

  const handleLike = (postId) => {
    const newLikes = { ...likes };
    newLikes[postId] = (newLikes[postId] || 0) + 1;
    setLikes(newLikes);
  };

  return (
    <div className="min-h-screen bg-[#f7fdf8] pb-24 relative">
      {/* Header */}
      <div className="bg-green-700 text-white py-4 px-5 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Leaf size={24} /> FarmerGram
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="hover:scale-105 transition-transform"
        >
          <PlusCircle size={28} />
        </button>
      </div>

      {/* Posts Feed */}
      <div className="p-4 space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 p-3">
              <UserCircle className="text-green-600" size={28} />
              <span className="font-semibold text-gray-800">{post.user}</span>
            </div>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="w-full max-h-[400px] object-cover"
              />
            )}

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-700 mb-3">{post.text}</p>
              <div className="flex gap-6 text-sm text-gray-600">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 hover:text-green-600"
                >
                  <ThumbsUp size={16} />
                  <span>{(post.likes || 0) + (likes[post.id] || 0)} Like</span>
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <MessageSquare size={16} />
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-600">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-green-700">New Post</h2>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Share your thoughts, farmer..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center gap-2 text-green-600 cursor-pointer hover:text-green-800">
                <ImageIcon size={20} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <span className="text-xs text-gray-600">{image.name}</span>
                )}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-6">
        © {new Date().getFullYear()} FarmerGram — Growing Together 🌱
      </footer>
    </div>
  );
};

export default Community;
