import { useState } from "react";
import dbService from "../../firebase/DatabaseServices";
import { getRandomNumber } from "../../util/common-functions";

function UserComments({blogData, userData}) {
    const [comment, setComment] = useState('');
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        let newBlogData;

        console.log(userData.email, comment);
        if(blogData.comments){
            newBlogData = {...blogData, comments : [...blogData.comments, {user : userData.email, comment : comment, id : getRandomNumber()}]};
        }else{
            newBlogData = {...blogData, comments : [{user : userData.email, comment : comment, id : getRandomNumber()}]};
        }
        console.log(newBlogData);
        // const addBlogRes = await dbService.addUpdateBlog({...blogData})
      }

    return (<>
        <hr className="mb-4" />
        <h4 className="text-2xl font-bold capitalize mb-5">218 Total Comments</h4>
        <form onSubmit={handleCommentSubmit}>
          <div className="flex w-full items-center space-x-2 mb-8">
            <div className="flex-1">
              <textarea
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                id="message"
                placeholder="Leave us a message"
                cols="3"
                value={comment}
                onChange={e => setComment(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Send
              </button>
            </div>
          </div>
        </form>
        {
            blogData && (
                <div className="comment-list">
                    {
                        blogData.comments.map(userComment => (
                            <div className="flex mb-4">
                    <div className="flex max-w-2xl flex-col rounded-md border p-4 bg-white">
                    <h6 className="font-semibold mb-2">User@abc</h6>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum laborum neque </p>
                    </div>
                </div>
                        ))
                    }
                
                {/* <div className="flex justify-end">
                    <div className="flex max-w-2xl flex-col rounded-md border p-4 bg-gray-100">
                    <h6 className="font-semibold mb-2">User@abc</h6>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum laborum neque </p>
                    </div>
                </div> */}
                </div>    
            )
        }
      </>);
}

export default UserComments;