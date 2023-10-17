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
          display={"flex"}
          height={"100%"}
          px={2}
          flexDirection={"column"}
          justifyContent={"end"}
          alignItems={"start"}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              backgroundImage: 'linear-gradient(transparent, #0e0e0e)',
              color: "white",
              paddingX: "10px",
              paddingTop: '16px',
              paddingBottom: 1,
            }}
          >
            <h3 style={{textAlign: 'center'}} >{item?.name}</h3>
          </Box>
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
