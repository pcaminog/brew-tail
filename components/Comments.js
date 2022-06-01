import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { supabase } from "../utils/supabase";
import React from "react";

const Comments = ({ data }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const currentUserId = supabase.auth.user();

  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const getReplies = (commentId) =>
    comments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  function addComment(text, parentId) {
    supabase
      .from("comments")
      .insert(text)
      .eq("parentId", parentId)
      .then((comment) => {
        setBackendComments([comment, ...backendComments]);
        setActiveComment(null);
      });
  }

  useEffect(() => {
    setBackendComments(data);
  });

  const comments = [
    {
      user: "pablo",
      comment: "thisis the bezt comment",
      parentId: null,
      brew_id: 31,
      id: 1,
      createdAt: "2022-04-29T16:30:31.000Z",
    },
    {
      user: "pepe",
      comment: "Nope. that is the one",
      parentId: null,
      brew_id: 31,
      id: 3,
      createdAt: "2022-04-29T16:40:31.000Z",
    },
    {
      user: "[edrp]",
      comment: "thisis the bezt commen dsadsfdsft",
      parentId: 1,
      brew_id: 31,
      id: 2,
      createdAt: "2022-04-27T16:30:31.000Z",
    },
    {
      user: "pfdsepe",
      comment: "Nope. that is the on  dsadsa  e",
      parentId: null,
      brew_id: 31,
      id: 4,
      createdAt: "2022-04-26T16:40:31.000Z",
    },
  ];

  return (
    <div>
      <h3 className="font-extrabold text-2xl text-cuar">Comments</h3>
      <CommentForm submitLabel="Submit" handleSubmit={addComment} />
      <div className="border-4 border-ter">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
