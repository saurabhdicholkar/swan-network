import React, { useState, useEffect } from 'react';
import { useWallet } from './WalletProvider';
import './App.css';

function App() {
  const { publicKey, connectWallet } = useWallet();
  const [postInput, setPostInput] = useState('');
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('swan-posts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('swan-posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postInput.trim() === '') return;
    const newPost = {
      id: Date.now(),
      user: publicKey,
      text: postInput,
      timestamp: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setPostInput('');
  };

  return (
    <div className="App">
      <h1>🦢 Swan</h1>
      {!publicKey ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected as: {publicKey}</p>
          <div className="post-box">
            <textarea
              placeholder="What's happening?"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
            />
            <button onClick={handlePost}>Post</button>
          </div>
          <div className="feed">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <p><strong>{post.user}</strong></p>
                <p>{post.text}</p>
                <p className="timestamp">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
