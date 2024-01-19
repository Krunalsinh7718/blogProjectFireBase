import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL   } from "firebase/storage";
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

        } catch (e) {
            console.error("Error upload file: ", e);
            return false;
        }
    }

    async getDownloadURL(imgSnapRef){
        try {
            const imageDownloadURL = await getDownloadURL(imgSnapRef);
            return imageDownloadURL;
        } catch (error) {
            console.error("Error get download URL: ", e);
            return false;
        }
    }
}

const storageService = new StorageServices();
export default storageService;
export { StorageServices }