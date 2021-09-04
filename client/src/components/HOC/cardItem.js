import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CardItem = (props) => {
  return (
    <Fragment>
      <Card>
        <Card.Body>
          <Link.Container to={`article/${props.item._id}`}>
            <Card.Link>
              <Card.Title>{props.item.title}</Card.Title>
            </Card.Link>
          </Link.Container>
          <Card.Text>{props.item.excerpt}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div>
            <small>
              Created by {props.item.author.name} {props.item.author.lastname}
            </small>
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default CardItem;
