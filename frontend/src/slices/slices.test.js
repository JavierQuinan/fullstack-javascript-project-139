/* eslint-env jest */
import channelsReducer, { setCurrentChannelId } from './channelsSlice.js';
import messagesReducer, { messageReceived } from './messagesSlice.js';

describe('chat reducers', () => {
  test('sets the active channel id', () => {
    const state = channelsReducer(undefined, setCurrentChannelId(42));

    expect(state.currentChannelId).toBe(42);
    expect(state.items).toEqual([]);
  });

  test('appends a realtime message without mutating the previous state', () => {
    const previous = { items: [{ id: 1, body: 'hola', channelId: 1 }] };
    const incoming = { id: 2, body: 'mundo', channelId: 1 };

    const next = messagesReducer(previous, messageReceived(incoming));

    expect(next.items).toEqual([previous.items[0], incoming]);
    expect(previous.items).toHaveLength(1);
  });
});
