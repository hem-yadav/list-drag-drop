import React from "react";
import { Button, Text, Divider, CardList } from "../../components";
import { connect } from "react-redux";

class Trello extends React.Component {
  addCardList = () =>
    this.props.actionHandler({
      type: "ADD_CARD_LIST",
    });

  render() {
    return (
      <div>
        <Text
          classes={"header text-weight-bold text-align-center"}
          text={"Trello Board"}
        />
        <Divider classes={"margin-vertical-m"} />
        <Button
          classes={{ wrapper: "flex-end" }}
          onClick={this.addCardList}
          text={"ADD LIST"}
        />
        <div className="display-flex flex-wrap">
          {Object.keys(this.props.cards).map((listId) => (
            <CardList
              key={listId}
              {...{
                listId,
                data: this.props.cards[listId],
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.trello.cards,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actionHandler: (action) => dispatch(action),
  };
};

export const TrelloBoard = connect(mapStateToProps, mapDispatchToProps)(Trello);
