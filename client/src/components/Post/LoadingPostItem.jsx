import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function LoadingPostItem() {
  return (
    <div className="post-item">
      <div className="content">
        <div className="title">
          {" "}
          <Skeleton sx={{ width: "100%", borderRadius: "6px" }} height={40} />
        </div>
        <div className="description">
          <Skeleton
            sx={{ marginBottom: "10px", borderRadius: "6px" }}
            variant="rectangular"
            height={18}
          />
          <Skeleton
            sx={{ marginBottom: "10px", borderRadius: "6px" }}
            variant="rectangular"
            height={18}
          />
          <Skeleton
            sx={{ marginBottom: "10px", borderRadius: "6px" }}
            variant="rectangular"
            height={18}
          />
        </div>
        <Box mb={1.5} className="post-date">
          <Skeleton variant="rectangular" width={145} height={22} />
          <Box ml={1.5}>
            <Skeleton variant="rectangular" width={50} height={22} />
          </Box>
        </Box>
      </div>
      <div className="post-item-img">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "100%", borderRadius: "6px" }}
        />
      </div>
    </div>
  );
}

export default LoadingPostItem;
