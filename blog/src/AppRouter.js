import PostListView from "./view/postListView";
import { Routes, Route, Navigate } from "react-router-dom";

function AppRouter() {
    return(        
        <Routes>
            <Route path="/" element={<PostListView />} />
        </Routes>
    )
}
export default AppRouter;