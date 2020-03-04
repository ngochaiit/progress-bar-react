
import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import ProgressBar from '../Component/ProgressBar';


describe('App', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App/>)));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  // it('should render the Progress Component', () => {
  //   expect(wrapper.containsMatchingElement(<ProgressBar />)).toEqual(true);
  // });
  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)})
});
