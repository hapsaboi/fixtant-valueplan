import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import repair from '../../images/repair2.svg';

import { Link } from "react-router-dom";
import Header, { LogoLink } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

// const NavLink = tw(NavLinkBase)`
//   sm:text-sm sm:mx-6
// `;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  background-image: url(${repair}); background-repeat: no-repeat;
  ${tw`bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

export default ({
  heading = (
    <>
      Value Plan,
      <wbr />
      <br />
      <span tw="text-primary-500">No More Costly Repairs.</span>
    </>
  ),
  description = "Did you know you could cut repair costs in half? Our Value Plan relieves stress and anxiety for smart phone owners. Accidents happen. Sign up below and save thousands on your next phone repair. We are here to help.",
  primaryActionUrl = "/signup",
  primaryActionText = "Sign Up",
  secondaryActionUrl = "/codeverify",
  secondaryActionText = "Insert Code"
}) => {
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader collapseBreakpointClass="sm" />
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <Link to={primaryActionUrl} className="action primaryAction">
                {primaryActionText}
              </Link>
              <Link to={secondaryActionUrl} className="action secondaryAction">
                {secondaryActionText}
              </Link>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
};
