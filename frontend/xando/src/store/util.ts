interface Action<T> {
  type: T;
}

interface ActionHandler<T, S, A extends Action<T>> {
  (state: S, action: A): S;
}

interface Reducer<T, S, A extends Action<T>> {
  (state: S | undefined, action: A): S
}

export function createReducer<T, S, A extends Action<T>>(initialState: S, handlers: Array<[T, ActionHandler<T, S, A>]>): Reducer<T, S, A> {
  const handlerMap = new Map();
  handlers.forEach(tuple => handlerMap.set(tuple[0], tuple[1]));

  return (state = initialState, action: A): S  => {
    const handler = handlerMap.get(action.type);
    return !!handler ? handler(state, action) : state;
  }
}