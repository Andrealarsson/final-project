import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, batch } from "react-redux";
import moment from "moment";

import { API_URL } from "../reusable/urls";
import trip from "../reducers/trip";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import AddTrip from "../components/AddTrip"
import airplane from "../assets/airplane.png";
import bin from "../assets/bin.png";
import { 
  TripSection, 
  TitleContainer, 
  TripIcon, 
  TripTitle, 
  TripContainer, 
  TripInfo, 
  TripList, 
  Destination, 
  Departure, 
  RemoveButton 
} from "./Trip.style";

const Trip = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  const trips = useSelector((store) => store.trip.trip);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL("users/trip"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(trip.actions.setTrip(data.trip));
          dispatch(trip.actions.setErrors(null));
        } else {
          dispatch(trip.actions.setErrors(data));
        }
      })
      .catch();
  }, [accessToken, userId, dispatch]);

  const onClickDelete = (tripId) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };

    fetch(API_URL(`users/trip/${tripId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(trip.actions.setTrip(data.trip));
            dispatch(trip.actions.setErrors(null));
          });
        } else {
          dispatch(trip.actions.setErrors(data));
        }
      });
  };

  return (
    <>
      <TripSection>
        <Navbar />
        <TripContainer>
          {trips
            .map((trip, index) => (
              <TripInfo key={trip._id}>
                {index === 0 && <Timer
                  countdownDate={trips[0].departure}
                  destination={trips[0].destination}
                />}
                {index === 0 && <TitleContainer>
                  <TripIcon
                    src={airplane}
                    width="20"
                    height="20"
                    alt="airplane icon"
                  />
                  <TripTitle>KOMMANDE RESOR</TripTitle>
                </TitleContainer>}
                <TripList>
                  <Destination>{trip.destination}</Destination>
                  <Departure>
                    {/* {moment(trip.departure).local().format("D MMM YYYY, HH:mm")} */}
                    {moment.utc(trip.departure).format("D MMM YYYY, HH:mm")}
                  </Departure>
                  <RemoveButton
                    type="button"
                    onClick={() => onClickDelete(trip._id)}>
                    <img src={bin}
                    width="18"
                    height="18"
                    alt="bin icon"
                  />
                  </RemoveButton>
                </TripList>
              </TripInfo>
            ))}
        </TripContainer>
        <AddTrip/>
      </TripSection>
    </>
  );
};

export default Trip;