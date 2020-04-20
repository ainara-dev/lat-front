import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProductThumbnail from "../ProductThumbnail/ProductThumbnail";

const ProductItem = (props) => {
  return (
    <Col md="4">
      <Card>
        <CardBody>
          <CardTitle>
            <Link to={"/products/" + props.id}>{props.name}</Link>
          </CardTitle>
          <ProductThumbnail photo={props.photo} />
          <p>{props.price} USD</p>
        </CardBody>
      </Card>
    </Col>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default ProductItem;
