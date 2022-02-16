import { ReactComponent as SVG } from "@/assets/images/items_not_found.svg";

function NotFoundPosts() {
  return (
    <div className="empty-block">
      <SVG />
      <h3>Нет статей</h3>
    </div>
  );
}

export default NotFoundPosts;
