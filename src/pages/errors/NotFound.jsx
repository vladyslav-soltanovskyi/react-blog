import { ReactComponent as SVG } from "@/assets/images/page_not_found.svg";

function NotFound() {
  return (
    <div className="empty-block">
      <SVG />
      <h3>Страница не найдена</h3>
    </div>
  );
}

export default NotFound;
