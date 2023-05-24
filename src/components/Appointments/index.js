// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  updateStarImg = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isFavorite === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredClassNames = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="appointment">
            <div>
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.addAppointment}>
                <label className="title" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="input"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                />
                <br />
                <label className="date" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  className="input"
                  placeholder="dd/mm/yyyy"
                  value={dateInput}
                  onChange={this.onChangeDate}
                />
                <br />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointment-starred-container">
            <h2 className="appointment">Appointments</h2>
            <button
              type="button"
              className={`starred-btn ${filteredClassNames}`}
              onClick={this.onClickFilter}
            >
              starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                updateStarImg={this.updateStarImg}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
