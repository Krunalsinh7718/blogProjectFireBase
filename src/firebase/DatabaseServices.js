import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc} from "firebase/firestore";
import conf from '../conf/conf';

class DatabaseServices {
    constructor() {
        this.app = initializeApp(conf);
        this.db = getFirestore(this.app);
    }

    async addArticle(article) {
        try {

            const articlesRef = doc(collection(this.db, "articles"));
            await setDoc(articlesRef, article);


        } catch (e) {
            console.error("Error add document: ", e);
        }
    }

    async updateArticle(docId, article){
        try {
            const articleDocRef = doc(this.db, "articles", docId);
            const updatedDocument = await setDoc(articleDocRef, article);
            console.log(updatedDocument);

            console.log(updatedDoc);
        } catch (error) {
            console.error("Error update document: ", e);
        }
    }

    async getAllDocs() {
        try {
            let data = [];
            const querySnapshot = await getDocs(collection(this.db, "articles"));
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                data.push({...doc.data(), id : doc.id});
            });
            return data;
        } catch (e) {
            console.error("Error read document: ", e);
            return false;
        }
    }
}

const dbService = new DatabaseServices();
export default dbService;
export { DatabaseServices }