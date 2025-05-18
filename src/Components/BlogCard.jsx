import React from "react";

const BlogCard = ({ blog }) => {
  const {
    title,
    category,
    content,
    image,
    createdAt,
    author,
  } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={image || "/placeholder.jpg"}
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

        <p className="text-gray-600 text-sm line-clamp-3">
          {content}
        </p>

        <div className="text-xs text-gray-500 mt-2">
          By {author?.name || "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

