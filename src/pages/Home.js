import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import { List } from '@mui/material';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';
import Trending from '../components/Trending';

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs]   = useState([]);
  const [tags, setTags]  = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef =  collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs= [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });

    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({id: doc.id, ...doc.data()})
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      }, (error) => {
        console.log(error)
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, []);

  if(loading){
   return <Spinner />
  }
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure wanted to delete That Blog ?")) {
        try {
          setLoading(true);
          await deleteDoc(doc(db, "blogs", id));
          toast.success("Image Upload to firebase Successfully");
          setLoading(false);
        }
        catch(err) {
          console.log(err);
        }
    }
  };

  console.log("blogs", blogs);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
        <div className="container padding">
          <div className="row mx-0">
           <Trending  blogs={trendBlogs} />
            <div className="col-md-8">
            <BlogSection 
            blogs={blogs} 
            user={user} 
            handleDelete={handleDelete}
             />
            </div>
            <div className="col-md-4">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Home;