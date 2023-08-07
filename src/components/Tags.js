import React from 'react'

function Tags({ tags }) {
  return (
   
       
         
         <div className="tags">
              <div className="blog-heading text-start py-2 mb-4">Tags</div>
           {tags?.map((tag, index) => (
             <p className="tag" key={index}>
               
                 {tag}
              
             </p>
           ))}
         </div>
       
       
  );
};

export default Tags;