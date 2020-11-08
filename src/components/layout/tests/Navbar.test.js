import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Link } from "react-router-dom";

configure({ adapter: new Adapter() });

import Navbar from "../Navbar";
import store from "../../../store";
import { Button, Container, CircularProgress } from "@material-ui/core";

describe("<Navbar />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar store={store} />)
      .childAt(0)
      .dive();
  });

  it("should render without errors", () => {});

  it("should render 1 Container element", () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  it("should render 3 Button elements if not isAuthenticated", () => {
    wrapper.setProps({ auth: { isAuthenticated: false, loading: false } });
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it("should render 4 Link elements if not isAuthenticated", () => {
    wrapper.setProps({ auth: { isAuthenticated: false, loading: false } });
    expect(wrapper.find(Link)).toHaveLength(4);
  });

  it("should render 1 CircularProgress element if loading", () => {
    wrapper.setProps({ auth: { loading: true } });
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it("should render 0 CircularProgress element if not loading", () => {
    wrapper.setProps({ auth: { loading: false } });
    expect(wrapper.find(CircularProgress)).toHaveLength(0);
  });
});
