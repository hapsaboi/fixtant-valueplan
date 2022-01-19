import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { useAuth } from "contexts/AuthContext";
import axios from 'axios';
import Notifications from "../../components/Notification/Notification";
import { user } from '../../data/api';

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

export default () => {
  const { userDetail, setUserDetail } = useAuth();
  const [userData, setUserData] = useState(userDetail);
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });

  async function editProfile(e) {
    e.preventDefault();
    await axios.patch(user.editProfile, userData).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Profile Updated Successfully", type: "success", change: res.data.change });
        setUserDetail(userData);
      }
      else {
        setNotificationDetails({ msg: "Error Updating Profile", type: "Danger" });
      }
      setNotificationStatus(true);
    });
  }
  return (
    <Container>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Profile</h2>

            <TwoColumn>
              <Column>
                <InputContainer>
                  <Label htmlFor="name-input">Your Name</Label>
                  <Input id="name-input" type="text" name="name" placeholder="E.g. John Doe"
                    defaultValue={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="email-input">Your Email Address</Label>
                  <Input id="email-input" type="email" name="email" placeholder="E.g. john@mail.com"
                    defaultValue={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </InputContainer>
              </Column>
              <Column>
                <InputContainer>
                  <Label htmlFor="name-input">Phone </Label>
                  <Input id="name-input" type="text" name="name" placeholder="E.g. 09012345678"
                    defaultValue={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="name-input">DOB</Label>
                  <Input id="name-input" type="date" placeholder="E.g. John Doe"
                    defaultValue={new Date(userData.dob)}
                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                  />
                </InputContainer>
              </Column>
            </TwoColumn>

            <SubmitButton type="submit" value="Submit" onClick={(e) => editProfile(e)}>Submit</SubmitButton>

          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
