import * as React from "react";
import Header from "../layouts/headers/";
import TrustedBy from "../layouts/sections/trusted_by";
import WhyPrpohelp from "../layouts/sections/why_prohelp";
import BestPart from "../layouts/sections/best_part";
import Slide from "../components/slide/slider";
import PopularJobs from "../layouts/sections/popular_jobs";

export default function RootPage() {
  return (
    <div>
      <Header />
      <TrustedBy />
      <Slide /> 
      <PopularJobs />
      <BestPart />
      <WhyPrpohelp />
    </div>
  );
}
