"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./PromptCard";

interface Post {
  _id: string;
  prompt: string;
  creator: {
    image: string;
    username: string;
    email: string;
  };
  tag: string;
}

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Array<Post>;
  handleTagClick: Function;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for the prompt or user"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
