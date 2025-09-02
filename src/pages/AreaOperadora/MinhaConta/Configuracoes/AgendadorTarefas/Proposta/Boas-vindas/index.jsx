import styles from "./styles.module.css"
import { UseInputPadrao, UseInputMask } from '../../../../../../../components/InputPadrao';
import dialogMessage from '../../../../../../../assets/dialog-ui/dialog.jsx';
import { jsonRoute } from "../../../../../../../utils/json.js";
import TogglePadrao from "../../../../../../../components/TogglePadrao/index.jsx";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";



function BoasVindas() {
    const [Acao, setAcao, AcaoRef] = UseInputMask();
    const [QuantidadeMensagensLote, setQuantidadeMensagensLote, QuantidadeMensagensLoteRef] = UseInputMask();

}

export default BoasVindas;
