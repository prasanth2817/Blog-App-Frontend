import { useEffect, useState } from "react";
import AxiosService from "../Services/ApiServices";
import { toast } from "react-toastify";
import BlogCard from "../Components/BlogCard";
import { jwtDecode } from "jwt-decode";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("User-token");
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);

        const res = await AxiosService.get(`/blogs/user/:${userId}`);
        setBlogs(res.data.blogs);
      } catch (error) {
        toast.error("Failed to load your blogs");
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogDelete = (deletedId) => {
    setBlogs((prev) => prev.filter((b) => b._id !== deletedId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-600">You haven't created any blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              currentUserId={userId}
              onDeleted={handleBlogDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
