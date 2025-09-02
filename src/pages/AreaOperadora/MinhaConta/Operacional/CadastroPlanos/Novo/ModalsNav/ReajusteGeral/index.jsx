import React, { useEffect } from 'react';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const ReajusteGeral = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      dialogMessage(
        "Deseja realmente aplicar o 'Reajuste Geral Proposta'?",
        "info",
        {
          buttonsText: {
            confirm: "Sim",
            cancel: "Não"
          }
        },
        (result) => {
          if (result) {
            toastMessage("Reajuste Geral Proposta aplicado com sucesso", "success");
          }
          onClose();
        }
      );
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return null;
};

export default ReajusteGeral;
