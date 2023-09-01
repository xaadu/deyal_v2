import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const googleSignIn = () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
        .finally(() => setIsLoading(false));
    };


    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
        .then(() => { setUser({}) })
        .finally(() => setIsLoading(false));
    };


    useEffect(() =>{
        const unsubcribed = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }else{
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubcribed;
    },[]);


    return { user, isLoading, googleSignIn, logOut };
};

export default useFirebase;
