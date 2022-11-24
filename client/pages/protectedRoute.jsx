import { useEffect, useState } from "react";


//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

let unprotectedRoutes = [
    "/login",
    "/signup",
    "/verificationSent",
    "/adminLogin",
    "/logout",
    "/"

  ];

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };


const ProtectedRoute = ({ router, children }) => {
  //Identify authenticated user

  const [finish, setFinish] = useState(false)

  const fetchStorageData = async () => {
    const jwt = await localStorage.getItem("jwt")
    console.log(jwt);
    if (jwt){
     
        const decodedJwt = parseJwt(jwt);
        if(decodedJwt.exp * 1000 < Date.now()){
            localStorage.clear()
            router.replace("/")
        }
    }

    
    console.log(unprotectedRoutes);
    let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

   
  
    if (isBrowser() && !(jwt != null) && pathIsProtected) {
      await router.push("/login");
    }
    setFinish(true)
  }





  useEffect(() => {
    fetchStorageData()
  }, [])

  

 

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */

   if (finish) {
    return children;
}
 
};

export default ProtectedRoute;