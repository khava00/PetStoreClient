import { Link } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  getCurrentListName,
  listBreed,
} from "./../redux/Actions/ProductActions";
import { useNavigate } from "react-router-dom";

const Accordion = ({ category }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState([]);
  useEffect(() => {
    dispatch(listBreed(category.id, setContent));
  }, []);

  return (
    <li className="accordion-item">
      <div className="accordion-title">
        <span
          onClick={() => {
            navigate(`/pages/${category.id}`);
            dispatch(getCurrentListName(category.name));
          }}
          className="accordion-name"
        >
          {category.name}
        </span>
        {content.length > 0 && (
          <span onClick={() => setIsActive(!isActive)}>
            {isActive ? (
              <MdExpandMore />
            ) : (
              <MdExpandLess className="accordion-icon" />
            )}
          </span>
        )}
      </div>
      {isActive &&
        content.length > 0 &&
        content.map((cont) => (
          <div
            onClick={() => {
              navigate(`/pages/${category.id}/${cont.id}`);
              dispatch(getCurrentListName(cont.name));
            }}
            className="accordion-content"
          >
            {cont.name}
          </div>
        ))}
    </li>
  );
};

export default Accordion;
