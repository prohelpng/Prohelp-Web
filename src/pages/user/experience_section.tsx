import {
  Box,
  Card,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import noDataImage from "../../assets/images/empty.png";

interface Props {
  experience: any;
}

export default function ExperienceSection(props: Props) {
  let { experience } = props;
  return (
    <Card>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        p={2}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500} gutterBottom>
            Experience
          </Typography>
        </Box>
        {experience?.length > 0 ? (
          <List disablePadding sx={{ width: "100%" }}>
            {experience &&
              experience?.map((item: any, index: number) => (
                <ListItemButton
                  sx={{ paddingX: 0 }}
                  key={index}
                  divider
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"stretch"}
                    alignItems={"center"}
                  >
                    <img
                      src={item?.companyLogo}
                      alt=""
                      width={70}
                      height={70}
                    />
                    <Box
                      pl={1}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"start"}
                      alignItems={"start"}
                    >
                      <Typography
                        fontWeight={600}
                        variant="body1"
                        lineHeight={1.0}
                        textTransform={"capitalize"}
                      >
                        {`${item?.role}`}
                      </Typography>
                      <Typography
                        fontWeight={500}
                        variant="body2"
                        textTransform={"capitalize"}
                      >
                        {`${item?.company} . ${item?.workType}`}
                      </Typography>
                      <Typography
                        fontWeight={500}
                        variant="body2"
                        textTransform={"capitalize"}
                      >
                        {`${item?.startDate} - ${
                          item?.endate === undefined || item?.stillHere === true
                            ? "present"
                            : item?.endate
                        }`}
                      </Typography>
                      <Typography
                        fontWeight={500}
                        variant="body2"
                        textTransform={"capitalize"}
                      >
                        {`${item?.region}, ${item?.country}`}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>
              ))}
          </List>
        ) : (
          <Box
            p={4}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img src={noDataImage} alt="" width={100} />
            <Typography>No data found</Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}
