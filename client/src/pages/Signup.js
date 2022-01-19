import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
//import logo from "images/logo.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import Axios from 'axios';
import { authenticate } from '../data/api';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;


function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState('');


  async function registerFunc(e) {
    setMessage("");
    e.preventDefault();

    try {
      let nemail = email.toLowerCase().replace(/ /g, '');
      const registerData = { name, email: nemail, phone, dob, password };
      const response = await Axios.post(authenticate.addUser, registerData);
      setMessage(response.data.msg + '.');
      setTimeout(() => {
        setMessage("");
      }, 5000);
      document.getElementById("register").reset();
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.msg + '!');
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }

  }

  let data = {
    logoLinkUrl : "#",
    illustrationImageSrc : illustration,
    headingText : "Sign Up For Train Book",
    submitButtonText : "Sign Up",
    tosUrl : "#",
    privacyPolicyUrl : "#",
    signInUrl : "/login" 
  }

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={data.logoLinkUrl}>
              <LogoImage src={data.logo} />
            </LogoLink>
            <MainContent>
              <Heading>{data.headingText}</Heading>
              <h4 style={{ color: 'red', textAlign: 'center',paddingTop:"-100px" }}>{message}</h4>
              <FormContainer>
                <Form>
                  <Input type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
                  <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  <Input type="text" placeholder="Phone - 090123456789" onChange={(e) => setPhone(e.target.value)} />
                  <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  <Input type="date" onChange={(e) => setDOB(e.target.value)} />

                  <SubmitButton type="submit" onClick={(e)=>{registerFunc(e)}}>
                    <SignUpIcon className="icon" />
                    <span className="text">{data.submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by train books{" "}
                    <a href={data.tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href={data.privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to={data.signInUrl} tw="border-b border-gray-500 border-dotted" p>
                      Sign In
                    </Link>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={data.illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  )
};

export default SignUp;