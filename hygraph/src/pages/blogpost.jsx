import { useQuery } from "@tanstack/react-query";
import { blogPost } from "../queries/blog";
import { request } from "graphql-request";


export const BlogPost = () => {

    
    const { data, isLoading, error } = useQuery({
      queryKey: ['NewBlog'],
      queryFn: async () => request(`https://api-eu-west-2.hygraph.com/v2/clnbdl2o887v601ugcw3030o6/master`, blogPost, {id:"clnbfkniuaogq0blaycj4jx6h"}),
  
    });


    console.log("BlogPost", (data))

  if (isLoading) return <p>Loading...</p>

  if (error) return <p> error: {error.message} </p>

    return(
      <div>
        <div>
          
          <p>Created {data?.blog.newBlog}</p>
          <p>Published {data?.blog.publishedAt}</p>
          <p>Updated {data?.blog.updatedAt}</p>
        </div>
      
    </div>
  );
};
  