import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import scrollTop from 'dom-helpers/query/scrollTop';
import scrollLeft from 'dom-helpers/query/scrollLeft';

import ScrollContext from '../src/ScrollBehaviorContext';

import { Page1, Page2 } from './components';
import { render, scrollY, scrollX } from './scroll-utils';


describe('<ScrollContext>', () => {
  let container;

  beforeEach(() => {
    window.history.replaceState(null, null, '/');

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('should have the correct default behavior', async () => {
    const history = createMemoryHistory();
    const App = () => (
      <Router history={history}>
        <ScrollContext>
          <Switch>
            <Route path="/" exact component={Page1} />
            <Route path="/page2" exact component={Page2} />
          </Switch>
        </ScrollContext>
      </Router>
    );

    await render(<App />, container);
    expect(scrollTop(window)).to.equal(0, 'at load');

    await scrollY(window, 15000);
    expect(scrollTop(window)).to.equal(15000, 'after scrolling');

    history.push('/page2');
    expect(scrollTop(window)).to.equal(0, 'after navigation');

    history.goBack();
    expect(scrollTop(window)).to.equal(15000, 'after going back');
  });

  it('should have the correct default behavior', async () => {
    function shouldUpdateScroll(prevRouterState, routerState) {
      if (prevRouterState === null) {
        return [10, 20];
      }
      console.log(prevRouterState.location);
      console.log(routerState.location);
      if (prevRouterState.location.pathname === '/') {
        return false;
      }

      if (routerState.history.action === 'POP') {
        return true;
      }

      expect.fail();
      return false;
    }

    const history = createMemoryHistory();
    const App = () => (
      <Router history={history}>
        <ScrollContext shouldUpdateScroll={shouldUpdateScroll}>
          <Switch>
            <Route path="/" exact component={Page1} />
            <Route path="/page2" exact component={Page2} />
          </Switch>
        </ScrollContext>
      </Router>
   );

    await render(<App />, container);
    expect(scrollLeft(window)).to.equal(10, 'left at start');
    expect(scrollTop(window)).to.equal(20, 'top at start');

    await scrollY(window, 9000);
    expect(scrollLeft(window)).to.equal(10, 'left after first scrolling');
    expect(scrollTop(window)).to.equal(9000, 'top after first scrolling');

    history.push('/page2');
    expect(scrollLeft(window)).to.equal(10, 'left after navigation');
    // It should not scroll up, but some browsers do scroll up a tiny bit
    // let's just check it's not too much
    expect(scrollTop(window)).to.be.within(8500, 9000, 'top after navigation');

    await scrollX(window, 500);
    await scrollY(window, 3000);

    history.goBack();
    expect(scrollLeft(window)).to.equal(10, 'left after going back');
    expect(scrollTop(window)).to.equal(9000, 'top after going back');
  });
});
