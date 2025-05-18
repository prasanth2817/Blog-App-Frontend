import { useEffect, useState } from "react";
import FilterSidebar from "../Components/SidebarFilter";
import BlogCard from "../Components/BlogCard";
import AxiosService from "../Services/ApiServices";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filters, setFilters] = useState({ author: "", category: "All" });
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {};

      if (filters.author.trim())
        params.author = filters.author.trim();
      if (filters.category && filters.category !== "All") {
        params.category = filters.category;
      }

      const res = await AxiosService.get("/blogs", { params });
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
  {/* Sidebar */}
  <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-white">
    <FilterSidebar onApply={setFilters} />
  </div>

  {/* Blogs */}
  <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
    {loading ? (
      <p>Loading blogs...</p>
    ) : blogs.length > 0 ? (
      blogs.map((blog) => (
        <div key={blog._id} className="mx-auto w-full max-w-2xl">
          <BlogCard blog={blog} />
        </div>
      ))
    ) : (
      <p>No blogs found for the selected filters.</p>
    )}
  </div>
</div>
</>
  );
}
