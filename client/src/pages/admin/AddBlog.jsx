import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'

const AddBlog = () => {
  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {
  if (!title) return toast.error('Please enter a title');

  try {
    setLoading(true);
    const { data } = await axios.post('/api/blog/generate', { prompt: title });
    if (data.success) {
      quillRef.current.root.innerHTML = parse(data.content);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.message === "Demo account is read-only"
    ) {
      toast.error("Access denied: Demo login is read-only.");
    } else {
      toast.error(error.response?.data?.message || error.message);
    }
  } finally {
    setLoading(false);
  }
};


const onSubmitHandler = async (e) => {
  e.preventDefault();
  setIsAdding(true);

  const blog = {
    title,
    subTitle,
    description: quillRef.current.root.innerHTML,
    category,
    isPublished,
  };

  try {
    const formData = new FormData();
    formData.append('blog', JSON.stringify(blog));
    formData.append('image', image);

    const { data } = await axios.post('/api/blog/add', formData);

    if (data.success) {
      toast.success(data.message);
      setImage(null);
      setTitle('');
      setSubTitle('');
      quillRef.current.root.innerHTML = '';
      setCategory('Startup');
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.message === "Demo account is read-only"
    ) {
      toast.error("Access denied: Demo login is read-only.");
    } else {
      toast.error(error.response?.data?.message || error.message);
    }
  } finally {
    setIsAdding(false);
  }
};


  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-800 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl mx-auto p-6 sm:p-10 my-8 shadow-md rounded-lg space-y-6">

        <div>
          <p className="font-medium text-sm mb-1">Upload Blog Thumbnail</p>
          <label htmlFor="image" className="block w-fit cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Preview"
              className="h-28 w-28 object-cover rounded border border-gray-300"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              accept="image/*"
              required
            />
          </label>
        </div>

        <div>
          <p className="font-medium text-sm mb-1">Blog Title</p>
          <input
            type="text"
            placeholder="Type here"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-primary"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div>
          <p className="font-medium text-sm mb-1">Sub Title</p>
          <input
            type="text"
            placeholder="Type here"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-primary"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />
        </div>

        <div>
          <p className="font-medium text-sm mb-1">Blog Description</p>
          <div className="relative border border-gray-300 rounded max-w-lg overflow-hidden">
            <div ref={editorRef} className="p-2 h-64 overflow-y-auto" />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                <div className="w-6 h-6 border-2 border-t-black rounded-full animate-spin" />
              </div>
            )}
            <button
              type="button"
              onClick={generateContent}
              disabled={loading}
              className="absolute bottom-2 right-2 bg-black text-white text-xs px-4 py-1 rounded hover:opacity-90"
            >
              Generate with AI
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-1">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="px-3 py-2 w-full border border-gray-300 rounded text-gray-600"
          >
            <option value="">Select category</option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Publish Now</label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer accent-primary"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isAdding}
            className="w-full sm:w-40 h-10 bg-primary text-white rounded hover:opacity-90 transition-all"
          >
            {isAdding ? 'Adding...' : 'Add Blog'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddBlog
