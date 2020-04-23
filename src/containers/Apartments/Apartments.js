import React, { Component, Fragment } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../store/actions/usersActions";
import PromoBG from "../../assets/images/apartmentsPromo.svg";
import PromoArrow from "../../assets/images/apartmentsArrow.svg";
import DotsLeft from "../../assets/images/apartmentsBodyLeftDots.svg";
import DotsRight from "../../assets/images/apartmentsBodyRightDots.svg";
import DotsBottom from "../../assets/images/apartmentsBottomrRigthDots.svg";
import TopChooseArrow from "../../assets/images/apartmentTopChooseArrow.svg";
import HouseIcon from "../../assets/images/apartmentHouseIcon.svg";
import AvatarIcon from "../../assets/images/apartmentsPromoNotifyAvatar.svg";
import NotifyArrow from "../../assets/images/apartmentsNotifyOthersArrow.svg";

class Apartments extends Component {
  state = {
    isModalOpen: false,
    notifyList: [],
    isApartment: true,
    isOffice: false,
    isBoutique: false,
  };
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

  render() {
    const { isModalOpen } = this.state;
    return (
      <>
        <Container className="myContainer" style={{ position: "relative" }}>
          <div className="apartmentsPromo">
            {this.state.notifyList.length === 0 ? (
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
                <form>
                  <input
                    className="mainModalInput"
                    type="text"
                    name="firstName"
                    placeholder="Имя арендатора"
                  />
                  <input
                    className="mainModalInput"
                    type="text"
                    name="lastName"
                    placeholder="Фамилия арендатора"
                  />
                  <input
                    className="mainModalInput"
                    type="tel"
                    name="phone"
                    placeholder="Номер телефона"
                  />
                  <input
                    className="mainModalInput"
                    type="number"
                    name="apartmentNumber"
                    placeholder="Номер квартиры"
                  />
                  <input
                    className="mainModalInput"
                    type="text"
                    name="address"
                    placeholder="Адрес квартиры"
                  />
                  <input
                    className="mainModalInput"
                    type="number"
                    name="sum"
                    placeholder="Сумма(цена) за месяц"
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
              <span className="apartmentsTopChooseText">Квартиры</span>
              <span className="apartmentsTopChooseText">Офисы</span>
              <span className="apartmentsTopChooseText">Бутики</span>
              <div className="apartmentsTopChooseLine" />
              <img
                src={TopChooseArrow}
                alt=""
                className="apartmentTopChooseArrow"
              />
            </div>
            <div className="apartmentsBottomChoose">
              <div className="apartmentNumber">
                <img className="apartmentNumberIcon" src={HouseIcon} alt="" />
                <span className="apartmentNumberTitle">Квартира #1</span>
              </div>
              <div className="apartmentNumber">
                <img className="apartmentNumberIcon" src={HouseIcon} alt="" />
                <span className="apartmentNumberTitle">Квартира #2</span>
              </div>
              <div
                className="apartmentNumber"
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
  console.log("Global state: ", state);
  return {
    error: state.users.loginError,
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userData) => dispatch(loginUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apartments);
