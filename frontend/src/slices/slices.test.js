/* eslint-env jest */
import modalReducer, { openModal, closeModal } from './modalSlice.js';

describe('modal reducer', () => {
  test('opens a channel modal with its context', () => {
    const state = modalReducer(undefined, openModal({ type: 'rename', channelId: 42 }));

    expect(state).toEqual({
      isOpen: true,
      type: 'rename',
      channelId: 42,
    });
  });

  test('closes a modal and clears its context', () => {
    const previous = { isOpen: true, type: 'remove', channelId: 7 };
    const state = modalReducer(previous, closeModal());

    expect(state).toEqual({
      isOpen: false,
      type: null,
      channelId: null,
    });
    expect(previous).toEqual({ isOpen: true, type: 'remove', channelId: 7 });
  });
});
