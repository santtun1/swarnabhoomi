import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {
  UserCircle,
  MessageSquare,
  Send,
  ThumbsUp,
  Leaf,
} from "lucide-react";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const q = query(collection(db, "community"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handlePost = async () => {
    if (newPost.trim() === "") return;
    await addDoc(collection(db, "community"), {
      text: newPost,
      user: auth.currentUser?.displayName || "Anonymous Farmer",
      timestamp: new Date(),
      likes: 0,
    });
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-[#f4f9f4] p-6">
      {/* Header */}
      <header className="bg-green-700 text-white py-6 px-4 rounded-xl shadow-md mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Leaf size={28} /> Farmer Community Hub
        </h1>
        <p className="text-sm opacity-80">🌾 Grow Together, Learn Together</p>
      </header>

      {/* Post Input Box */}
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
          placeholder="Share your experience, ask a question, or give advice to fellow farmers..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handlePost}
            className="mt-3 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-all"
          >
            <Send size={16} /> Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <UserCircle size={24} className="text-green-600" />
              <span className="font-semibold text-gray-700">{post.user}</span>
            </div>
            <p className="text-gray-800 text-base">{post.text}</p>
            <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-green-600">
                <ThumbsUp size={16} />
                <span>{post.likes} Likes</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <MessageSquare size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Farmer Community Hub. Built with 🌱 by Students for Farmers.
      </footer>
    </div>
  );
};

export default CommunityPage;
