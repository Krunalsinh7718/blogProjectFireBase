import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getMetadata    } from "firebase/storage";
import conf from '../conf/conf';

class StorageServices {
    constructor() {
        this.app = initializeApp(conf);
        this.storage = getStorage();
    }

    async uploadFile(file) {
        
        try {
            const storageRef = ref(this.storage, `images/${file.name + Math.floor(Math.random() * 1000) + Date.now()}`);

            const uploadFileRes = await uploadBytes(storageRef, file)

            console.log('Uploaded a blob or file! ', uploadFileRes);

            return uploadFileRes.ref;

        } catch (error) {
            console.error("Error upload file: ", error);
            return false;
        }
    }

    async deleteFile(fileSnapURL){
        const fileData = await getMetadata(fileSnapURL);
        try {
            const desertRef = ref(this.storage, fileData.fullPath);

            const deleteFileRes = deleteObject(desertRef)

            console.log(" deleteFileRes :", deleteFileRes);

            return deleteFileRes;
        } catch (error) {
            console.error("Error delete file: ", error);
            return false;
        }
    }

    async getDownloadURL(imgSnapRef){
        try {
            const imageDownloadURL = await getDownloadURL(imgSnapRef);
            return imageDownloadURL;
        } catch (error) {
            console.error("Error get download URL: ", error);
            return false;
        }
    }
}

const storageService = new StorageServices();
export default storageService;
export { StorageServices }