import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function LoadingPostPage() {
  return (
    <div className="post">
      <div className="post-poster">
        <div className="post-info">
          <Box mb={1.5} className="post-date">
            <Skeleton
              sx={{ borderRadius: "6px" }}
              variant="rectangular"
              width={145}
              height={20}
            />
            <Box ml={1.5}>
              <Skeleton
                sx={{ borderRadius: "6px" }}
                variant="rectangular"
                width={50}
                height={20}
              />
            </Box>
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "335px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={40}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "441px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={40}
            />
          </Box>
          <Skeleton
            sx={{ borderRadius: "6px", width: "100%" }}
            variant="rectangular"
            height={18}
          />
          <Box mt={1.5} sx={{ maxWidth: "330px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
        </div>
      </div>
      <div className="post-content">
        <Box my={5}>
          <Box mb={1.5} sx={{ maxWidth: "580px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "550px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "500px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "580px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
        </Box>
        <Box my={5}>
          <Box mb={1.5} sx={{ maxWidth: "580px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "550px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "500px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "580px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
        </Box>
        <Box my={5}>
          <Box mb={1.5} sx={{ maxWidth: "580px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "550px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "500px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
          <Box mb={1.5} sx={{ maxWidth: "580px" }}>
            <Skeleton
              sx={{ borderRadius: "6px", width: "100%" }}
              variant="rectangular"
              height={18}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default LoadingPostPage;
