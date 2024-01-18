import dbService from "../firebase/DatabaseServices";
import DataLoader from "./DataLoader";

function AllArticles({ articles = [], setEditArticle, dataLoading, getSetArticleData }) {

  async function deleteArticle(docId){
    const deleteArticleRes = await dbService.deleteArticle(docId)
    if(deleteArticleRes){
      getSetArticleData();
    }
  }

  return (
    <>
      <section>
        <div className="mx-auto w-full max-w-7xl px-4 py-4">
          <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 class="text-lg font-semibold text-black dark:text-white">
                Articles
              </h2>
            </div>
          </div>

          <div class="mt-6 flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 relative min-h-64">
                {dataLoading && <div className="table-loader"><DataLoader light button /></div>}

                {
                   articles.length > 0 ? (
                    <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                            >
                              <span>Title</span>
                            </th>
                            <th
                              scope="col"
                              class="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                            >
                              Content
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white dark:bg-black text-black dark:text-white">
                          {articles.map((article) => (
                            <tr key={article.id}>
                              <td class="whitespace-nowrap px-4 py-4">
                                {article.title}
                              </td>
                              <td class="whitespace-nowrap px-4 py-4 text-sm ">
                                {article.content}
                              </td>
                              <td class="whitespace-nowrap px-4 py-4 text-sm ">
                                <button
                                  type="button"
                                  class="rounded-full bg-yellow-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 mr-2"
                                  onClick={() => setEditArticle(article)}
                                >
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                  >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  class="rounded-full bg-yellow-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                  onClick={() => deleteArticle(article.id)}
                                >
                                  <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                  >
                                    <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="dark:text-white"> No data found </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllArticles;
