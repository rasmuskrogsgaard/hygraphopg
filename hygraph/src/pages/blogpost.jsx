import { useQuery } from "@tanstack/react-query";
import { blogPost } from "../queries/blog";
import { request } from "graphql-request";
import { useState, useEffect } from "react";

export const BlogPost = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["NewBlog"],
    queryFn: async () =>
      request(
        `https://api-eu-west-2.hygraph.com/v2/clnbdl2o887v601ugcw3030o6/master`,
        blogPost,
        { id: "Blog" }
      ),
  });

  const [sortOption, setSortOption] = useState("date");
  const [showTodayOnly, setShowTodayOnly] = useState(false);

  console.log("BlogPost", data);

  useEffect(() => {
    if (showTodayOnly) {
     
      setSortOption("date");
    }
  }, [showTodayOnly]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p> error: {error.message} </p>;

  const blogs = data?.blogs;

  
  const sortByDate = () => {
    const sortedBlogs = [...blogs].sort((a, b) =>
      b.postDate.localeCompare(a.postDate)
    );
    return sortedBlogs;
  };

  
  const sortByTitle = () => {
    const sortedBlogs = [...blogs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return sortedBlogs;
  };

  const filterByToday = () => {
    const today = new Date().toISOString().split("T")[0];
    const filteredBlogs = blogs.filter((blog) => blog.postDate === today);
    return filteredBlogs;
  };

  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  
  const handleShowTodayPosts = () => {
    setShowTodayOnly(true);
  };


  const handleShowAllPosts = () => {
    setShowTodayOnly(false);
  };


  let displayedBlogs =
    sortOption === "date"
      ? sortByDate()
      : sortOption === "title"
      ? sortByTitle()
      : blogs || [];

  if (showTodayOnly) {
    displayedBlogs = filterByToday();
  }

  return (
    <div>
      <div>
        <select onChange={handleSortChange}>
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
        <button onClick={handleShowTodayPosts}>
          Today's Posts
        </button>
        <button onClick={handleShowAllPosts}>All Posts</button>
      </div>
      {displayedBlogs.map((blog, index) => (
        <div key={index} className="blogCards">
          <p>{blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>Post Content: {blog.postContent}</p>
          <p>Post Date: {blog.postDate}</p>
        </div>
      ))}
    </div>
  );
};
