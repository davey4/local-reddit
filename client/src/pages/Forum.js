import { useState, useEffect } from "react";

import { __GetThread } from "../services/ThreadServices";

const Forum = (props) => {
  console.log(props);
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getThread();
  }, []);

  const getThread = async () => {
    try {
      const data = await __GetThread(props.location.state);
      console.log(data);
      setTitle(data.content);
      setComments(data.Comments);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
};

export default Forum;
