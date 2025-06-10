import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import BlogTableItem from '../../components/admin/BlogTableItem'

const ListBlog = () => {
  const [blogs, setBlogs] = useState([])
  const { axios } = useAppContext()

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')
      if (data.success) {
        setBlogs(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 px-4 sm:px-16 py-5 bg-gray-100 text-black min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">📝 All Blogs</h1>

      <div className="bg-rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left text-black">
          <thead className="text-xs uppercase bg-neutral-800 text-gray-400">
            <tr>
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4 hidden md:table-cell">Date</th>
              <th className="px-4 py-4 hidden md:table-cell">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog
