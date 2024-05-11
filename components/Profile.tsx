import React from "react";
import PromptCard from "./PromptCard";

interface ProfileType {
  name: string;
  desc: string;
  data: Array<Post>;
  handleDelete: Function;
  handleEdit: Function;
}

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

const Profile = ({
  name,
  desc,
  data,
  handleDelete,
  handleEdit,
}: ProfileType) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
