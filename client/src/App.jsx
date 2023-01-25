import { lazy, Suspense } from "react";
import Preloader from "./components/Preloader/Preloader";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import useNotifier from "./hooks/useNotifier";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import useAuth from "./hooks/useAuth";
import NotFound from "./pages/errors/NotFound";
import RequireAuth  from "./hoc/RequireAuth";

const Home = lazy(() => import("./pages/Home"));
const Post = lazy(() => import("./pages/Post"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const { isLoading } = useAuth();
  useNotifier();

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<Post />} />
            <Route
              path="post/create"
              element={
                <RequireAuth>
                  <CreatePost />
                </RequireAuth>
              }
            />
            <Route
              path="post/:id/edit"
              element={
                <RequireAuth>
                  <EditPost />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<ProfileLayout />}>
            <Route path="profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
      <Sidebar />
    </div>
  );
}

export default App;
