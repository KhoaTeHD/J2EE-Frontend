import Footer from "./Footer";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import Search from "./Search";


const Layout = ({ children }) => {
    const router = useRouter();
    return (
        <>
          {router.pathname == "/" || router.pathname =="/Register" ? (
            <>
              {children}
              <Footer />
            </>
          ) : (
            <>
              <Sidebar />
              <Search/>
              {children}
              <Footer />
            </>
          )}
        </>
      );
}

export default Layout;