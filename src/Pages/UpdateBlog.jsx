import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AxiosService from "../Services/ApiServices";
import { toast } from "react-toastify";

const categories = ["Technology", "Health", "Travel", "Finance", "Others"];

export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const fetchBlogDetails = async () => {
    try {
      const token = localStorage.getItem("User-token");
      const res = await AxiosService.get(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        title: res.data.blog.title,
        category: res.data.blog.category,
        content: res.data.blog.content,
        image: res.data.blog.image,
      });
    } catch (error) {
      toast.error("Failed to load blog");
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("User-token");
      const res = await AxiosService.put(`/blogs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Blog title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Image URL"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}
