import React, { Component } from "react";
import { Container, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { createPremise, fetchPremises } from "../../store/actions/actions";
import { Link } from "react-router-dom";
import PromoBG from "../../assets/images/apartmentsPromo.svg";
import PromoArrow from "../../assets/images/apartmentsArrow.svg";
import DotsLeft from "../../assets/images/apartmentsBodyLeftDots.svg";
import DotsRight from "../../assets/images/apartmentsBodyRightDots.svg";
import DotsBottom from "../../assets/images/apartmentsBottomrRigthDots.svg";
import TopChooseArrow from "../../assets/images/apartmentTopChooseArrow.svg";
import HouseIcon from "../../assets/images/apartmentHouseIcon.svg";
import AvatarIcon from "../../assets/images/apartmentsPromoNotifyAvatar.svg";
import NotifyArrow from "../../assets/images/apartmentsNotifyOthersArrow.svg";
import equal from "fast-deep-equal";

class Apartments extends Component {
  constructor(props) {
    super(props);
    const premiseInfo = props.premises.filter(
      (premise) => premise.ID.toString() === this.premiseID
    )[0];
    this.state = {
      notifyList: [],
      isModalOpen: false,
      directionType: this.props.user.directionTypes[0],
      premiseInfo,
      premises: []
    }
  }

  componentDidMount() {
    this.props.fetchPremises(this.props.user.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!equal(prevProps.premises, this.props.premises)) {
      this.setState({premises: this.props.premises})
    }
  }

  withNotify = (
    <div className="apartmentsPromoText">
      <h1 className="apartmentsPromoTitle">
        Здравствуйте,{" "}
        <span className="apartmentsPromoTitlePart">
          {this.props.user.firstName}!
        </span>
      </h1>
      <span className="apartmentsPromoSubTitle">
        Теперь управление бизнесом легко
      </span>
    </div>
  );

  toggleAddApartment = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  directionChangeHandler = (e) => {
    this.setState({ directionType: e.target.id });
  };

  inputChangeHandler = (e) => {
    const premiseInfo = { ...this.state.premiseInfo };
    premiseInfo[e.target.name] = e.target.value;
    this.setState({ premiseInfo });
  };

  submitFormHandler = (e) => {
    e.preventDefault();
    const premiseInfo = { ...this.state.premiseInfo };
    premiseInfo.price = parseInt(premiseInfo.price);
    premiseInfo.type = this.state.directionType;
    premiseInfo.id = this.props.user.id;
    this.props.createPremise(premiseInfo);
    this.toggleAddApartment()
  };

  render() {
    const { isModalOpen, directionType, notifyList } = this.state;
    console.log('Apartment Props', this.props)
    return (
      <>
        <Container className="myContainer" style={{ position: "relative" }}>
          <div className="apartmentsPromo">
            {notifyList.length === 0 ? (
              this.withNotify
            ) : (
              <div className="apartmentsPromoText2">
                <h1 className="apartmentsPromoTitle2">
                  Здравствуйте,{" "}
                  <span className="apartmentsPromoTitlePart">
                    {this.props.user.firstName}!
                  </span>
                </h1>
                <span className="apartmentsPromoSubTitle2">
                  Теперь управление бизнес ом легко
                </span>
                <div className="apartmentsPromoNotify">
                  <div className="apartmentsPromoNotifyAvatar">
                    <img src={AvatarIcon} alt="" />
                  </div>
                  <div className="apartmentsPromoNotifyResidentInfo">
                    <span className="apartmentsPromoNotifyFullName">
                      Болатов Айболат
                    </span>
                    <span className="apartmentsPromoNotifyTimeLeft">
                      Осталось 2 дня до оплаты аренды
                    </span>
                    <button className="apartmentsPromoNotifyCall">
                      Позвонить
                    </button>
                    <button className="apartmentsPromoNotifyCall">
                      Отправить смс
                    </button>
                  </div>
                  <div className="apartmentsPromoNotifyOthers">
                    Остальные {""}
                    <img src={NotifyArrow} alt="" />
                  </div>
                </div>
              </div>
            )}

            <img className="apartmentsPromoImage" src={PromoBG} alt="" />
            <img className="apartmentsPromoArrow" src={PromoArrow} alt="" />
          </div>
        </Container>
        <div className="apartmentsListBlock">
          <span className="apartmentsBackgroundLogo">L A T</span>
          <Container className="myContainer">
            <Modal
              className="mainModal"
              isOpen={isModalOpen}
              toggle={this.toggleAddApartment}
              contentClassName="mainModalContent"
            >
              <ModalBody className="mainModalBody">
                <h3 className="mainModalTitle">
                  Заполните информацию об арендаторе
                </h3>
                <form onSubmit={this.submitFormHandler}>
                  <input
                    className="mainModalInput"
                    type="text"
                    name="firstName"
                    placeholder="Имя арендатора"
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    className="mainModalInput"
                    type="text"
                    name="lastName"
                    placeholder="Фамилия арендатора"
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    className="mainModalInput"
                    type="tel"
                    name="phone"
                    placeholder="Номер телефона"
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    className="mainModalInput"
                    type="number"
                    name="number"
                    placeholder="Номер квартиры"
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    className="mainModalInput"
                    type="text"
                    name="address"
                    placeholder="Адрес квартиры"
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    className="mainModalInput"
                    type="number"
                    name="price"
                    placeholder="Сумма(цена) за месяц"
                    onChange={this.inputChangeHandler}
                  />
                  <input
                    className="mainModalButton"
                    type="submit"
                    value="Добавить"
                  />
                </form>
              </ModalBody>
            </Modal>

            <div className="apartmentsTopChoose">
              {this.props.user.directionTypes.map((direction) => {
                let title = "Квартиры";
                if (direction === "office") {
                  title = "Офисы";
                } else if (direction === "boutique") {
                  title = "Бутики";
                }
                let className =
                  directionType === direction
                    ? "apartmentsTopChooseText apartmentsTopChooseTextUnderline"
                    : "apartmentsTopChooseText";
                return (
                  <span
                    key={direction}
                    id={direction}
                    className={className}
                    onClick={this.directionChangeHandler}
                  >
                    {title}
                  </span>
                );
              })}
              <div className="apartmentsTopChooseLineBox">
                <div className="apartmentsTopChooseLine" />
                <img
                  src={TopChooseArrow}
                  alt=""
                  className="apartmentTopChooseArrow"
                />
              </div>
            </div>

            <div className="apartmentsBottomChoose">
              {this.props.premises.length > 0 ? (
                this.props.premises
                  .filter(
                    (premise) => premise.type === this.state.directionType
                  )
                  .map((premise) => {
                    return (
                      <button
                        className="apartmentNumber"
                        key={premise.ID.toString()}
                      >
                        <Link
                          to={`/info/${premise.ID}`}
                          className="apartmentNumberLink"
                        >
                          <img
                            className="apartmentNumberIcon"
                            src={HouseIcon}
                            alt=""
                          />
                          <span className="apartmentNumberTitle">
                            Квартира #{premise.number}
                          </span>
                        </Link>
                      </button>
                    );
                  })
              ) : (
                <h3> Вы еще не добавили квартир</h3>
              )}
              <div
                className="apartmentNumber apartmentsNumberAdd"
                onClick={this.toggleAddApartment}
              >
                <span className="apartmentNumberAddIcon">+</span>
                <span className="apartmentNumberAddText">Добавить</span>
              </div>
            </div>
          </Container>
        </div>

        <img className="apartmentsDotsLeft" src={DotsLeft} alt="" />
        <img className="apartmentsDotsRight" src={DotsRight} alt="" />
        <img className="apartmentsDotsBottom" src={DotsBottom} alt="" />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.premises.premiseError,
    user: state.users.user,
    premises: state.premises.premises,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPremise: (premiseData) => dispatch(createPremise(premiseData)),
    fetchPremises: (id) => dispatch(fetchPremises(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);
