import ReactDOM from 'react-dom';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import scrollTop from 'dom-helpers/query/scrollTop';

function scrollY(node, val) {
  return new Promise((resolve) => {
    const listener = () => {
      setTimeout(() => requestAnimationFrame(resolve));
      node.removeEventListener('scroll', listener);
    };
    node.addEventListener('scroll', listener);
    scrollTop(node, val);
  });
}

function scrollX(node, val) {
  return new Promise((resolve) => {
    const listener = () => {
      setTimeout(() => requestAnimationFrame(resolve));
      node.removeEventListener('scroll', listener);
    };
    node.addEventListener('scroll', listener);
    scrollLeft(node, val);
  });
}

function render(element, container) {
  return new Promise((resolve) => {
    ReactDOM.render(element, container, () => requestAnimationFrame(resolve));
  });
}

export {
  scrollY,
  scrollX,
  render,
};
