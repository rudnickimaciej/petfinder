import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useUnsavedChangesGuard = ({
  enabled,
  onSave,
}: {
  enabled: boolean;
  onSave: () => Promise<void> | void;
}) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!enabled) return;

      e.preventDefault();
      setPendingAction(e.data.action);
      setShowModal(true);
    });

    return unsubscribe;
  }, [enabled]);

  const cancel = () => setShowModal(false);

  const discard = () => {
    setShowModal(false);
    navigation.dispatch(pendingAction);
  };

  const saveAndExit = async () => {
    await onSave();
    setShowModal(false);
    navigation.dispatch(pendingAction);
  };

  return {
    showModal,
    cancel,
    discard,
    saveAndExit,
  };
};
