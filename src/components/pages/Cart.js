import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends Component {
  onDelete(_id) {
    const currentCartToDelete = this.props.cart;
    const indexToDelete = currentCartToDelete.findIndex(function (cart) {
      return cart._id === _id
    });
    let cartAfterDelete = [...currentCartToDelete.slice(0, indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)];

    this.props.deleteCartItem(cartAfterDelete);
  }

  render () {
    if (this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }

  renderEmpty() {
    return (<div></div>);
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity) {
    if (quantity <= 0) { return; }

    this.props.updateCart(_id, -1);
  }

  renderCart() {
    const cartItemsList = this.props.cart.map(cartArr => {
      return (
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6>
              <span>    </span>
            </Col>

            <Col xs={12} sm={2}>
              <h6>usd. {cartArr.price}</h6>
            </Col>

            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle='success'>{cartArr.quantity}</Label></h6>
            </Col>

            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle='default' bsSize='small'>-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle='default' bsSize='small'>+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle='danger' bsSize='small'>DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)

    return (
      <Panel header='Cart' bsStyle='primary'>
        {cartItemsList}
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteCartItem: deleteCartItem,
    updateCart: updateCart
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
