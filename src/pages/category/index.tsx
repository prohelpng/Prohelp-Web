import {  Box, Typography } from "@mui/material";
import ProfessionHeader from "../../layouts/headers/profession";
import CustomContainer from "../../components/container";
// import theme from "../../assets/theme/Theme";
import { useLocation } from "react-router-dom";

// interface Props {
//   data: any;
// }

// function Item(props: Props) {
//   let { data } = props;
//   return (
//     <Box
//       bgcolor={theme.palette.primary.light}
//       p={3}
//       display={"flex"}
//       borderRadius={3}
//       flexDirection={"column"}
//       justifyContent={"start"}
//       alignItems={"start"}
//     >
//       <Typography mb={4} variant="h6" gutterBottom fontWeight={600}>
//         {data?.title}{" "}
//       </Typography>
//       <AvatarGroup total={24}>
//         <Avatar
//           alt="Remy Sharp"
//           src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxhY2slMjBwZXJzb258ZW58MHx8MHx8fDA%3D&w=1000&q=80"
//         />
//         <Avatar
//           alt="Travis Howard"
//           src="https://arts.ufl.edu/site/assets/files/143003/lamyportrait.1840x1328p50x50.png"
//         />
//         <Avatar
//           alt="Agnes Walker"
//           src="https://i0.wp.com/news.northeastern.edu/wp-content/uploads/2022/06/060622_MM_Caleb_Gayle_011-590x886.jpg?resize=590%2C886&ssl=1"
//         />
//         <Avatar
//           alt="Trevor Henderson"
//           src="https://img.freepik.com/free-photo/close-up-portrait-good-looking-serious-african-man-with-healthy-clean-skin-wearing-white-casual-t-shirt-posing-isolated-against-gray-wall-with-copy-space-your-promotional-content_273609-6064.jpg"
//         />
//       </AvatarGroup>
//     </Box>
//   );
// }

export default function Category() {
  let location = useLocation();
  // const {title} = location?.state;
  let title : string | null = location.pathname?.replace("/category/", "");

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <ProfessionHeader />
      <Box py={10}>
        <CustomContainer>
          <Box pt={4} display={"flex"} flexDirection={"column"}>
            <Typography
              gutterBottom
              variant="h4"
              fontWeight={600}
              width={"60%"}
            >
              {`${title ?? ""}`}
            </Typography>
          </Box>
          {/* <Grid container spacing={2}>
            {data?.skills?.map((item: any) => (
              <Grid key={item?.title} item xs={12} sm={3} md={4}>
                <Item data={item} />
              </Grid>
            ))}
          </Grid> */}
        </CustomContainer>
      </Box>
    </Box>
  );
}
