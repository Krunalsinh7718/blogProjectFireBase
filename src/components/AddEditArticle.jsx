import { useState } from "react";
import dbService from "../firebase/DatabaseServices";
function AddEditArticle({getSetArticleData, editArticle = null, setEditArticle}) {
    const [title, setTitle] = useState(editArticle ? editArticle.title : '');
    const [content, setContent] = useState(editArticle ? editArticle.content : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!editArticle){

          const data = await dbService
            .addArticle({title, content});
            console.log("Add articles response ",data);
        }else{
          const data = await dbService
          .updateArticle(editArticle.id, {title, content});
          console.log("update articles response ",data);
        }
        getSetArticleData();

      };



    return (<>
        <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white dark:bg-black ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
           
            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
              Add Article
            </h2>
           
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="text-base font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex  w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                      placeholder="Title"
                      type="text"
                      value={title}
                      id="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="content"
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      Content
                    </label>
                  </div>
                  <div className="mt-2">
                    
                    <textarea className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                     placeholder="Content"
                     value={content}
                     id="content"
                     onChange={(e) => setContent(e.target.value)}
                     />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 dark:text-white"
                  >
                    Add Article
                    
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </section>
    </>);
}

export default AddEditArticle;