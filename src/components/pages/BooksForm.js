'use strict';

import React, { Component } from 'react'
import { 
  InputGroup, DropdownButton, Image, Col, Row, 
  Well, Panel, FormControl, FormGroup, ControlLabel, Button, 
  MenuItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks, deleteBooks, getBooks, resetButton } from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends Component {
  constructor() {
    super();

    this.state = {
      images: [{}],
      img: ''
    };
  }

  componentDidMount() {
    this.props.getBooks();

    axios.get('/api/images')
      .then(function(response) {
        this.setState({ images: response.data });
      }.bind(this))
      .catch(function(err) {
        this.setState({ images: 'error loading image files from the server', img: '' });
      }.bind(this));
  }
  
  handleSubmit() {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.images).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBooks(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(bookId);
  }

  handleSelect(name) {
    this.setState({ img: '/images/' + name });
  }

  resetForm() {
    this.props.resetButton();

    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({ img: '' });
  }

  render () {
    const booksList = this.props.books.map(book => {
      return <option key={book._id}>{book._id}</option>
    });

    const imgList = this.state.images.map(function(image, i) {
      return (
        <MenuItem 
          key={i} 
          eventKey={image.name}
          onClick={this.handleSelect.bind(this, image.name)}
        >
          {image.name}
        </MenuItem>
      );
    }, this);

    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                  <FormControl type="text" ref="images" value={this.state.img} />
                  <DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Select an image"
                    bsStyle="primary">
                    {imgList}
                  </DropdownButton>
                </InputGroup>
                <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>

          <Panel>
            <FormGroup controlId="title" validationState={this.props.validation}>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Title"
                ref="title" />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="description" validationState={this.props.validation}>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Description"
                ref="description" />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="price" validationState={this.props.validation}>
              <ControlLabel>Price</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Price"
                ref="price" />
              <FormControl.Feedback />
            </FormGroup>
            
            <Button 
              onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)) : (this.resetForm.bind(this))} 
              bsStyle={(!this.props.style) ? ('primary') : (this.props.style)}
            >
              {(!this.props.msg) ? ('Save book') : (this.props.msg)}
            </Button>
          </Panel>

          <Panel style={{marginTop: '25px'}}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select a book id to delete</ControlLabel>
              <FormControl ref="delete" componentClass="select" placeholder="select">
                <option value="select">select</option>
                {booksList}
              </FormControl>
            </FormGroup>
            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
          </Panel>

          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style, 
    validation: state.books.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks: postBooks,
    deleteBooks: deleteBooks,
    getBooks: getBooks,
    resetButton: resetButton
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
