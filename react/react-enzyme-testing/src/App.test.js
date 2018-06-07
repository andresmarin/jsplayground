
import React from 'react';
import { shallow, configure } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });



describe('App', () => {

  const tree = shallow(
    <App msg="It works!" />
  );

  it('should be defined', () => {
    expect(App).toBeDefined();
  });


  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render the app', () => {
    expect(tree.find('.App')).toBeTruthy();
  });


  it('contains 1 div with class App', () => {
    expect(tree.find('.App').length).toBe(1);
  });


  it('should have a welcome message', () => {
    expect(tree.find('.App-title').text()).toEqual("It works!");
  });

  it('should render a button with some text on it', () => {
    expect(tree.find('button').length).toBe(1);
    expect(tree.find('button').text()).toEqual("A silly Button");
  });

  it("Sould change the intro when the button is clicked", () => {
    expect(tree.find('.App-intro').length).toBe(1);

    //Before clicking the button
    expect(tree.find('.App-intro').text()).toEqual("This is just a silly test.");

    //Button click
    tree.find('button').simulate('click');
    //expect(changeIntro.calledOnce).to.equal(true);

    //After clicking the button
    expect(tree.find('.App-intro').text()).toEqual("Good! You preseed the silly button.");

  });

});
