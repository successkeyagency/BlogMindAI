import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaRedditAlien,
} from "react-icons/fa6";
import DownloadApp from "../components/DownloadApp";
import ImageSlider from "../components/ImageSlider";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative bg-black min-h-screen text-white font-sans">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 -z-10 w-full opacity-5 pointer-events-none"
      />

      <Navbar />

      <div className="mt-24 px-4 max-w-5xl mx-auto">
        <p className="text-sm text-primary text-center italic mb-2">
          🕓 {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4 tracking-tight leading-tight">
          {data.title}
        </h1>
        <h2 className="text-center text-lg md:text-2xl text-white/60 italic mb-6">
          {data.subTitle}
        </h2>
        <p className="text-center inline-block py-1 px-4 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-12">
          ✍️ SuccessKeyAgency LLC
        </p>

        <div className="bg-white/5 p-5 rounded-xl shadow-md border border-white/10 mb-12 flex flex-wrap justify-between items-center text-white/80 text-sm">
          <span>
            🏷️ Tags:{" "}
            <em className="text-white font-medium">Tech, AI, Modern Web</em>
          </span>
          <span>
            ⏱️ Estimated read: <strong className="text-white">5 mins</strong>
          </span>
        </div>

        <div className="mb-12 relative group">
          <img
            src={data.image}
            alt="Blog cover"
            className="rounded-3xl shadow-2xl w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="rich-text text-gray-200 leading-relaxed prose prose-invert max-w-3xl mx-auto text-lg">
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>

        <section className="mt-14 mb-20 text-center max-w-3xl mx-auto">
          <p className="font-semibold mb-4 text-white/80 text-lg">
            📢 Share this article
          </p>
          <div className="flex justify-center gap-5">
            <a
              href="#"
              className="text-white hover:text-blue-500 transition-transform hover:scale-110"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-sky-400 transition-transform hover:scale-110"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-600 transition-transform hover:scale-110"
            >
              <FaLinkedinIn size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-400 transition-transform hover:scale-110"
            >
              <FaRedditAlien size={24} />
            </a>
          </div>
        </section>

        <section className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">
            🗣️ Community Feedback ({comments.length})
          </h3>
          <div className="space-y-6">
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={assets.user_icon} alt="user" className="w-7 h-7" />
                  <p className="font-semibold text-white/90">{item.name}</p>
                </div>
                <p className="text-sm text-white/70 ml-9">{item.content}</p>
                <div className="flex items-center justify-between mt-2 ml-9">
                  <div className="flex gap-4 text-white/60 text-sm">
                    <button
                      onClick={() => toast.success("👍 Thanks for your vote!")}
                      className="hover:text-white transition"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => toast.success("👎 Noted!")}
                      className="hover:text-white transition"
                    >
                      👎
                    </button>
                  </div>
                  <p className="text-xs text-right text-white/40">
                    {Moment(item.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mt-15 mb-10 max-w-3xl mx-auto bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
          <h3 className="text-xl font-bold mb-4">💬 Drop a Comment</h3>
          <form onSubmit={addComment} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="What's on your mind?"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 h-32 rounded bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-all w-full font-semibold"
            >
              🚀 Post Comment
            </button>
          </form>
        </section>
      </div>
      <ImageSlider />

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
