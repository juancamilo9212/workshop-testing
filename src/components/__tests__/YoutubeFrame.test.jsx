/* global describe test expect */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import YoutubeFrame from '../YoutubeFrame';

describe('YoutubeFrame', () => {
  const title = 'The Shawshank Redemption';
  const videoId = 'K_tLp7T6U1c';
  const testComponent = () => (
    <YoutubeFrame
      title={title}
      videoId={videoId}
    />
  );

  test('renders as the snapshot', () => {
    const comp = testComponent();
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders properly (manually)', () => {
    const comp = testComponent();
    const tree = renderer.create(comp).toJSON();
    expect(tree?.type).toBe('iframe');
    expect(tree?.props?.title).toBe(title);
    expect(tree?.props?.src).toBeOfType(URL);
  });

  test('renders properly (with enzyme)', () => {
    const wrapper = shallow(testComponent());
    const iframe = wrapper.find('iframe');
    expect(iframe).toHaveLength(1);
    expect(iframe.prop('title')).toBe(title);
    expect(iframe.prop('src')).toBeOfType(URL);
  });

  test('renders as the snapshot (with enzyme)', () => {
    const wrapper = shallow(testComponent());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}); // describe YoutubeFrame
