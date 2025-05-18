import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../Services/ApiServices";

const BlogCard = ({ blog, currentUserId, onDeleted }) => {
  const navigate = useNavigate();
  const { _id, title, category, content, image, createdAt, author, userId } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("User-token");
      const res = await AxiosService.delete(`/blogs/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message);
      if (onDeleted) onDeleted(_id);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={image || "https://source.unsplash.com/600x400/?blog,writing"}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium text-indigo-600">{category}</span>
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3">{content}</p>

        <div className="text-xs text-gray-500 mt-2">By {author || "Unknown"}</div>

        {currentUserId === userId._id && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate(`/edit-blog/${_id}`)}
              className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;

