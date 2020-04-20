import React, { Component, Fragment } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Table,
  Form,
  FormGroup,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/usersActions";
import PromoBG from "../../assets/images/apartmentsPromo.svg";
import PromoArrow from "../../assets/images/apartmentsArrow.svg";
import DotsLeft from "../../assets/images/apartmentsBodyLeftDots.svg";
import DotsRight from "../../assets/images/apartmentsBodyRightDots.svg";
import DotsBottom from "../../assets/images/apartmentsBottomrRigthDots.svg";
import PromoAvatar from "../../assets/images/infoPromoAvatar.svg";
import PromoPhone from "../../assets/images/infoPromoPhoneIcon.svg";
import PromoCurrency from "../../assets/images/infoPromoCurrencyIcon.svg";

class Info extends Component {
  state = {
    isModalOpen: false,
    notifyList: [2],
  };
  withNotify = (
    <div className="apartmentsPromoText">
      <h1 className="apartmentsPromoTitle">
        Здравствуйте, <span className="apartmentsPromoTitlePart">Нартай!</span>
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
          <div className="infoPromo">
            <div className="infoPromoAvatar">
              <img src={PromoAvatar} alt="" />
            </div>
            <div className="infoPromoContent">
              <h1 className="infoPromoNumber">Квартира #128</h1>
              <span className="infoPromoTitle">Информация об арендаторе</span>
              <h3 className="infoPromoFullName">Болатов Айболат</h3>
              <div className="infoPromoPhonePrice">
                <img src={PromoPhone} alt="" className="infoPromoPhoneIcon" />8
                747 525-45-65
              </div>
              <div className="infoPromoPhonePrice">
                <img
                  src={PromoCurrency}
                  alt=""
                  className="infoPromoPriceIcon"
                />
                100.000тг
              </div>
              <button className="infoPromoEdit">Редактировать</button>
              <div className="infoPromoDebt">
                <h5 className="infoPromoDebtText">
                  Общая задолженность клиента составляет:
                  <span className="infoPromoDebtSum">20.000тг</span>
                </h5>
              </div>
            </div>
          </div>
        </Container>
        <div className="apartmentsListBlock">
          <span className="apartmentsBackgroundLogo">L A T</span>
          <Container
            className="myContainer"
            style={{ position: "relative", padding: "105px 100px 84px" }}
          >
            <button className="infoHistoryBtn">Добавить+</button>
            <Table striped responsive style={{ color: "#fff" }}>
              <thead>
                <tr>
                  <th>Месяц</th>
                  <th>Сумма (тг)</th>
                  <th>Коммуналка (тг)</th>
                  <th>Статус</th>
                  <th>Остаток</th>
                  <th>Показатель счетчика</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Июнь</th>
                  <td>100.000</td>
                  <td>25.000</td>
                  <td>полностью оплачено</td>
                  <td>0</td>
                  <td>123456766352</td>
                </tr>
                <tr>
                  <th scope="row">Июль</th>
                  <td>1000</td>
                  <td>25.000</td>
                  <td>полностью оплачено</td>
                  <td>0</td>
                  <td>123456766352</td>
                </tr>
                <tr>
                  <th scope="row">Август</th>
                  <td>1000</td>
                  <td>25.000</td>
                  <td>не полностью оплачено</td>
                  <td>0</td>
                  <td>123456766352</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>

        <img className="apartmentsDotsLeft" src={DotsLeft} alt="" />
        <img className="apartmentsDotsRight" src={DotsRight} alt="" />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.users.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userData) => dispatch(loginUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
