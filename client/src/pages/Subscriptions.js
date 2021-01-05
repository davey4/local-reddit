import e from "cors";
import { useState, useEffect } from "react";

import { __GetSubs } from "../services/SubscriptionServices";

const Subscriptions = (props) => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getSubs();
  }, []);

  const getSubs = async () => {
    try {
      const data = await __GetSubs(props.currentUser);
      setSubs(data);
      console.log(data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section>
      <div>Subscriptions</div>
    </section>
  );
};

export default Subscriptions;
