import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc , getDocs, doc, setDoc, deleteDoc, where, orderBy, limit, query} from "firebase/firestore";
import conf from '../conf/conf';

class DatabaseServices {
    constructor() {
        this.app = initializeApp(conf);
        this.db = getFirestore(this.app);
    }

    async addUpdateBlog(blog) {
        try {
            const blogsRef = doc(this.db, "blogs", blog.slug);
            const blogRes = await setDoc(blogsRef, blog );
            return true;
        } catch (e) {
            console.error("Error add document: ", e);
            return false;
        }
    }

    async deleteBlog(docId){
        try {
            const blogDocRef = doc(this.db, "blogs", docId);
            const deleteDocRes =  await deleteDoc(blogDocRef);
            console.log("deleteDocRes =>", deleteDocRes);
            return true;
        } catch (error) {
            console.error("Error delete document: ", error);
            return false;
        }
    }

    async getBlog(slug){
        try {
            const docRef = doc(this.db, "blogs", slug);
            const docSnap = await getDoc(docRef);
            return docSnap;
        } catch (error) {
            console.error("Error get document: ", error);
            return false;
        }
    }

    async getAllPosts(field = "isActive", operator = "==", condValue = 'active', orderby = 'title', ascDesc = "asc", limitData = 10) {
        try {

            let data = [];
            const q = query(collection(this.db, "blogs"), 
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