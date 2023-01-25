import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import LoadingPostItem from "../Post/LoadingPostItem";

function LoadingProfilePage() {
  return (
    <div className="profile">
      <div className="profile-content">
        <div className="profile-header">
          <Box className="title">
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={60}
            />
          </Box>
          <Box className="date" my={2.5}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={22}
            />
          </Box>
        </div>
        <Box mt={4} sx={{ display: "flex" }}>
          <Skeleton
            sx={{ borderRadius: "6px" }}
            variant="rectangular"
            width={80}
            height={30}
          />
          <Skeleton
            sx={{ borderRadius: "6px", marginLeft: "10px" }}
            width={120}
            variant="rectangular"
            height={30}
          />
        </Box>
        <div className="profile-items">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <LoadingPostItem key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingProfilePage;
