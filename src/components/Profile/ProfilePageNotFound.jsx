import { ReactComponent as SVG } from "@/assets/images/user_not_found.svg";

function NotFoundPosts() {
  return (
    <div className="empty-block">
      <SVG />
      <h3>User not found</h3>
    </div>
  );
}

export default NotFoundPosts;
