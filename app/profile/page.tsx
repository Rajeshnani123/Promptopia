"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfileSection = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data, "check");
      setPosts(data);
    };

    if (session?.user.id) fetchPost();
  }, []);

  const handleEdit = async (post: { _id: string }) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: { _id: string }) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const rep = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filterPrompts = posts.filter((p) => p._id !== post._id);
        console.log(rep, filterPrompts, "checking");
        setPosts(filterPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfileSection;
