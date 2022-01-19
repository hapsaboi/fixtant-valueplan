import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
// import Hero from "components/hero/FullWidthWithImage.js";
// import Features from "components/features/ThreeColSimple.js";
// import MainFeature from "components/features/TwoColSingleFeatureWithStats.js";
// import SliderCard from "components/cards/ThreeColSlider.js";
// import FAQ from "components/faqs/SingleCol";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.js";


export default () => (
  <AnimationRevealPage>

    <SubscribeNewsLetterForm />
    <Footer />
  </AnimationRevealPage>
);
