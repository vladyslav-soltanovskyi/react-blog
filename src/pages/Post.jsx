import CommentsBlock from "@/components/Comments/CommentsBlock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReactDOMServer from "react-dom/server";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "@/services/api";
import { addNotification } from "@/store/actions/notifications";
import { convertDate } from "@/utils";
import LoadingPostPage from "@/components/Post/LoadingPostPage";
import EmptyPostPage from "@/components/Post/EmptyPostPage";

function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const post = await api.posts.getPost(id);
        setPost(post);
      } catch (e) {
        dispatch(addNotification(e?.response?.data?.error, "error"));
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchPost(id);
  }, [id, fetchPost]);

  if (isLoading) {
    return <LoadingPostPage />;
  }

  if (!post) {
    return <EmptyPostPage />;
  }

  const { createdAt, description, photoUrl, text, title, views, user } = post;

  return (
    post && (
      <div className="post">
        <div className="post-poster">
          <div className="post-poster-overlay"></div>
          <img src={photoUrl} alt="" />
          <div className="post-info">
            <div className="post-author">
              Автор:&nbsp;
              <NavLink to={`/profile/${user._id}`} className="link">
                {user.fullName}
              </NavLink>
            </div>
            <div className="post-date">
              {convertDate(createdAt)}
              <div className="post-views">
                <RemoveRedEyeIcon /> <span>{views}</span>
              </div>
            </div>
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
          </div>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(
              <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
            ),
          }}
        ></div>
        <CommentsBlock />
      </div>
    )
  );
}

export default Post;
