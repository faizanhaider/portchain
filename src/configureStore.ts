import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { ApplicationState, createRootReducer, rootSaga } from "./store";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleware)
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
