// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = prop => {
  const {appointmentDetails, updateStarImg} = prop
  const {id, title, date, isFavorite} = appointmentDetails
  const starImageUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onClickStarImg = () => {
    updateStarImg(id)
  }

  return (
    <li className="appointment-list-container">
      <div className="appointment-details">
        <div className="title-star-container">
          <p className="titleInput">{title}</p>
          <button
            data-testid="star"
            type="button"
            className="star-button"
            onClick={onClickStarImg}
          >
            <img src={starImageUrl} alt="star" />
          </button>
        </div>
        <p className="date-style">Date: {dateFormat}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
