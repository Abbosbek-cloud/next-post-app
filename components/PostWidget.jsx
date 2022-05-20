import React, { useState, useEffect } from "react";
import moment from "moment";
import { getRecentPosts, getSimilarPosts } from "../services";
import Link from "next/link";
const PostWidget = ({ slug, categories }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((data) => setRelatedPosts(data));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg p-8 mb-8 rounded-lg">
      <h3 className="text-lg font-semibold mb-8">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              src={post.image.url}
              alt={post.title}
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>
          <div className="flex-grow ml-4 border-b text-indigo-800 hover:text-indigo-400 transition duration-200">
            <p className="text-gray-700 font-xs">
              {moment(post.createdAt).format("DD MMM YYYY")}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
