import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, batch } from "react-redux";
import styled from "styled-components/macro";
import moment from "moment";

import { API_URL } from "../reusable/urls";
import trip from "../reducers/trip";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import AddTrip from "../components/AddTrip"
import sfomobile from "../assets/sfomobile.jpg";
import sfo from "../assets/sfo.jpg";
import airplane from "../assets/airplane.png";

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

    const options2 = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL(`users/trip/${tripId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          batch(() => {
            dispatch(trip.actions.removeTrip(data.removeTrip));
            dispatch(trip.actions.setErrors(null));
          });
        } else {
          dispatch(trip.actions.setErrors(data));
        }
      });
    return fetch(API_URL("users/trip"), options2)
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

  console.log(trips);

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
                    {moment(trip.departure).format("D MMM YYYY, HH:mm")}
                  </Departure>
                  <RemoveButton
                    type="button"
                    onClick={() => onClickDelete(trip._id)}
                  >
                    x
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

const TripSection = styled.section`
  background-image: url("${sfomobile}");
  background-size: cover;
  overflow-x: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 1024px) {
    background-image: url("${sfo}");
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    max-width: 800px;
    margin-bottom: 20px;
  }
`;

const TripIcon = styled.img`
  margin-right: 2px;
`;

const TripTitle = styled.h2`
  color: #ffffff;
  margin: 0px;
  font-size: 15px;

  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

const TripContainer = styled.div`
  min-height: 300px;
  width: 80%;
  margin-bottom: 80px;

  @media (min-width: 768px) {
    max-width: 800px;
  }
 
`;
const TripInfo = styled.div``;

const TripList = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  text-align: start;
  justify-content: space-between;
  margin: 3px;
  padding: 11px;
`;

const Destination = styled.h2`
  font-size: 14px;
  margin: 5px;
  color: #414344;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Departure = styled(Destination)``;

const RemoveButton = styled.button`
  font-size: 20px;
  background-color: #ffffff;
  color: #414344;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    color: #7497ad;
  }
  @media (min-width: 768px) {
  }
`;
