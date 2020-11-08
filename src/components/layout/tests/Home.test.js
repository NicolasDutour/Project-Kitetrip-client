import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import Home from "../Home";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

describe("<Home />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("should render without errors", () => {});

  it("should render 1 Button component", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it("should render 1 Link component", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
