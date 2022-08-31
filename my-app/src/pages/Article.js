import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import articleContent from "./article-content";
import NotFound from "./NotFound";


//Components
import Articles from '../components/Articles';
import CommentsList from "../components/CommentsList";

const Article = () => {
  const {name} = useParams();
  const article = articleContent.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({comments: []});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);
  
  if (!article){
    return <NotFound/>
  }
  const otherArticles = articleContent.filter(article => article.name !== name)
  return (
    <div className="mb-20 px-4">
        <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
          {article.title}
        </h1>
        {article.content.map((paragraph,index)=>(
          <p className="mx-auto leading-relaxed text-base mb-4" key={index}>{paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments}/>
        <h1 className="sm:text-2xl font-bold my-4 text-gray-900">Other Articles</h1>
        <div className="flex flex-wrap -m-4">
          <Articles articles={otherArticles}/>
        </div>
    </div>
  );
};

export default Article;
