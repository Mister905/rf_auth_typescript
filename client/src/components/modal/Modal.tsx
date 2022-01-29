import { useEffect } from "react";
import M from "materialize-css";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { close_modal } from "../../action_creators/modal_actions";

const Modal: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { modal_title, modal_body, modal_confirmation, modal_decline } =
    useAppSelector((state) => state.modal);

    const display_modal = useAppSelector(
      (state) => state.modal.display_modal
    );

  useEffect(() => {
    const options = {
      onCloseEnd: () => {
        console.log(instance);
        instance.close();
        instance.destroy();
        dispatch(close_modal());
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };

    M.Modal.init(document.querySelector("#test")!, options);

    let instance = M.Modal.getInstance(document.querySelector("#test")!);

    instance.open();

  }, [display_modal]);

  return (
    <div>
      <div id="test" className="modal">
        <div className="modal-content">
          <h4>{modal_title}</h4>
          <p>{modal_body}</p>
        </div>
        <div className="modal-footer">
          {modal_decline && (
            <a className="modal-close waves-effect waves-red btn-flat">
              {modal_decline}
            </a>
          )}
          <a className="modal-close waves-effect waves-green btn-flat">
            {modal_confirmation}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
