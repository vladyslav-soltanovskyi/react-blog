import { ReactComponent as SVG } from "@/assets/images/page_not_found.svg";

function NotFound() {
  return (
    <div className="empty-block">
      <SVG />
      <h3>Page not found</h3>
    </div>
  );
}

export default NotFound;
