import { useSearchParams } from "react-router-dom";
import { Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Pagination({ items, total }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = +searchParams.get("limit") || 5;
  const countPage = Math.ceil(total / limit);
  const page = +searchParams.get("page") || 1;
  const showButtons = countPage > 1 && page >= 1 && page < countPage + 1;
  const isMinPage = page <= 1;
  const isMaxPage = page >= countPage;

  const nextPage = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: page + 1,
    });
  };

  const prevPage = () => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: page - 1,
    });
  };

  return items ? (
    <Box mt={5} px={3.5}>
      {showButtons && (
        <>
          <Button
            color="inherit"
            size="large"
            sx={{ color: "#000", backgroundColor: "#F9F9F9" }}
            onClick={prevPage}
            disabled={isMinPage}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            color="inherit"
            size="large"
            onClick={nextPage}
            disabled={isMaxPage}
            sx={{
              color: "#000",
              backgroundColor: "#F9F9F9",
              marginLeft: "10px",
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </>
      )}
      {items.length ? (
        <p className="pagination-text">
          Страница {page} из {countPage}
        </p>
      ) : null}
    </Box>
  ) : null;
}

export default Pagination;
