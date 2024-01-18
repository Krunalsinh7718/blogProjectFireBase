

function AllArticles({articles = []}) {
 

  return (
    <>
      <section >
        <div className="mx-auto w-full max-w-7xl px-4 py-4">
          <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h2 class="text-lg font-semibold text-black dark:text-white">Articles</h2>
            </div>
          </div>
          <div class="mt-6 flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                {articles && (
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
                          <th>id</th>
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
                              {article.id}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllArticles;
