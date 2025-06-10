import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const { axios } = useAppContext()

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="flex-1 px-4 sm:px-16 py-10 bg-gray-900 min-h-screen text-gray-200 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-green-500' : 'text-gray-400'
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="max-w-full mx-auto bg-gray-800 shadow-md rounded-lg overflow-x-auto mt-6">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-xs text-gray-400 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) =>
                filter === 'Approved' ? comment.isApproved === true : comment.isApproved === false
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
