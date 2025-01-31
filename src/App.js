import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

export default function Component() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState('');
  const [lastPostTime, setLastPostTime] = useState(0);
  const [nextId, setNextId] = useState(123456793);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReplies = () => {
    setIsLoading(true);
    fetch('/api/comments')
      .then(res => res.json())
      .then(data => {
        const adjustedReplies = data.map(reply => ({
          ...reply,
          timestamp: new Date(reply.timestamp).toLocaleString(),
        }));
        setReplies(adjustedReplies);
        const maxId = Math.max(...data.map(reply => parseInt(reply._id, 10)));
        setNextId(maxId + 1);
      })
      .catch(err => console.error('Error fetching comments:', err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    const now = Date.now();
    if (now - lastPostTime < 10000) {
      setError('You must wait 10 seconds between posts');
      return;
    }

    if (!comment.trim()) {
      setError('Comment is required');
      return;
    }

    const newReply = {
      name: name.trim() || 'Anonymous',
      comment: comment.trim(),
      isSpoiler,
      timestamp: new Date().toLocaleString(),
      _id: nextId.toString(),
    };

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReply),
    })
      .then((res) => res.json())
      .then((data) => {
        const adjustedData = {
          ...data,
          timestamp: new Date(data.timestamp).toLocaleString(),
        };
        setReplies([...replies, adjustedData]);
        setName('');
        setComment('');
        setIsSpoiler(false);
        setLastPostTime(now);
        setNextId(nextId + 1);
      })
      .catch((err) => console.error('Error submitting comment:', err));
  };

  return (
    <>
      <div className="bg-[#4c5b8c] min-h-screen font-sans text-[13px] text-[#000000]">
        {/* Header */}
        <header className="bg-[#D1D5EE] border-b border-[#B7C5D9] p-1">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex space-x-4">
              <a href="https://x.com/" className="text-[#34345C] font-bold">[Twitter/X]</a>
              <a href="https://t.me/" className="text-[#34345C] font-bold">[Telegram]</a>
              <a href="https://pump.fun/board" className="text-[#34345C] font-bold">[Pump]</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-[#34345C] font-bold">[a]</a>
              <a href="#" className="text-[#34345C] font-bold">[b]</a>
              <a href="#" className="text-[#34345C] font-bold">[c]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[d]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[e]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[f]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[g]</a>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-2">
          <div className="bg-[#D6DAF0] p-2 mb-4">
            <h1 className="text-[#AF0A0F] font-bold text-lg">/t/ - truth</h1>
            <p className="text-xs mt-1">CA: uploading...</p>
          </div>

          {/* Thread */}
          <div className="bg-[#D6DAF0] p-2 mb-4">
            {/* Original Post */}
            <div className="p-2 bg-[#caeaff]">
              <div className="flex items-start space-x-2">
                <img
                  src="/drone.gif"
                  alt="Post image"
                  className="w-[100px] md:w-[150px] border border-[#D9BFB7]" />
                <div>
                  <div>
                    <span className="font-bold text-[#117743]">Anonymous</span>
                    <span className="text-xs"> 12/16/24, 3:33:56 PM No.123456789</span>
                  </div>
                  <div className="text-xs mt-1">File: <span className="text-[#0000EE]">drone.gif</span> (39 KB, 250x250)</div>
                  <p className="mt-2 whitespace-pre-wrap">
                    Hey /d/,

                    just wanted to make a post regarding the drone scare. I'm worried the government won't tell us the truth and we're all fucked. my neighbor said they are looking for a missing nuclear missile!? wtf! what do y'all think?
                  </p>
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="mt-2 space-y-2">
              <div className="p-2 bg-[#caeaff]">
                <div>
                  <span className="font-bold text-[#117743]">Anonymous</span>
                  <span className="text-xs"> 12/16/24, 3:34:03 PM No.123456790</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">
                  decode this: 01001010 01100101 01110111 01110011 00100000 01100001 01110010 01100101 00100000 01110100 01100001 01101011 01101001 01101110 01100111 00100000 01101111 01110110 01100101 01110010
                </p>
              </div>

              <div className="p-2 bg-[#caeaff]">
                <div className="flex items-start space-x-2">
                  <img
                    src="/blue.png"
                    alt="Reply image"
                    className="w-[100px] h-[100px] border border-[#D9BFB7]" />
                  <div>
                    <div>
                      <span className="font-bold text-[#117743]">Anonymous</span>
                      <span className="text-xs"> 12/16/24, 4:35:30 PM No.123456791</span>
                    </div>
                    <div className="text-xs mt-1">File: <span className="text-[#0000EE]">beam.jpg</span> (15 KB, 100x100)</div>
                    <p className="mt-2 whitespace-pre-wrap">
                      If you want real answers, look into Project Blue Beam.

                      Wake up, sheeple
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-[#caeaff]">
                <div>
                  <span className="font-bold text-[#117743]">Anonymous</span>
                  <span className="text-xs"> 12/16/24, 4:35:56 PM No.123456792</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">
                  Drones are just the start. Just watch
                </p>
              </div>

              <div className="p-2 bg-[#caeaff]">
                <div>
                  <span className="font-bold text-[#117743]">Anonymous</span>
                  <span className="text-xs"> 12/16/24, 4:45:56 PM No.123456792</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">
                  Is Elon in on this? hope not!
                </p>
              </div>

              {/* New replies */}
              {replies.map((reply) => (
                <div key={reply._id} className="p-2 bg-[#caeaff]">
                  <div>
                    <span className="font-bold text-[#117743]">{reply.name}</span>
                    <span className="text-xs"> {reply.timestamp} No.{reply._id}</span>
                  </div>
                  <p className={`mt-2 whitespace-pre-wrap ${reply.isSpoiler ? 'bg-black text-black hover:bg-transparent hover:text-inherit' : ''}`}>
                    {reply.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Form */}
          <div className="bg-[#D6DAF0] p-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-[#0F0C5D]">Reply to Thread No.123456789</h3>
              <button 
                onClick={fetchReplies} 
                disabled={isLoading}
                className="text-[#34345C] hover:text-[#0F0C5D] disabled:text-gray-400"
                title="Reload replies"
              >
                <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form className="space-y-2" onSubmit={handleFormSubmit}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (optional)"
                  className="w-1/3 bg-[#caeaff] border-[#B7C5D9] p-1" />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment (required)"
                className="w-full h-24 bg-[#caeaff] border-[#B7C5D9] p-1"
                required />
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  className="bg-[#0F0C5D] text-white p-1 hover:bg-[#0A0A3F] disabled:bg-gray-400"
                  disabled={!comment.trim()}
                >
                  Post
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="spoiler"
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)} />
                <label htmlFor="spoiler" className="text-[#34345C]">Spoiler</label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center py-2 bg-[#D6DAF0] text-xs px-[5%]'>
        <div className='text-center'>All trademarks and copyrights on this page are owned by their respective parties. Images uploaded are the responsibility of the Poster. Comments are owned by the Poster.</div>
      </div>
    </>
  );
}