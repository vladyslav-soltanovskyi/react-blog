import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function LoadingCommentItem() {
  return (
    <Box my={4}>
      <Box className="comment-header" sx={{ marginBottom: "20px" }}>
        <Box sx={{ maxWidth: "225px", width: "100%" }}>
          <Skeleton
            sx={{ borderRadius: "6px", width: "100%" }}
            variant="rectangular"
            height={20}
          />
        </Box>
        <Box sx={{ maxWidth: "180px", width: "100%" }}>
          <Skeleton
            sx={{ borderRadius: "6px", width: "100%" }}
            variant="rectangular"
            height={20}
          />
        </Box>
      </Box>
      <p className="comment-content">
        <Skeleton
          sx={{ borderRadius: "6px", width: "100%", marginBottom: "10px" }}
          variant="rectangular"
          height={14}
        />
        <Skeleton
          sx={{ borderRadius: "6px", width: "100%", marginBottom: "10px" }}
          variant="rectangular"
          height={14}
        />
        <Skeleton
          sx={{ borderRadius: "6px", width: "100%", marginBottom: "10px" }}
          variant="rectangular"
          height={14}
        />
      </p>
    </Box>
  );
}

export default LoadingCommentItem;
