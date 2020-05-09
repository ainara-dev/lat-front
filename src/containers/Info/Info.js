import React, { Component } from "react";
import { Container, Table, Spinner, ModalBody, Modal } from "reactstrap";
import { connect } from "react-redux";
import {
  fetchResident,
  updateResidentAndPrice,
  fetchPremises,
  createPayment,
  fetchPayments
} from "../../store/actions/actions";
import equal from 'fast-deep-equal'
import DotsLeft from "../../assets/images/apartmentsBodyLeftDots.svg";
import DotsRight from "../../assets/images/apartmentsBodyRightDots.svg";
import PromoAvatar from "../../assets/images/infoPromoAvatar.svg";
import PromoPhone from "../../assets/images/infoPromoPhoneIcon.svg";
import PromoCurrency from "../../assets/images/infoPromoCurrencyIcon.svg";

class Info extends Component {
  constructor(props) {
    super(props);


    this.state = {
      isModalOpen: false,
      isPaymentModalOpen: false,
      notifyList: [2],
      premise: null,
      premiseType: null,
      resident: null,
      paymentInfo: null,
      payments: null
    };
  }

  componentDidMount() {
    this.props.onFetchPremises(this.props.user.ID)
    if(this.state.premises) {
      this.getPremise()
    }
    this.getResident();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!equal(prevProps.resident, this.props.resident)) {
      this.getPayments(this.props.resident.ID)
      this.setState({resident: this.props.resident})
    } else if (!equal(prevProps.payments, this.props.payments)) {
      this.setState({payments: this.props.payments})
    } else if (prevProps.premises.length !== this.props.premises.length) {
      let premiseID = this.props.match.params["0"];
      console.log("COMMON",this.props.premises)
      const premise = this.props.premises.filter(
        (premise) => premise.ID.toString() === premiseID
      )[0];
      this.getResident(premise.residentID)
      this.setState({premises: this.props.premises, premise})
    }
  }

  getPremise = () =>{
    let premiseID = this.props.match.params["0"];
    const premise = this.props.premises.filter(
      (premise) => premise.ID.toString() === premiseID
    )[0];

    let premiseType;
    if (premise) {
      if (premise.type === "apartment") {
        premiseType = "Квартира";
      } else if (premise.type === "office") {
        premiseType = "Оффис";
      } else {
        premiseType = "Бутик";
      }
      this.setState({premiseType})
    } else {

    }
  }

  inputChangeHandler = (e) => {
    if(e.target.name === 'price') {
      const premise = { ...this.state.premise };
      premise[e.target.name] = e.target.value;
      this.setState({ premise });
    } else {
      const resident = { ...this.state.resident };
      resident[e.target.name] = e.target.value;
      this.setState({ resident });
    }
  };

  inputChangePaymentHandler = (e) => {
    const paymentInfo = {...this.state.paymentInfo}
    paymentInfo[e.target.name] = e.target.value
    this.setState({paymentInfo})
  }

  getResident = (premiseResidentID) => {
      this.props.onFetchResident(premiseResidentID);
      console.log("Resident get ", this.props.resident);
      this.setState({ resident: this.props.resident });
  };

  getPayments = (residentID) => {
    this.props.onFetchPayments(residentID)
    this.setState({payments: this.props.payments})
  }


  toggleChangeResident = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  toggleAddPayment = () => {
    this.setState({isPaymentModalOpen: !this.state.isPaymentModalOpen})
  }

  updateResidentAndPrice = (e) => {
    e.preventDefault()
    let residentAndPrice = {
      resident:this.state.resident,
      premise: this.state.premise
    }
    residentAndPrice.premise.price = parseInt(this.state.premise.price)
    this.props.onUpdateResident(residentAndPrice)
    this.toggleChangeResident()
  }

  createPayment = e => {
    e.preventDefault()
    let body = {...this.state.paymentInfo}
    body.residentID = this.props.resident.ID
    body.sum = parseInt(this.state.paymentInfo.sum)
    body.debt = parseInt(this.state.paymentInfo.debt)
    body.communal = parseInt(this.state.paymentInfo.communal)
    body.counterIndicator = parseInt(this.state.paymentInfo.counterIndicator)
    this.props.onCreatePayment(body)
    this.toggleAddPayment()
  }

  render() {
    const { isModalOpen, isPaymentModalOpen, premise, premiseType } = this.state;
    const { resident, premises } = this.props;
    console.log(this.state);
    console.log("Props", this.props);
    return premise && resident ? (
      <>

        {/*Добавление оплаты*/}
        <Modal
          className="mainModal"
          isOpen={isPaymentModalOpen}
          toggle={this.toggleAddPayment}
          contentClassName="mainModalContent"
        >
          <ModalBody className="mainModalBody">
            <h3 className="mainModalTitle">Заполните данные по оплате</h3>
            <form onSubmit={this.createPayment}>
              <input
                className="mainModalInput"
                type="text"
                name="month"
                placeholder="Месяц"
                onChange={this.inputChangePaymentHandler}
              />

              <input
                className="mainModalInput"
                type="text"
                name="sum"
                placeholder="Сумма(тг)"
                onChange={this.inputChangePaymentHandler}
              />

              <input
                className="mainModalInput"
                type="number"
                name="communal"
                placeholder="Коммуналка(тг)"
                onChange={this.inputChangePaymentHandler}
              />

              <input
                className="mainModalInput"
                type="text"
                name="status"
                placeholder="Статус"
                onChange={this.inputChangePaymentHandler}
              />

              <input
                className="mainModalInput"
                type="number"
                name="debt"
                placeholder="Остаток"
                onChange={this.inputChangePaymentHandler}
              />

              <input
                className="mainModalInput"
                type="number"
                name="counterIndicator"
                placeholder="Показатель счетчика"
                onChange={this.inputChangePaymentHandler}
              />

              <input
                className="mainModalButton"
                type="submit"
                value="Добавить"
              />
            </form>
          </ModalBody>
        </Modal>


        {/* Изменение данных о клиенте */}
        <Modal
          className="mainModal"
          isOpen={isModalOpen}
          toggle={this.toggleChangeResident}
          contentClassName="mainModalContent"
        >
          <ModalBody className="mainModalBody">
            <h3 className="mainModalTitle">Редактируйте данные о клиенте</h3>
            <form onSubmit={this.updateResidentAndPrice}>
              <span className="infoResidentEditTitle">Имя арендатора</span>
              <input
                className="mainModalInput"
                type="text"
                name="firstName"
                placeholder="Имя арендатора"
                value={this.state.resident ? this.state.resident.firstName: ''}
                onChange={this.inputChangeHandler}
              />

              <span className="infoResidentEditTitle">Фамилия</span>
              <input
                className="mainModalInput"
                type="text"
                name="lastName"
                placeholder="Фамилия арендатора"
                value={this.state.resident ? this.state.resident.lastName: ''}
                onChange={this.inputChangeHandler}
              />

              <span className="infoResidentEditTitle">Номер телефона</span>
              <input
                className="mainModalInput"
                type="tel"
                name="phone"
                placeholder="Номер телефона"
                value={this.state.resident ? this.state.resident.phone: ''}
                onChange={this.inputChangeHandler}
              />

              <span className="infoResidentEditTitle">Цена</span>
              <input
                className="mainModalInput"
                type="number"
                name="price"
                placeholder="Сумма(цена) за месяц"
                value={this.state.premise ? this.state.premise.price: ''}
                onChange={this.inputChangeHandler}
              />
              <input
                className="mainModalButton"
                type="submit"
                value="Редактировать"
              />
            </form>
          </ModalBody>
        </Modal>
        <Container className="myContainer" style={{ position: "relative" }}>
          <div className="infoPromo">
            <div className="infoPromoAvatar">
              <img src={PromoAvatar} alt="" />
            </div>
            <div className="infoPromoContent">
              <h1 className="infoPromoNumber">
                {premiseType} #{premise.number}
              </h1>
              <span className="infoPromoTitle">Информация об арендаторе</span>
              <h3 className="infoPromoFullName">
                {resident.lastName} {resident.firstName}
              </h3>
              <div className="infoPromoPhonePrice">
                <img src={PromoPhone} alt="" className="infoPromoPhoneIcon" />
                {resident.phone}
              </div>
              <div className="infoPromoPhonePrice">
                <img
                  src={PromoCurrency}
                  alt=""
                  className="infoPromoPriceIcon"
                />
                {premise.price}тг
              </div>
              <button
                className="infoPromoEdit"
                onClick={this.toggleChangeResident}
              >
                Редактировать
              </button>
              {resident.debt ? (
                <div className="infoPromoDebt">
                  <h5 className="infoPromoDebtText">
                    Общая задолженность клиента составляет:
                    <span className="infoPromoDebtSum">20.000тг</span>
                  </h5>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
        <div className="apartmentsListBlock">
          <span className="apartmentsBackgroundLogo">L A T</span>
          <Container
            className="myContainer"
            style={{ position: "relative", padding: "105px 100px 84px" }}
          >
            <button className="infoHistoryBtn" onClick={this.toggleAddPayment}>Добавить+</button>
            {this.state.payments && this.state.payments.length > 0 ?
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
              {this.state.payments.map(payment => {
                return (
                  <tr key={payment.ID}>
                    <th scope="row">{payment.month}</th>
                    <td>{payment.sum}</td>
                    <td>{payment.communal}</td>
                    <td>{payment.status}</td>
                    <td>{payment.debt}</td>
                    <td>{payment.counterIndicator}</td>
                  </tr>
                )
              })}

              </tbody>
            </Table>
              :
              <div className='infoHistoryNoData'>
                <h2>Нет данных об оплате</h2>
              </div>
            }
          </Container>
        </div>

        <img className="apartmentsDotsLeft" src={DotsLeft} alt="" />
        <img className="apartmentsDotsRight" src={DotsRight} alt="" />
      </>
    ) : (
      <Container>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spinner color="primary" style={{ width: "500px", height: "500px" }} />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.users.loginError,
    premises: state.premises.premises,
    resident: state.residents.resident,
    user: state.users.user,
    payments: state.payments.payments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchResident: (residentID) => dispatch(fetchResident(residentID)),
    onUpdateResident: (residentAndPrice) =>
      dispatch(updateResidentAndPrice(residentAndPrice)),
    onFetchPremises: (userID) => dispatch(fetchPremises(userID)),
    onCreatePayment: payment => dispatch(createPayment(payment)),
    onFetchPayments: (residentID) => dispatch(fetchPayments(residentID))
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
