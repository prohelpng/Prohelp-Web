import React from "react";
import { useNavigate } from "react-router-dom";
import "./category.css";
import { Box } from "@mui/material";

interface Props {
  item: any;
}

function CategoryCard(props: Props) {
  let { item } = props;
  const navigate = useNavigate();

  return (
    <Box
      style={{ padding: 0, margin: 0 }}
      onClick={() =>
        navigate("/category/" + item?.name, { state: { data: item } })
      }
    >
      <Box
        className="catCard image_wrapper"
        sx={{
          backgroundImage: "url(" + item?.image + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          component={"div"}
          className="overlay overlay_4"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h3>{item?.name}</h3>
        </Box>
        {/* <div />
        <Typography>{item?.name}</Typography> */}
        {/* <img
          src={item.image}
          alt=""
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: 10 }}
        /> */}
        {/* <span className="desc">{item.desc}</span>
        <span className="title">{item.name}</span> */}
      </Box>
    </Box>
  );
}
export default CategoryCard;
