import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc , getDocs, doc, setDoc, deleteDoc, where, orderBy, limit, query} from "firebase/firestore";
import conf from '../conf/conf';

class DatabaseServices {
    constructor() {
        this.app = initializeApp(conf);
        this.db = getFirestore(this.app);
    }

    async addArticle(article) {
        try {
            const articlesRef = doc(this.db, "articles", article.slug);
            const articleRes = await setDoc(articlesRef, article );
            return true;
        } catch (e) {
            console.error("Error add document: ", e);
            return false;
        }
    }

    async updateArticle(docId, article){
        try {
            const articleDocRef = doc(this.db, "articles", docId);
            await setDoc(articleDocRef, article);
            return true;
        } catch (error) {
            console.error("Error update document: ", error);
            return false;
        }
    }

    async deleteArticle(docId){
        try {
            const articleDocRef = doc(this.db, "articles", docId);
            const deleteDocRes =  await deleteDoc(articleDocRef);
            console.log("deleteDocRes =>", deleteDocRes);
            return true;
        } catch (error) {
            console.error("Error delete document: ", error);
            return false;
        }
    }

    async getArticle(slug){
        try {
            const docRef = doc(this.db, "articles", slug);
            const docSnap = await getDoc(docRef);
            return docSnap;
        } catch (error) {
            console.error("Error get document: ", error);
            return false;
        }
    }

    async getAllArticles(field = "isActive", operator = "==", condValue = 'active', orderby = 'title', ascDesc = "asc", limitData = 10) {
        try {

            let data = [];
            const q = query(collection(this.db, "articles"), 
            where(field, operator, condValue), 
            orderBy(orderby,ascDesc),
            limit(limitData));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
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