import React from "react";
import { Link } from "react-router-dom";
import "./category.css";

interface Props {
  item: any;
}

function CategoryCard(props: Props) {
  let { item } = props;
  return (
    <Link to="">
      <div className="catCard">
        <img
          src={item.img}
          alt=""
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: 10 }}
        />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
}
export default CategoryCard;
