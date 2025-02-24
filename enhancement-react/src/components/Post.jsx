import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postList } from "../redux/postSlice";
import { deletePost, createPost, updatePost } from "../redux/postSlice";

const Post = () => {
  const dispatch = useDispatch();
  const { isPending, pst } = useSelector((state) => state.posts.posts);
  const [newpost, setnewpost] = useState({
    title: "",
    body: "",
  });

  const [editingPost, seteditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(postList());
      } catch (error) {
        console.log("error occur when fetch posts !!", error.message);
      }
    };
    fetchPosts();
  }, [dispatch]);

  const handleCreatePost = async () => {
    await dispatch(createPost(newpost));
  };

  const handlePostUpdate = async () => {
    await dispatch(updatePost({ id: editingPost.id, updatepost: editingPost }));
  };

  const handlePostDelete = async (postid) => {
    await dispatch(deletePost(postid));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={editingPost ? editingPost.title : newpost.title}
        onChange={(e) => {
          editingPost
            ? seteditingPost({ ...editingPost, title: e.target.value })
            : setnewpost({ ...newpost, title: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="body"
        value={editingPost ? editingPost.body : newpost.body}
        onChange={(e) => {
          editingPost
            ? seteditingPost({ ...editingPost, body: e.target.value })
            : setnewpost({ ...newpost, body: e.target.value });
        }}
      />
      {editingPost ? (
        <button onClick={handlePostUpdate}>editpost</button>
      ) : (
        <button onClick={handleCreatePost}>createpost</button>
      )}
      <ul>
        {pst.length > 0 ? (
          pst?.map((pst) => (
            <>
              {isPending && <h1>loading</h1>}
              <li key={pst.id}>post title:{pst.title}</li>
              <li>post summary:{pst.body}</li>
              <button onClick={() => seteditingPost(pst)}>Edit Post</button>
              <button onClick={() => handlePostDelete(pst.id)}>
                Delete Post
              </button>
              <br />
            </>
          ))
        ) : (
          <li style={{ color: "red" }}>Post Is Not Found!!</li>
        )}
      </ul>
    </div>
  );
};

export default Post;
