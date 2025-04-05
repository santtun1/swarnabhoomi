import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { UserCircle, MessageSquare, Send, ThumbsUp } from "lucide-react";

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
      user: auth.currentUser?.displayName || "Anonymous",
      timestamp: new Date(),
      likes: 0,
    });
    setNewPost("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Farmer Community Hub 🌾</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Share your experience, ask a question..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button
          onClick={handlePost}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
        >
          <Send size={16} /> Post
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-2">
              <UserCircle size={24} className="text-gray-500" />
              <span className="font-semibold text-gray-700">{post.user}</span>
            </div>
            <p className="text-gray-800">{post.text}</p>
            <div className="flex items-center space-x-4 mt-2 text-gray-600">
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <ThumbsUp size={16} />
                <span>{post.likes} Likes</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-green-500">
                <MessageSquare size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;