import PostContentView from "./view/postContentView";
import PostListView from "./view/postListView";
import { Routes, Route, Router } from "react-router-dom";

function AppRouter() {
    return(      
        <Routes>
            <Route path="/" element={<PostListView />} />
            <Route path="/post/:pid" element={<PostContentView />} />
        </Routes>
    )
}
export default AppRouter;