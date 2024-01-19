import { useState } from "react";
import storageService from "../firebase/StorageServices";

function UploadImage() {

    const [image, setImage] = useState('');

    const [imageSnapRef, setImageSnapRef] = useState(null);

    const [imageDownloadURL, setImageDownloadURL] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(image.name + Math.floor(Math.random() * 1000) + Date.now());
        const uploadImageResData = await storageService.uploadFile(image);
        console.log("file upload res data : ", uploadImageResData);
        setImageSnapRef(uploadImageResData);
    }

    const handleDownloadImage = async () => {
        const imageURL = await storageService.getDownloadURL(imageSnapRef);
        setImageDownloadURL(imageURL)
    }
    return (<><div className="bg-white dark:bg-black min-h-lvh">
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 bg-white dark:bg-black ">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                    <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white">
                        Upload Image
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="space-y-5">

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="imageFile"
                                        className="text-base font-medium text-gray-900 dark:text-white"
                                    >
                                        Image {JSON.stringify(image)}
                                    </label>
                                </div>
                                <div className="mt-2">

                                    <input
                                        className="flex  w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                                        placeholder="Title"
                                        type="file"
                                        id="imageFile"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <span className="dark:text-white">
                                {JSON.stringify(imageSnapRef)}
                            </span>
                            <div>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Upload Image

                                </button>
                            </div>
                        </div>
                    </form>
                    <button
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        onClick={handleDownloadImage}
                    >
                        Download Image

                    </button>
                    {
                        imageDownloadURL && <img src={imageDownloadURL} alt="test image" />
                    }


                </div>
            </div>
        </section>
    </div></>);
}

export default UploadImage;