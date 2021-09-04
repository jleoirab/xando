import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export interface ComponentSwitcherProps {
  currentState: any;
  children: any;
}

export interface SwitcheableComponentProps {
  id: any;
  children: any;
  classNames: string;
}

interface ComponentSwitcherContextObject {
  currentState: any;
}

const ComponentSwitcherContext = React.createContext<ComponentSwitcherContextObject>({
  currentState: null,
})

export const SwitcheableComponent: React.FC<SwitcheableComponentProps> = (props: SwitcheableComponentProps) => {
  const nodeRef = React.useRef(null);
  return (
    <ComponentSwitcherContext.Consumer>
      {(context: ComponentSwitcherContextObject) => {
        console.log(context.currentState, props.id, context.currentState === props.id)
        return (
          <CSSTransition in={context.currentState === props.id} timeout={500} classNames={props.classNames} unmountOnExit nodeRef={nodeRef}>
            <div ref={nodeRef}>
              {React.Children.only(props.children)}
            </div>
          </CSSTransition>
        );
      }}
    </ComponentSwitcherContext.Consumer>
  );
}

const wrappper = React.createRef();

export const ComponentSwitcher: React.FC<ComponentSwitcherProps> = (props: ComponentSwitcherProps) => {
  React.Children.forEach(props.children, child => {
    if (child.type.name !== SwitcheableComponent.name) {
      throw new Error(`All children of ComponentSwitcher must be of type SwitcheableComponent. Child was of type ${child.type}.`);
    }
  })

  console.log("current state", props.currentState);

  return (
    <ComponentSwitcherContext.Provider value={{
      currentState: props.currentState,
      }}>
      <TransitionGroup>
        {props.children}
      </TransitionGroup>
    </ComponentSwitcherContext.Provider>
  );
}
