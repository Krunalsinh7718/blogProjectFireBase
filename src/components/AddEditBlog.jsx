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
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import Button from "./Button";
import BtnLoader from "./BtnLoader";
import { setBlogs } from "../store/dbSlice";

function AddEditBlog({ blog = null }) {
  const navigate = useNavigate();
  const [filePath, setFilePath] = useState("");
  const [downloadUrl, setDownloadURL] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

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
      title: blog?.title || "",
      slug: blog?.slug || "",
      content: blog?.content || "",
      status: blog?.status || "active",
    },
  });
  const handleSubmitForm = async (data) => {
    setLoadingState(true);

    if (!blog) {
      const uploadImageResData = await storageService.uploadFile(
        data.blogImage[0]
      );
      if (uploadImageResData) {
        setFilePath(uploadImageResData);

        const renNum = Math.floor(Math.random() * 2000);
        const timeStamp = Date.now();
        const uniqueSlug = data.slug + renNum + timeStamp;
        handleUpdateBlog(data, uniqueSlug, uploadImageResData);
      }
    } else {
      if (data.blogImage[0]) {
        const fileDelRef = await storageService.deleteFile(
          blog.blogImageRef
        );
        if (fileDelRef) {
          const uploadImageResData = await storageService.uploadFile(
            data.blogImage[0]
          );
          if (uploadImageResData) {
            handleUpdateBlog(data, blog.slug, uploadImageResData);
          }
        }
      } else {
        handleUpdateBlog(data, blog.slug, blog.blogImageRef);
      }
    }
    setLoadingState(false);
  };

  const handleUpdateBlog = async (data, blogSlug, blogImageRef) => {
    const addBlogRes = await dbService.addBlog({
      title: data.title,
      slug: blogSlug,
      content: data.content,
      blogImageRef: blogImageRef,
      isActive: data.isActive,
      userId: userData.auth.currentUser.uid,
      createdTime : Date.now()
    });
    if (addBlogRes) {
      toast.success("Post added successfully.");
      navigate(`/blog/${blogSlug}`);
      handleUpdatePost();
    }else{  
      toast.error("Something went wrong");
    }
  };

  const handleUpdatePost = async () => {
    const allPosts = await dbService.getAllPosts();
    if(allPosts){
      dispatch(setBlogs(allPosts))
    }else{
      toast.error("No post found");
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
      if (name === "title" && !blog) {
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
            <h2 className="text-4xl font-bold mb-5 ">
              {blog ? "Update Blog" : "Add Blog"}
            </h2>

            <form onSubmit={handleSubmit(handleSubmitForm)} >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    label="Title"
                    {...register("title", {
                      required: "This is required",
                      maxLength: {
                        value: 100,
                        message: "Maximum length of name is 100.",
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
                    disabled={blog ? true : false}
                    {...register("slug", {
                      required: "This is required",
                      maxLength: {
                        value: 100,
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
                    {...register("blogImage", {
                      required: blog ? false : "This is required",
                    })}
                  />
                  <div className="text-red-600">
                    <ErrorMessage errors={errors} name="blogImage" />
                  </div>
                </div>
                <Select
                  label="Is Active"
                  options={["active", "inactive"]}
                  {...register("isActive")}
                />
                {blog?.image && (
                  <img src={blog.image} alt="Blog Image" />
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
              <div >
                <Button
                  type="submit"
                  className="h-14 h-14 inline-flex items-center justify-center rounded-md bg-black px-6 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 relative"
                  disabled={loadingState}>
                  <span className={`${loadingState ? 'invisible ' : 'visible'} inline-flex items-center`}>
                    {blog ? (
                      "Update Blog"
                    ) : (
                      "Add Blog"
                    )}
                  </span>
                  <BtnLoader className={`${!loadingState ? 'invisible' : 'visible'} absolute inset-0 m-auto`}/>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddEditBlog;
