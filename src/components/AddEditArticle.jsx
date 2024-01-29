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
import { ErrorMessage } from "@hookform/error-message";

function AddEditArticle({ article = null }) {
  const navigate = useNavigate();
  const [filePath, setFilePath] = useState("");
  const [downloadUrl, setDownloadURL] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData.auth.currentUser.uid);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      content: article?.content || "",
      status: article?.status || "active",
    },
  });
  const handleSubmitForm = async (data) => {
    setLoadingState(true);
    console.log("post submit form data", data);

    if (!article) {
      const uploadImageResData = await storageService.uploadFile(
        data.articleImage[0]
      );
      if (uploadImageResData) {
        console.log(uploadImageResData);
        setFilePath(uploadImageResData);

        const renNum = Math.floor(Math.random() * 2000);
        const timeStamp = Date.now();
        const uniqueSlug = data.slug + renNum + timeStamp;
        handleUpdateArticle(data, uniqueSlug, uploadImageResData);
      }
    } else {
      if (data.articleImage[0]) {
        const fileDelRef = await storageService.deleteFile(
          article.articleImageRef
        );
        if (fileDelRef) {
          const uploadImageResData = await storageService.uploadFile(
            data.articleImage[0]
          );
          if (uploadImageResData) {
            handleUpdateArticle(data, data.slug, uploadImageResData);
          }
        }
      } else {
        handleUpdateArticle(data, data.slug, article.articleImageRef);
      }
    }
    setLoadingState(false);
  };

  const handleUpdateArticle = async (data, articleSlug, articleImageRef) => {
    const addArticleRes = await dbService.addArticle({
      title: data.title,
      slug: articleSlug,
      content: data.content,
      articleImageRef: articleImageRef,
      isActive: data.isActive,
      userId: userData.auth.currentUser.uid,
    });
    if (addArticleRes) {
      console.log("addArticleRes add article", addArticleRes);
      toast.success("Post added successfully.");
      navigate(`/post/${articleSlug}`);
    }
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

  return (
    <>
      <section>
        <div>
          <div>
            {/* <button onClick={handleDownloadImage}>Get Image</button>{downloadUrl && (<> <img src={downloadUrl} alt="Image" /></> )} */}
            <h2 className="text-4xl font-bold mb-4 ">
              {article ? "Update Article" : "Add Article"}
            </h2>

            <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-8">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    label="Title"
                    {...register("title", {
                      required: "This is required",
                      maxLength: {
                        value: 50,
                        message: "Maximum length of name is 50.",
                      },
                    })}
                  />
                  <div className="text-red-600">
                    <ErrorMessage errors={errors} name="title" />
                  </div>
                </div>
                <div>
                  <Input
                    label="Slug"
                    disabled={article ? true : false}
                    {...register("slug", {
                      required: "This is required",
                      maxLength: {
                        value: 50,
                        message: "Maximum length of name is 50.",
                      },
                    })}
                  />
                  <div className="text-red-600">
                    <ErrorMessage errors={errors} name="slug" />
                  </div>
                </div>
                <div>
                  <Input
                    label="Image"
                    type="file"
                    {...register("articleImage", {
                      required: article ? false : "This is required",
                    })}
                  />
                  <div className="text-red-600">
                    <ErrorMessage errors={errors} name="articleImage" />
                  </div>
                </div>
                <Select
                  label="Is Active"
                  options={["active", "inactive"]}
                  {...register("isActive")}
                />
                {article?.image && (
                  <img src={article.image} alt="Article Image" />
                )}
                <div className="col-span-2">
                  <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                  />
                  <div className="text-red-600">
                    <ErrorMessage errors={errors} name="content" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                disabled={loadingState}
              >
                {loadingState ? (
                  <DataLoader button light/>
                ) : article ? (
                  "Update Article"
                ) : (
                  "Add Article"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddEditArticle;
