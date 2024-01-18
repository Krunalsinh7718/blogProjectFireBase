import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import DataLoader from "./DataLoader";
function AddEditArticle({getSetArticleData, editArticle = null, setEditArticle}) {
    const [title, setTitle] = useState(editArticle?.title || '');
    const [content, setContent] = useState(editArticle?.content || '' );
    const [dataLoader, setDataLoader] = useState(false);

    const handleSubmit = async (e) => {
      setDataLoader(true);
        e.preventDefault();
        if(!editArticle){

          const addArticleRes = await dbService
            .addArticle({title, content});
            if(addArticleRes){

              setTitle('');
               setContent('');
            }
        }else{
          const updateArticleRes = await dbService
          .updateArticle(editArticle.id, {title, content});
          console.log("update articles response ",updateArticleRes);
          if(updateArticleRes){
            setEditArticle(null)
          }
        }
        setDataLoader(false)
        getSetArticleData();

      };

      useEffect(() => {
        if(editArticle){
          setTitle(editArticle.title);
          setContent(editArticle?.content);
        }else{
          setTitle('');
          setContent('');
        }
      },[editArticle])


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
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    disabled={dataLoader}
                  >
                    {
                      dataLoader ? 
                      <DataLoader button light/>
                      :
                      editArticle ? "Update Article" : "Add Article"
                    }
                    
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