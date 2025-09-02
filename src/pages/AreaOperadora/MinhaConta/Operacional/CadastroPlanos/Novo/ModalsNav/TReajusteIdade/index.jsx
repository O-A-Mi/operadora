import React, { useEffect } from 'react';
import dialogMessage from '../../../../../../../../assets/dialog-ui/dialog';
import toastMessage from '../../../../../../../../assets/toast-ui/toast';

const TReajusteIdade = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      dialogMessage(
        "Deseja realmente realizar o 'TESTE Reajuste Idade'?",
        "info",
        {
          buttonsText: {
            confirm: "Sim",
            cancel: "Não"
          }
        },
        (result) => {
          if (result) {
            toastMessage("TESTE Reajuste Idade realizado com sucesso", "success");
          }
          onClose();
        }
      );
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return null;
};

export default TReajusteIdade; 