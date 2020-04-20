import React, { Component, Fragment } from "react";
import { Button, Row } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/actions/actions";
import ProductItem from "../../components/ProductItem/ProductItem";

class Products extends Component {
  componentDidMount() {
    this.props.onFetchProducts();
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Products</h1>
          {this.props.user && this.props.user.role === "admin" && (
            <Button tag={Link} to="/products/new" color="primary">
              Add Product
            </Button>
          )}
        </div>
        <Row>
          {this.props.products.map((product) => {
            return (
              <ProductItem
                id={product._id}
                key={product._id}
                name={product.name}
                price={product.price}
                photo={product.photo}
              />
            );
          })}
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    user: state.users.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
