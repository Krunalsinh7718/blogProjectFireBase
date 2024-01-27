import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import storageService from "../firebase/StorageServices";
import DataLoader from "./DataLoader";
import Input from "./Input";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
import Select from "./Select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AddEditArticle({ article = null }) {


  const navigate = useNavigate();
  const [filePath, setFilePath] = useState("");
  const [downloadUrl, setDownloadURL] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData.auth.currentUser.uid);


  const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      content: article?.content || "",
      status: article?.status || "active"
    }
  });
  const handleSubmitForm = async (data) => {
    console.log("post submit form data", data);

    if(!article){
      const uploadImageResData = await storageService.uploadFile(data.articleImage[0]);
      if (uploadImageResData) {
        console.log(uploadImageResData);
        setFilePath(uploadImageResData);
  
        const renNum = Math.floor(Math.random() * 2000);
        const timeStamp = Date.now();
        const uniqueSlug = data.slug + renNum + timeStamp;
        const addArticleRes = await dbService
          .addArticle({
            title: data.title,
            slug: uniqueSlug,
            content: data.content,
            articleImageRef: uploadImageResData,
            isActive: data.isActive,
            userId: userData.auth.currentUser.uid
          });
        if (addArticleRes) {
          console.log("addArticleRes add article", addArticleRes);
          toast.success("Post added successfully.");
          navigate(`/post/${uniqueSlug}`)
        }
      }
    }else{
      const fileDelRef = storageService.deleteFile(article.articleImageRef);
      console.log("fileDelRef :", fileDelRef);
      if(fileDelRef){
        const uploadImageResData = await storageService.uploadFile(data.articleImage[0]);
        if (uploadImageResData) {
          const addArticleRes = await dbService
            .updateArticle(article.docId,{
              title: data.title,
              slug: data.slug,
              content: data.content,
              articleImageRef: uploadImageResData,
              isActive: data.isActive,
              userId: userData.auth.currentUser.uid
            });
          if (addArticleRes) {
            console.log("addArticleRes add article", addArticleRes);
            toast.success("Post updated successfully.");
            navigate(`/post/${data.slug}`)
          }
        }
      }
    }
  }

  const handleDownloadImage = async () => {
    const imageURL = await storageService.getDownloadURL(filePath);
    setDownloadURL(imageURL);
  };

  const slugTransform = (val) => {
    return val
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title" && !article) {
        setValue("slug", slugTransform(value[name]), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (<>
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white  ">

        <div>

          {/* <button onClick={handleDownloadImage}>Get Image</button>{downloadUrl && (<> <img src={downloadUrl} alt="Image" /></> )} */}
          <h2 className="text-center text-2xl font-bold leading-tight text-black ">
            Add Article
          </h2>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-8">
            <div className="flex space-y-5 gap-5">
              <div className="flex flex-col gap-3">
                <Input label="Title" {...register("title", { required: true })} />
                <Input label="Slug" disabled={article ? true : false} {...register("slug", { required: true })} />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
              </div>

              <div className="flex flex-col gap-3">
                <Input label="Image" type="file" {...register("articleImage", { required: true })} />
                {article?.image && <img src={article.image} alt="Article Image" />}
                <Select label="Is Active" options={["active", "inactive"]} {...register("isActive")} />
                <button
                  type="submit"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  {
                    article ? "Update Article" : "Add Article"
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