import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { useClickOut } from "../hooks/useClickOut";
import { createPortal } from "react-dom";
import { Overlay } from "./Overlay";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import { NAV_TRANSITION_DURATION } from "../utils/constants";

const StyledModal = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 100%;

  transform: translate(-50%, -50%);
  background-color: var(--color-slate-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);

  padding: calc(2.4rem + 0.8rem + 1.6rem);
`;

type Modal<T> = T & {
  Opener: React.FC<{ opens: string; children: React.ReactElement }>;
  Window: React.FC<{
    windowName: string;
    children: React.ReactElement<{ onCloseModal: () => void }>;
  }>;
};

const ModalContext = createContext<{
  isFadeOut: boolean;
  openName: string;
  open: React.Dispatch<React.SetStateAction<string>> | undefined;
  close: () => void;
}>({ isFadeOut: false, openName: "", open: undefined, close: () => {} });

const Modal: Modal<React.FC<{ children: React.ReactNode }>> = ({
  children,
}) => {
  const [openName, setOpenName] = useState<string>("");
  const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

  const close = () => {
    setIsFadeOut(true);

    setTimeout(() => {
      setOpenName("");
      setIsFadeOut(false);
    }, NAV_TRANSITION_DURATION);
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ isFadeOut, openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Opener: React.FC<{ opens: string; children: React.ReactElement }> = ({
  opens: opensWindowName,
  children,
}) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open && open(opensWindowName),
  });
};

const Window: React.FC<{
  windowName: string;
  children: React.ReactElement<{ onCloseModal: () => void }>;
}> = ({ windowName, children }) => {
  const { isFadeOut, openName, close } = useContext(ModalContext);

  const ref = useClickOut(close);

  if (windowName !== openName) return;

  return createPortal(
    <Overlay $type="modal" $show={isFadeOut}>
      <StyledModal ref={ref}>
        <IconButton
          onClick={close}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            margin: "0.8rem",
          }}
        >
          <XMarkIcon />
        </IconButton>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Opener = Opener;
Modal.Window = Window;

export default Modal;
