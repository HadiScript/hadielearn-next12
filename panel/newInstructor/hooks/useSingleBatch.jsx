import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import { API } from "../../../config/API";
import { toast } from "react-hot-toast";

const useSingleBatch = ({ id, itemsURL }) => {
  // state
  const [singleBatch, setSingleBatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth] = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [updatesLoading, setUpdatesLoading] = useState(false);

  const fetchingSingleBatch = async (x) => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/lms/batch-teacher/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setSingleBatch(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchingBatchItems = async () => {
    try {
      setItemsLoading(true);
      const { data } = await axios.get(itemsURL, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setItems(data);
      setItemsLoading(false);
    } catch (error) {
      setItemsLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth?.token && id) fetchingSingleBatch(id);
  }, [auth && auth?.token && id]);

  const updateItem = async (updateItemPayloads, updateItemURL) => {
    try {
      setUpdatesLoading(true);
      const { data } = await axios.put(
        updateItemURL,

        updateItemPayloads,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.ok) {
        fetchingBatchItems(id);
        setUpdatesLoading(false);
      }
    } catch (error) {
      setUpdatesLoading(false);
      toast.error(error);
      console.log(error);
    }
  };

  const deleteItem = async (deleteItemURL) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      try {
        const { data } = await axios.delete(deleteItemURL, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (data.ok) {
          fetchingBatchItems(id);
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
  };

  const addItem = async (payloadData, addItemURL) => {
    try {
      const { data } = await axios.post(addItemURL, payloadData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        fetchingBatchItems(id);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const makeItCompleteItem = async (makeItURL) => {
    try {
      const { data } = await axios.put(makeItURL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        fetchingBatchItems(id);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const assignments = async (payloadData, addAssignmentsURL) => {
    try {
      const { data } = await axios.put(addAssignmentsURL, payloadData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        fetchingBatchItems(id);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) fetchingBatchItems();
  }, [auth && auth.token && id]);

  return {
    singleBatch,
    loading,
    items,
    itemsLoading,
    updateItem,
    updatesLoading,
    deleteItem,
    addItem,
    makeItCompleteItem,
    assignments,
  };
};

export default useSingleBatch;
