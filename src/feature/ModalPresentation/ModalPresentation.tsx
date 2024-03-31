import * as React from "react";
import {Modal} from "../../shared/ui";
import {Button} from "../../shared/ui/Button/Button";

const rootClass = 'modal-presentation'

export const ModalPresentation = () => {
    return <Modal classes={rootClass}>
        <h4>Скачать нашу презентацию</h4>
        <Button tag={'a'} href={'./files/test.mov'} download={true}>Скачать</Button>
    </Modal>
}